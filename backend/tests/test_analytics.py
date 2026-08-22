def test_analytics_dashboard(client, auth_headers_a):
    client.post("/api/expenses", json={
        "title": "Lunch", "amount": 200.0, "category": "Food", "date": "2026-03-01"
    }, headers=auth_headers_a)
    client.post("/api/expenses", json={
        "title": "Cab", "amount": 300.0, "category": "Transportation", "date": "2026-03-02"
    }, headers=auth_headers_a)

    res = client.get("/api/analytics/dashboard", headers=auth_headers_a)
    assert res.status_code == 200
    data = res.json()
    assert data["summary"]["total_spending"] == 500.0
    assert data["summary"]["expense_count"] == 2
    assert len(data["category_breakdown"]) == 2