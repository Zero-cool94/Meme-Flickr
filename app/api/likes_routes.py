from flask import Blueprint, jsonify, redirect, request
from app.models import db, Photo, User, Like


likes_routes = Blueprint("likes", __name__)


@likes_routes.route('/<int:id>', methods=['POST'])
def like(id):
    like = ''
    if 'userId' in request.json:
        # add current_user.id to userId variable
        like = Like(photoId=id,
                    userId=request.json['userId'])

    db.session.add(like)
    db.session.commit()
    return jsonify(like.to_dict())


# @like_routes.route('')
# def get_all_likes():
#     likes = Like.query.all()
#     return {"likes": [like.to_dict() for like in likes]}


# @like_routes.route('', methods=['DELETE'])
# def unlike_photos():

#     query = ''
#     if 'photoId' in request.json and 'userId' in request.json:
#         query = Like.query.filter(
#             Like.photoId == request.json['photoId'],
#             Like.userId == request.json['userId']
#         )

#     like = query.first()

#     success = query.delete()

#     db.session.commit()

#     return jsonify({'id': like.id, 'success': True if success else False})


# @likes_routes.route('/')
# def get_likes():
#     # likes = []
#     # for like in Like.query.filter(Like.photoId == id).all():
#     #     likes = {like.id: like.to_dict()}
#     # res = {
#     #     "likes": likes
#     # }
#     likes = Like.query.all()
#     # likes = Photo.query.join(Like).all()
#     # likes = Like.query.all()
#     return jsonify({"likes": [like.to_dict() for like in likes]})
