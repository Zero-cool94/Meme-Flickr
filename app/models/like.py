from .db import db
# from sqlalchemy.schema import Index


class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    photoId = db.Column(db.Integer, db.ForeignKey("photos.id"))

    # def to_list(self):
    #     return self.userId

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "photoId": self.photoId,
        }
