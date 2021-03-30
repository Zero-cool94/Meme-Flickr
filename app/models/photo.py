from .db import db


class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    photoURL = db.Column(db.Text, nullable=False)
    # user = db.relationship("User", back_populates="photos")
    # comment = db.relationship("Comment", back_populates="photos")
    # like = db.relationship("Like", back_populates="photos")
    user = db.relationship('User', backref="photos")

    def to_dict(self):
        user = self.user.to_dict()
        userName = user['userName']
        likesByUser = [like.to_list() for like in self.likes]

        return {
            "id": self.id,
            "userId": self.userId,
            "photoURL": self.photoURL,
            "userName": userName,
            "likesByUser": likesByUser,
        }