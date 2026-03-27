from fastapi import FastAPI
import os
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration

sentry_sdk.init(
    dsn=os.getenv("SENTRY_DSN", ""),
    traces_sample_rate=1.0,
    profiles_sample_rate=1.0,
    integrations=[FastApiIntegration()]
)

from fastapi.middleware.cors import CORSMiddleware
from .profiles import router as profiles_router
from .companies import router as companies_router
from .interests import router as interests_router
from .payments import router as payments_router

app = FastAPI(title="SalesElite India", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(profiles_router)
app.include_router(companies_router)
app.include_router(interests_router)
app.include_router(payments_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to SalesElite India API"}
