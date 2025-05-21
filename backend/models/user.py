# models/user.py

from sqlalchemy import Column, String, Date
from models.base import Base

class User(Base):
    __tablename__ = "users"

    prs_id = Column(String, primary_key=True, index=True)
    national_id = Column(String, unique=True, nullable=False)
    dob = Column(Date, nullable=False)
    password_hash = Column(String, nullable=False)
