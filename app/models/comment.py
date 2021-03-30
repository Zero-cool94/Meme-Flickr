from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    photoId = db.Column(db.Integer, db.ForeignKey("photos.id"), nullable=False)
    body = db.Column(db.Text, nullable=False)
    # user = db.relationship("User", back_populates="comments")
    # photo = db.relationship("Photo", back_populates="comments")
    # like = db.relationship("Like", back_populates="comments")
    # photot = db.relationship("Photo", backref="comments")

    def to_dict(self):
        userName = self.user.userName

        return {
            "id": self.id,
            "userId": self.userId,
            "postId": self.phototId,
            "body": self.body,
            "userName": userName,
        }
