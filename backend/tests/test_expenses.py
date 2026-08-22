def test_create_and_get_expense(client, auth_headers_a):
    create_res = client.post("/api/expenses", json={
        "title": "Dinner",
        "amount": 450.0,
        "category": "Food",
        "date": "2026-03-01",
        "note": "Italian dinner"
    }, headers=auth_headers_a)
    assert create_res.status_code == 201
    expense_id = create_res.json()["id"]

    get_res = client.get("/api/expenses", headers=auth_headers_a)
    assert get_res.status_code == 200
    assert get_res.json()["total"] == 1
    assert get_res.json()["items"][0]["id"] == expense_id

def test_user_data_isolation(client, auth_headers_a, auth_headers_b):
    # User A creates expense
    res_a = client.post("/api/expenses", json={
        "title": "User A Private Expense",
        "amount": 1000.0,
        "category": "Shopping",
        "date": "2026-03-01"
    }, headers=auth_headers_a)
    expense_a_id = res_a.json()["id"]

    # User B lists expenses
    res_b_list = client.get("/api/expenses", headers=auth_headers_b)
    assert res_b_list.json()["total"] == 0

    # User B attempts to access User A's expense directly
    res_b_get = client.get(f"/api/expenses/{expense_a_id}", headers=auth_headers_b)
    assert res_b_get.status_code == 404

    # User B attempts to delete User A's expense
    res_b_delete = client.delete(f"/api/expenses/{expense_a_id}", headers=auth_headers_b)
    assert res_b_delete.status_code == 404