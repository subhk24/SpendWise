def test_register_user(client):
    res = client.post("/api/auth/register", json={
        "name": "Test User",
        "email": "register@test.com",
        "password": "securepassword123"
    })
    assert res.status_code == 201
    data = res.json()
    assert "access_token" in data
    assert data["user"]["email"] == "register@test.com"

def test_login_user(client, user_a):
    res = client.post("/api/auth/login", json={
        "email": "usera@test.com",
        "password": "password123"
    })
    assert res.status_code == 200
    assert "access_token" in res.json()

def test_login_invalid_password(client, user_a):
    res = client.post("/api/auth/login", json={
        "email": "usera@test.com",
        "password": "wrongpassword"
    })
    assert res.status_code == 401