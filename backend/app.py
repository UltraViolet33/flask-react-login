import json
from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, unset_jwt_cookies, get_jwt, get_jwt_identity, unset_access_cookies, jwt_required, JWTManager
from datetime import datetime, timedelta, timezone

api = Flask(__name__)

api.config["JWT_SECRET_KEY"] = "change_me"

jwt = JWTManager(api)
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1) 


@api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


@api.route("/test-api", methods=["GET"])
def test_api():
    return {"msg": "hello API"}, 200


@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # change with data from db
    if email != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    return {"access_token": access_token}


@api.route("/profile")
@jwt_required()
def my_profile():
    return {
        "name": "test",
        "about": "test about"
    }



@api.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successfull"})
    unset_jwt_cookies(response)
    return response

api.run(debug=True)
