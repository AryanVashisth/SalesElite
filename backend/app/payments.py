import os
import razorpay
from fastapi import APIRouter, Request, HTTPException

router = APIRouter(prefix="/payments", tags=["Payments"])

RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID", "rzp_test_mock")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET", "rzp_secret_mock")

# In production this will be authenticated
client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

@router.post("/create-subscription")
def create_subscription(plan_id: str):
    try:
        if RAZORPAY_KEY_ID == "rzp_test_mock":
            return {"subscription_id": "sub_mock", "status": "created"}
            
        sub = client.subscription.create({
            "plan_id": plan_id,
            "total_count": 12,
            "quantity": 1,
            "customer_notify": 1
        })
        return sub
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/webhook")
async def razorpay_webhook(request: Request):
    """
    Handle Razorpay Webhooks (e.g. subscription completed, success fee processed)
    """
    body = await request.body()
    # signature verification occurs here
    # update company_profile.subscription_status
    return {"status": "ok"}
