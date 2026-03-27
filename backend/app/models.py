from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    clerk_id = Column(String, unique=True, index=True, nullable=False) # Or supabase id
    email = Column(String, unique=True, index=True, nullable=False)
    role = Column(String, default="rep") # 'rep', 'company', 'admin'
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    rep_profile = relationship("RepProfile", back_populates="user", uselist=False)
    company_profile = relationship("CompanyProfile", back_populates="user", uselist=False)

class RepProfile(Base):
    __tablename__ = "rep_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String, default="pending") # pending, approved, rejected
    anonymized_id = Column(String, unique=True, index=True)
    
    # Extracted Metrics
    quota_attainment_pct = Column(Float, nullable=True)
    avg_deal_size_lakhs = Column(Float, nullable=True)
    total_arr_cr = Column(Float, nullable=True)
    years_experience = Column(Integer, nullable=True)
    industries = Column(String, nullable=True) # JSON or comma-separated
    geography = Column(String, nullable=True) # States/Cities
    
    doc_url = Column(String, nullable=True) # S3/Supabase storage URL

    user = relationship("User", back_populates="rep_profile")
    interests = relationship("Interest", back_populates="rep")

class CompanyProfile(Base):
    __tablename__ = "company_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    company_name = Column(String, nullable=False)
    tier = Column(String, default="free")
    subscription_status = Column(String, default="inactive")

    user = relationship("User", back_populates="company_profile")
    interests = relationship("Interest", back_populates="company")

class Interest(Base):
    __tablename__ = "interests"

    id = Column(Integer, primary_key=True, index=True)
    rep_id = Column(Integer, ForeignKey("rep_profiles.id"))
    company_id = Column(Integer, ForeignKey("company_profiles.id"))
    status = Column(String, default="pending") # pending, accepted, rejected
    message = Column(String, nullable=True)
    nda_status = Column(String, default="unsigned") # unsigned, signed
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    rep = relationship("RepProfile", back_populates="interests")
    company = relationship("CompanyProfile", back_populates="interests")
