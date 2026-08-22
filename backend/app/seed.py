from datetime import date, timedelta
import random
from app.database import SessionLocal, Base, engine
from app.models.user import User
from app.models.expense import Expense
from app.auth.security import get_password_hash

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    existing_demo = db.query(User).filter(User.email == "demo@spendwise.com").first()
    if existing_demo:
        print("Demo user already exists. Skipping seed.")
        db.close()
        return

    demo_user = User(
        name="Demo Account",
        email="demo@spendwise.com",
        password_hash=get_password_hash("Password123!")
    )
    db.add(demo_user)
    db.commit()
    db.refresh(demo_user)

    categories = [
        ("Food", ["Swiggy Order", "Grocery Shopping", "Coffee & Snacks", "Dinner with Friends"]),
        ("Transportation", ["Uber Ride", "Fuel refill", "Metro Pass", "Parking fee"]),
        ("Shopping", ["Amazon order", "Clothing - Zara", "Electronics - Cable", "Home Decor"]),
        ("Bills", ["Electricity Bill", "Broadband Internet", "Mobile Recharge", "Water Bill"]),
        ("Entertainment", ["Movie Tickets", "Concert Pass", "Gaming Purchase", "Bowling Night"]),
        ("Health", ["Pharmacy", "Doctor Consultation", "Lab Test", "Vitamin Supplements"]),
        ("Subscriptions", ["Netflix Subscription", "Spotify Premium", "GitHub Copilot", "Gym Membership"])
    ]

    today = date.today()
    expenses = []

    for i in range(45):
        days_ago = random.randint(0, 120)
        expense_date = today - timedelta(days=days_ago)
        cat_name, samples = random.choice(categories)
        title = random.choice(samples)
        amount = round(random.uniform(150.0, 4500.0), 2)

        expense = Expense(
            user_id=demo_user.id,
            title=title,
            amount=amount,
            category=cat_name,
            date=expense_date,
            note=f"Sample transaction logged for {title}"
        )
        expenses.append(expense)

    db.add_all(expenses)
    db.commit()
    db.close()
    print("Database seeded successfully!")
    print("Credentials: demo@spendwise.com / Password123!")

if __name__ == "__main__":
    seed_database()