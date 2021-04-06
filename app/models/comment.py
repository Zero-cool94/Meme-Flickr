from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)  # noqa
    photoId = db.Column(db.Integer, db.ForeignKey("photos.id"), nullable=False)
    body = db.Column(db.Text, nullable=False)

    def to_dict(self):
        # userName = self.user.userName

        return {
            "id": self.id,
            "userId": self.userId,
            "photoId": self.photoId,
            "body": self.body,
            # "userName": userName,
        }
