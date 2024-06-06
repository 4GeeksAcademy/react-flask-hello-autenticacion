import os
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_migrate import Migrate
from flask_cors import CORS
from api.utils import APIException
from api.admin import setup_admin
from api.models import db, User, LogoutActivity, RevokeToken
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager, get_jwt
from datetime import datetime


api = Blueprint('api', __name__)
app = Flask(__name__)
app.url_map.strict_slashes = False

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = "super-secret" 

CORS(app)
Migrate(app, db)
setup_admin(app)
jwt = JWTManager(app)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json

    if User.query.filter_by(username=data['username']).first():
        return jsonify({"message": "User already exists"}), 400
    
    new_user = User(
        email=data['email'],
        username=data['username'],
        password=data['password'],
        is_active=True  
    )    
    db.session.add(new_user)
    db.session.commit()
    serialized_new_user = new_user.serialize()

    return jsonify(serialized_new_user), 200

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    
    if not user.check_password(password):
        return jsonify({"message": "Invalid password"}), 401

    
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200

@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

# //TODO logout 
@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jwt_token = get_jwt()

    
    current_user = get_jwt_identity()
    logout_time = datetime.now(datetime.UTC)
    logout_activity = LogoutActivity(user_id=current_user.id, logout_time=logout_time)
    db.session.add(logout_activity)
    db.session.commit()

    revoked_token = RevokeToken(jti=jwt_token["jti"])
    db.session.add(revoked_token)
    db.session.commit()

    return jsonify({"message": "Logout successful"}), 200


if __name__ == "__main__":
    app.run()