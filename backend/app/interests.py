from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import get_db
from .models import User, Interest, RepProfile, CompanyProfile
from .auth import get_current_user
from pydantic import BaseModel

router = APIRouter(prefix="/interests", tags=["Interests"])

class InterestCreate(BaseModel):
    rep_id: int
    message: str

@router.post("/")
def send_interest(
    interest: InterestCreate,
    db: Session = Depends(get_db),
    user_payload: dict = Depends(get_current_user)
):
    clerk_id = user_payload.get("sub")
    user = db.query(User).filter(User.clerk_id == clerk_id).first()
    if not user or not user.company_profile:
        raise HTTPException(status_code=403, detail="Only companies can send interests")

    company_id = user.company_profile.id
    
    existing = db.query(Interest).filter(
        Interest.company_id == company_id,
        Interest.rep_id == interest.rep_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Interest already sent to this rep")

    new_interest = Interest(
        rep_id=interest.rep_id,
        company_id=company_id,
        message=interest.message,
        status="pending"
    )
    db.add(new_interest)
    db.commit()
    db.refresh(new_interest)
    return new_interest

@router.post("/{interest_id}/accept")
def accept_interest(
    interest_id: int,
    db: Session = Depends(get_db),
    user_payload: dict = Depends(get_current_user)
):
    clerk_id = user_payload.get("sub")
    user = db.query(User).filter(User.clerk_id == clerk_id).first()
    if not user or not user.rep_profile:
        raise HTTPException(status_code=403, detail="Only reps can accept interests")

    interest = db.query(Interest).get(interest_id)
    if not interest or interest.rep_id != user.rep_profile.id:
        raise HTTPException(status_code=404, detail="Interest not found")

    interest.status = "accepted"
    # Auto-generate NDA mock
    interest.nda_status = "signed"
    db.commit()
    db.refresh(interest)
    return {"message": "Interest accepted, identity revealed and NDA signed", "company": interest.company.company_name}
