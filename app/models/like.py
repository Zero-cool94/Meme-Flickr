from .db import db
# from sqlalchemy.schema import Index


class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    photoId = db.Column(db.Integer, db.ForeignKey("photos.id"))
    user = db.relationship('User', backref='likes')
    # user = db.relationship("User", back_populates="likes")
    post = db.relationship("Post", backref="likes")
    # comment = db.relationship("Comment", back_populates="likes")
    comment = db.relationship('Comment', backref='likes')

    def to_list(self):
        return self.userId

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "photoId": self.postId,
        }
