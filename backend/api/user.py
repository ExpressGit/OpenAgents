import struct
import json
import datetime
from typing import Any, Generator
from bson.objectid import ObjectId
from flask import jsonify, request, Response

from backend.app import app
from backend.utils.user_storage import get_user_storage,close_user_storage
from backend.main import threading_pool, logger
from backend.schemas import DEFAULT_USER_ID
from backend.schemas import INTERNAL, UNFOUND


@app.route("/api/user/get_user_list", methods=["GET"])
def get_user_list() -> Response:
    """Gets the user list."""
    try:
        # Login with API Key, then retrieve the user history based
        # on the hashed API key.
        db = get_user_storage()
        user_list = db.user.find()
        users = []
        for user in user_list:
            users.append(
                {
                    "id": str(user["_id"]),
                    "username": user["username"],
                    "password": user["password"],
                    "create_time": user["create_time"],
                    "user_type": user["user_type"],
                    "remark": user["remark"]
                }
            )
    except Exception as e:
        return Response(response=None,
                        status=f'{INTERNAL} error fetch user list')
    return jsonify(users)



@app.route("/api/user/get_user_info", methods=["POST"])
def get_user_info() -> Response:
    """Gets the user info."""
    request_json = request.get_json()
    user_id = request_json.get("user_id", None)
    if user_id is not None:
        try:
            db = get_user_storage()
            user = db.user.find_one({"_id": ObjectId(user_id)})
            user_info = {
                    "id": str(user["_id"]),
                    "username": user["username"],
                    "password": user["password"],
                    "create_time": user["create_time"],
                    "user_type": user["user_type"],
                    "remark": user["remark"]
                }
            return jsonify(user_info)
        except Exception as e:
            import traceback
            traceback.print_exc()
            return Response(response=None,
                            status=f'{INTERNAL} error fetch user')
    else:
        return Response(response=None, status=f'{INTERNAL} error fetch user')



@app.route("/api/user/login", methods=["POST"])
def get_user_info() -> Response:
    """Gets the user info."""
    request_json = request.get_json()
    username = request_json.get("username", None)
    password = request_json.get("password", None)
    if username is not None and password is not None:
        try:
            db = get_user_storage()
            user = db.user.find_one({"username": username,"password":password})
            if user:
                return jsonify({"id": str(user["_id"])})
            else:
                return jsonify({"id": "0"})
        except Exception as e:
            import traceback
            traceback.print_exc()
            return Response(response=None,
                            status=f'{INTERNAL} error fetch user')
    else:
        return Response(response=None, status=f'{INTERNAL} 参数为空')



@app.route("/api/user/add_and_update_user", methods=["POST"])
def add_new_user() -> Response:
    """Creates a new or update user."""
    request_json = request.get_json()
    user_id = request_json.pop("user_id", '')
    user = request_json.get("user", None)
    if user:
        try:
            db = get_user_storage()
            user_id = user["id"]
            if user_id is not None and db.user.find_one(
                    {"_id": ObjectId(user_id)}):
                updates = {
                    "username": user["username"],
                    "email": user["email"],
                    "password": user["password"],
                    # "create_time": datetime.datetime.utcnow(),
                    "remark": user["remark"],
                    "user_type": user["user_type"]
                }
                db.user.update_one({"_id": ObjectId(user_id)},
                                           {"$set": updates})
            else:
                user = db.user.insert_one(
                    {
                        "username": user["username"],
                        "email": user["email"],
                        "password": user["password"],
                        "create_time": datetime.datetime.utcnow(),
                        "remark": user["remark"],
                        "user_type": user["user_type"]
                    }
                )
                user_id = str(user.inserted_id)
            return jsonify({"id": user_id})
        except Exception as e:
            return Response(response=None,
                            status=f"{INTERNAL} error add or update user")
    else:
        return Response(response=None, status=f"{UNFOUND} missing user")


@app.route("/api/user/delete_user", methods=["POST"])
def delete_user() -> Response:
    """Deletes a user."""
    request_json = request.get_json()
    chat_id = request_json.get("user_id", None)
    if chat_id:
        try:
            db = get_user_storage()
            db.user.delete_one({"_id": ObjectId(chat_id)})
            return jsonify({"success": True, "message": "User is deleted."})
        except Exception as e:
            return jsonify({"success": False, "message": str(e)})
    else:
        return jsonify({"success": False, "message": "user_id is missing"})

