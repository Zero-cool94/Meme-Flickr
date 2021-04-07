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
    # photo_state = {}
    # for p in photos:
    #     comment_state = {}
    #     for c in p.comment:
    #         comment_state[c.id] = c.to_dict()
    #     photo_state[p.id] = {"comment": comment_state}
    #     like_state = {}
    #     for l in p.like:
    #         like_state[l.id] = l.to_dict()
    #     photo_state[p.id]["like"] = like_state

    return {
        #  "photo": photo_state
        "photos": [{**photo.to_dict(),  "likes": [li.to_dict() for li in photo.like]} for photo in photos]
        #   "photos": [{**photo.to_dict(),  "comments": [li.to_dict() for li in photo.comment], "likes": [li.to_dict() for li in photo.like]} for photo in photos]  # noqa
    }
