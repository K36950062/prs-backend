from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError
from connection import SessionLocal
from models.user import User
import uuid
from datetime import datetime

def enroll_user():
    data = request.get_json()
    session = SessionLocal()
    try:
        new_user = User(
            prs_id=str(uuid.uuid4()),
            national_id=data["national_id"],
            dob=datetime.strptime(data["dob"], "%Y-%m-%d"),
            password_hash=generate_password_hash(data["password"]),
        )
        session.add(new_user)
        session.commit()
        return jsonify({"prs_id": new_user.prs_id}), 201
    except IntegrityError:
        session.rollback()
        return jsonify({"message": "User already exists"}), 400
    except Exception as e:
        session.rollback()
        return jsonify({"message": str(e)}), 500
    finally:
        session.close()
        
def fetch_all_users():
    session = SessionLocal()
    try:
        users = session.query(User).all()
        user_list = [
            {
                "prs_id": str(user.prs_id),
                "national_id": user.national_id,
                "dob": str(user.dob),
                "role_id": user.role_id
            }
            for user in users
        ]
        return jsonify(user_list), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    finally:
        session.close()

def login_user():
    data = request.get_json()
    session = SessionLocal()
    user = session.query(User).filter_by(national_id=data["national_id"]).first()
    session.close()
    if user and check_password_hash(user.password_hash, data["password"]):
        return jsonify({"prs_id": user.prs_id}), 200
    return jsonify({"message": "Invalid credentials"}), 401

def get_user(prs_id):
    session = SessionLocal()
    user = session.query(User).filter_by(prs_id=prs_id).first()
    session.close()
    if user:
        return jsonify({
            "national_id": user.national_id,
            "dob": user.dob.isoformat(),
            "role": user.role
        }), 200
    return jsonify({"message": "User not found"}), 404