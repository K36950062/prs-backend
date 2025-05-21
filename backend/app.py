from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load .env variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Config
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

# Register all routes
from routes import routes, merchants  # ← include other route files too
app.register_blueprint(routes.bp)
app.register_blueprint(merchants.bp)

# Root route
@app.route("/")
def index():
    return {"message": "PRS Backend is running"}

# Run server
if __name__ == "__main__":
    app.run(debug=True)
