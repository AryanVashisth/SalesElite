from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to SalesElite India API"}

def test_create_interest_unauthorized():
    response = client.post("/interests/", json={"rep_id": 1, "message": "hello"})
    # Since we are not providing a token, we expect 403 Forbidden
    assert response.status_code == 403
