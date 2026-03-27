import os
from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt

security = HTTPBearer()

SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")

def verify_supabase_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    Verifies the JWT token from Supabase.
    Since we don't have the key right now, if SUPABASE_JWT_SECRET is not set, 
    we provide a fallback mock validation for local development.
    """
    token = credentials.credentials
    if not SUPABASE_JWT_SECRET:
        # Mock validation for local dev
        if token == "mock_token":
            return {"sub": "mock_user_id", "email": "mock@example.com"}
        raise HTTPException(status_code=401, detail="Invalid mock token")
    
    try:
        # Supabase uses HS256 algorithm by default
        payload = jwt.decode(
            token,
            SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            options={"verify_aud": False}
        )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

def get_current_user(payload: dict = Depends(verify_supabase_token)):
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="User not found in token")
    return payload
