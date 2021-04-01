from flask import Blueprint, jsonify, redirect, request
from app.models import db, Photo, User, Like


like_routes = Blueprint("likes", __name__)


# @song_routes.route('/get')
# def get_songs():
#     songs = {"songs": [song.to_dict() for song in Song.query.limit(16).all()]} # noqa


@like_routes.route('/<int:id>')
def get_like(id):
    # likes = []
    # for like in Like.query.filter(Like.photoId == id).all():
    #     likes = {like.id: like.to_dict()}
    # res = {
    #     "likes": likes
    # }
    count = Like.query.filter(Like.photoId == id).count()
    return jsonify(count)


# @like_routes.route('', methods=['POST'])
# def like():
#     like = ''
#     if 'photoId' in request.json and 'userId' in request.json:
#         # add current_user.id to userId variable
#         like = Like(photoId=request.json['photoId'],
#                     userId=request.json['userId'])

#     db.session.add(like)
#     db.session.commit()
#     return jsonify(like.to_dict())


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
