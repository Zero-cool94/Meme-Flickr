from flask import Blueprint, jsonify, session, request
from app.models import User, db, Photo
from flask_login import current_user, login_user, logout_user, login_required

photo_routes = Blueprint('photo', __name__)


@photo_routes.route('')
@login_required
def photo():
    photos = Photo.query.all()
    return {
        "photos": [photo.to_dict() for photo in photos]
    }
