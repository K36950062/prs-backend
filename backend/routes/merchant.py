# merchants.py

from flask import Blueprint, request, jsonify
from models import Merchant, Stock
from connection import SessionLocal
import uuid
from datetime import datetime

bp = Blueprint('merchants', __name__)

# Register a new merchant
@bp.route('/api/merchants/register', methods=['POST'])
def register_merchant():
    data = request.get_json()
    session = SessionLocal()
    try:
        new_merchant = Merchant(
            merchant_id=str(uuid.uuid4()),
            name=data['name'],
            license_number=data['license_number'],
            address=data['address']
        )
        session.add(new_merchant)
        session.commit()
        return jsonify({ "merchant_id": new_merchant.merchant_id }), 201
    except Exception as e:
        session.rollback()
        return jsonify({ "message": str(e) }), 400
    finally:
        session.close()

# Update stock for a merchant
@bp.route('/api/merchants/update-stock', methods=['POST'])
def update_stock():
    data = request.get_json()
    session = SessionLocal()
    try:
        new_stock = Stock(
            stock_id=str(uuid.uuid4()),
            merchant_id=data.get('merchant_id'),  # Optional: backend may infer from token
            item_name=data['item_name'],
            quantity=data['quantity'],
            last_updated=datetime.utcnow()
        )
        session.add(new_stock)
        session.commit()
        return jsonify({ "stock_id": new_stock.stock_id }), 200
    except Exception as e:
        session.rollback()
        return jsonify({ "message": str(e) }), 400
    finally:
        session.close()

# Get current merchant's stock
@bp.route('/api/merchants/stock', methods=['GET'])
def get_stock():
    session = SessionLocal()
    try:
        stocks = session.query(Stock).all()
        results = []
        for s in stocks:
            results.append({
                "stock_id": s.stock_id,
                "merchant_id": s.merchant_id,
                "item_name": s.item_name,
                "quantity": s.quantity,
                "last_updated": s.last_updated.isoformat()
            })
        return jsonify({ "stocks": results }), 200
    except Exception as e:
        return jsonify({ "message": str(e) }), 400
    finally:
        session.close()
