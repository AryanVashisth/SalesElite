import os
import sys

# ensure app is in path
sys.path.insert(0, os.path.realpath(os.path.join(os.path.dirname(__file__))))

from app.database import SessionLocal
from app.models import User, RepProfile, CompanyProfile

def seed():
    db = SessionLocal()
    
    # Check if already seeded
    if db.query(User).count() > 0:
        print("Database already seeded.")
        return

    # Seed Reps
    for i in range(1, 11):
        user = User(clerk_id=f"rep_clerk_{i}", email=f"rep{i}@test.com", role="rep")
        db.add(user)
        db.commit()
        db.refresh(user)

        rep = RepProfile(
            user_id=user.id,
            anonymized_id=f"SE-{i * 1000 + 42}",
            status="approved",
            quota_attainment_pct=110.0 + (i * 5),
            avg_deal_size_lakhs=15.0 + (i * 2),
            total_arr_cr=1.5 + (i * 0.1),
            years_experience=3 + i,
            industries="SaaS, FinTech" if i % 2 == 0 else "IT Services, EdTech",
            geography="Bangalore" if i % 2 == 0 else "Mumbai"
        )
        db.add(rep)

    # Seed Companies
    for i in range(1, 4):
        user = User(clerk_id=f"comp_clerk_{i}", email=f"comp{i}@test.com", role="company")
        db.add(user)
        db.commit()
        db.refresh(user)

        comp = CompanyProfile(
            user_id=user.id,
            company_name=f"TopTech Corp {i}",
            tier="premium",
            subscription_status="active"
        )
        db.add(comp)

    db.commit()
    print("Successfully seeded 10 reps and 3 companies.")

if __name__ == "__main__":
    seed()
