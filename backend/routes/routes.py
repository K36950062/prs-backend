from flask import Blueprint
from controllers.user_controller import enroll_user, login_user, get_user, fetch_all_users  # ✅ Added fetch_all_users

api = Blueprint("api", __name__)

def register_routes(app):
    app.register_blueprint(api, url_prefix="/api")

@api.route("/users/enroll", methods=["POST"])
def enroll():
    return enroll_user()

@api.route("/users/login", methods=["POST"])
def login():
    return login_user()

@api.route("/users/<prs_id>", methods=["GET"])
def get(prs_id):
    return get_user(prs_id)

@api.route("/users", methods=["GET"])
def get_users():
    return fetch_all_users()
