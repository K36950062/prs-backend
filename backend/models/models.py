from sqlalchemy import Column, Integer, String, Date, ForeignKey
from connection import Base

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    prs_id = Column(String, unique=True, index=True)
    national_id = Column(String, unique=True)
    dob = Column(Date)
    password_hash = Column(String)
    role_id = Column(Integer)