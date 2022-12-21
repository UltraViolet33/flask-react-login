import json
from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_access_cookies, jwt_required, JWTManager


api = Flask(__name__)

api.config["JWT_SECRET_KEY"] = "change_me"
jwt = JWTManager(api)


@api.route("/test-api", methods=["GET"])
def test_api():
    return {"msg": "hello API"}, 200


@api.route("/token", methods=["POST"])
def create_token():
    return {"msg": "hello"}




api.run()