from flask import Blueprint, jsonify, session, request
from app.models import User, db, Photo, Like
from flask_login import current_user, login_user, logout_user, login_required

photo_routes = Blueprint('photo', __name__)


@photo_routes.route('')
# @login_required
def photos():
    photos = Photo.query.all()
    # print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>", photos)
    # [[print(l.users) for l in photo.like] for photo in photos]
    return {
        "photos": [{**photo.to_dict(),  "likes": [li.to_dict() for li in photo.like]} for photo in photos]  # noqa
    }
