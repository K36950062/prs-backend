# backend/setup_db.py

from models.base import Base
from connection import engine
from models import *  # This imports User, Merchant, Stock, etc.

# Create all tables
Base.metadata.create_all(bind=engine)

print("✅ All database tables created successfully.")
