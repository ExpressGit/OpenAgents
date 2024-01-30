import pymongo
from flask import g
import os
from backend.config.config import DataBaseSettings

def get_user_storage():
    """Connects to mongodb."""
    if "user_storage" not in g:
        g.user_storage = pymongo.MongoClient("mongodb://{0}:27017/".format(os.getenv("MONGO_SERVER",DataBaseSettings.MONGO_SERVER)))
    return g.user_storage["xlang"]


def close_user_storage():
    """Closes mongodb."""
    user_storage = g.pop("user_storage", None)
    if user_storage is not None:
        user_storage["xlang"].close()
