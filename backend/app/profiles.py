from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import get_db
from .models import User, RepProfile
from .auth import get_current_user
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/reps", tags=["Reps"])

class RepProfileCreate(BaseModel):
    anonymized_id: str

class RepProfileResponse(BaseModel):
    id: int
    anonymized_id: str
    status: str
    quota_attainment_pct: Optional[float]
    avg_deal_size_lakhs: Optional[float]
    total_arr_cr: Optional[float]
    years_experience: Optional[int]
    industries: Optional[str]
    geography: Optional[str]

    class Config:
        orm_mode = True

@router.post("/", response_model=RepProfileResponse)
def create_rep_profile(
    profile: RepProfileCreate,
    db: Session = Depends(get_db),
    user_payload: dict = Depends(get_current_user)
):
    clerk_id = user_payload.get("sub")
    user = db.query(User).filter(User.clerk_id == clerk_id).first()
    if not user:
        user = User(clerk_id=clerk_id, email=user_payload.get("email", ""), role="rep")
        db.add(user)
        db.commit()
        db.refresh(user)

    existing_profile = db.query(RepProfile).filter(RepProfile.user_id == user.id).first()
    if existing_profile:
        raise HTTPException(status_code=400, detail="Profile already exists")

    new_profile = RepProfile(user_id=user.id, anonymized_id=profile.anonymized_id)
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return new_profile

@router.get("/me", response_model=RepProfileResponse)
def get_my_profile(
    db: Session = Depends(get_db),
    user_payload: dict = Depends(get_current_user)
):
    clerk_id = user_payload.get("sub")
    user = db.query(User).filter(User.clerk_id == clerk_id).first()
    if not user or not user.rep_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    return user.rep_profile
