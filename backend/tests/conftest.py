import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.database import Base, get_db
from app.main import app
from app.auth.security import get_password_hash
from app.models.user import User

SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(SQLALCHEMY_TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="function")
def db():
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    yield session
    session.close()
    Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def client(db):
    def _get_test_db():
        try:
            yield db
        finally:
            pass

    app.dependency_overrides[get_db] = _get_test_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()

@pytest.fixture
def user_a(db):
    user = User(email="usera@test.com", name="User A", password_hash=get_password_hash("password123"))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@pytest.fixture
def user_b(db):
    user = User(email="userb@test.com", name="User B", password_hash=get_password_hash("password123"))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@pytest.fixture
def auth_headers_a(client, user_a):
    res = client.post("/api/auth/login", json={"email": "usera@test.com", "password": "password123"})
    token = res.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}

@pytest.fixture
def auth_headers_b(client, user_b):
    res = client.post("/api/auth/login", json={"email": "userb@test.com", "password": "password123"})
    token = res.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}