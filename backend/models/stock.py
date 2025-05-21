# models/stock.py

from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from models.base import Base

class Stock(Base):
    __tablename__ = "stocks"

    stock_id = Column(String, primary_key=True, index=True)
    merchant_id = Column(String, ForeignKey("merchants.merchant_id"))
    item_name = Column(String, nullable=False)
    quantity = Column(Integer, default=0)
    last_updated = Column(DateTime, default=datetime.utcnow)

    merchant = relationship("Merchant", back_populates="stock")
