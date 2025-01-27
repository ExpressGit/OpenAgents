import pymongo
from flask import g
import os
from backend.config.config import DataBaseSettings

def get_user_conversation_storage():
    """Connects to mongodb."""
    if "user_conversation_storage" not in g:
        g.user_conversation_storage = pymongo.MongoClient("mongodb://{0}:27017/".format(os.getenv("MONGO_SERVER",DataBaseSettings.MONGO_SERVER)))
    return g.user_conversation_storage["tianji"]


def close_user_conversation_storage():
    """Closes mongodb."""
    user_conversation_storage = g.pop("user_conversation_storage", None)
    if user_conversation_storage is not None:
        user_conversation_storage["tianji"].close()
