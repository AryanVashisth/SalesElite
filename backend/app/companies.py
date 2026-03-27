from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from .database import get_db
from .models import User, CompanyProfile, RepProfile
from .auth import get_current_user
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/companies", tags=["Companies"])

class CompanyCreate(BaseModel):
    company_name: str

class CompanyResponse(BaseModel):
    id: int
    company_name: str
    tier: str
    subscription_status: str

    class Config:
        orm_mode = True

@router.post("/", response_model=CompanyResponse)
def create_company_profile(
    profile: CompanyCreate,
    db: Session = Depends(get_db),
    user_payload: dict = Depends(get_current_user)
):
    clerk_id = user_payload.get("sub")
    user = db.query(User).filter(User.clerk_id == clerk_id).first()
    if not user:
        user = User(clerk_id=clerk_id, email=user_payload.get("email", ""), role="company")
        db.add(user)
        db.commit()
        db.refresh(user)

    existing_profile = db.query(CompanyProfile).filter(CompanyProfile.user_id == user.id).first()
    if existing_profile:
        raise HTTPException(status_code=400, detail="Profile already exists")

    new_profile = CompanyProfile(user_id=user.id, company_name=profile.company_name)
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return new_profile

@router.get("/search-reps")
def search_reps(
    quota: Optional[float] = None,
    deal_size: Optional[float] = None,
    industry: Optional[str] = None,
    db: Session = Depends(get_db),
    user_payload: dict = Depends(get_current_user)
):
    """
    Search functionality for approved reps.
    Only allows subscribed companies (mocked logic for now).
    """
    clerk_id = user_payload.get("sub")
    user = db.query(User).filter(User.clerk_id == clerk_id).first()
    if not user or not user.company_profile:
        raise HTTPException(status_code=403, detail="Not authorized as company")
        
    query = db.query(RepProfile).filter(RepProfile.status == "approved")
    if quota:
        query = query.filter(RepProfile.quota_attainment_pct >= quota)
    if deal_size:
        query = query.filter(RepProfile.avg_deal_size_lakhs >= deal_size)
    if industry:
        query = query.filter(RepProfile.industries.ilike(f"%{industry}%"))
        
    results = query.all()
    # Masking identities - Rep profiles are mostly anonymous anyway
    return [
        {
            "id": r.id,
            "anonymized_id": r.anonymized_id,
            "quota": r.quota_attainment_pct,
            "deal_size": r.avg_deal_size_lakhs,
            "arr": r.total_arr_cr,
            "industries": r.industries
        } for r in results
    ]
