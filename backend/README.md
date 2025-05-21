# PRS Backend System

This is the backend API for the **Pandemic Resilience System (PRS)**. It manages user enrollment, authentication, and retrieval of user records.

---

## 🛠️ Technologies Used

- Python 3.11+
- Flask
- SQLAlchemy
- SQLite (for development)
- Python-dotenv
- Werkzeug
- Postman (for API testing)
---

## ⚙️ Features

- ✅ User enrollment with hashed password
- ✅ User login (authentication)
- ✅ Fetch a specific user by PRS ID
- ✅ Fetch all users
- ✅ RESTful API built with Flask
- ✅ Role ID field with default value for public users

---

## 📁 Project Structure

```bash
PRS_System/
├── app.py                 # Main Flask app
├── connection.py          # DB connection setup
├── init_db.py             # DB initialization script
├── controllers/
│   └── user_controller.py
├── models/
│   └── user.py
├── routes/
│   └── routes.py
├── .env                   # Environment variables
├── .env.example           # Sample .env file
├── requirements.txt
└── PRS_API.postman_collection.json  # (Postman collection to test API)

## 📦 Installation

```bash
git clone https://github.com/K36950062/prs-backend.git
cd prs-backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt