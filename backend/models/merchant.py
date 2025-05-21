# models/merchant.py

from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from models.base import Base  # assuming you have a Base class in base.py

class Merchant(Base):
    __tablename__ = "merchants"

    merchant_id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    license_number = Column(String, nullable=False, unique=True)
    address = Column(String, nullable=False)

    # Relationship to stock (optional if needed)
    stock = relationship("Stock", back_populates="merchant")
