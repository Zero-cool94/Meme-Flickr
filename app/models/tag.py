from .db import db
# from sqlalchemy.schema import Index


class Tag(db.Model):
    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True)
    photoId = db.Column(db.Integer, db.ForeignKey("photos.id"))
    tag_name = db.Column(db.String)

    def to_list(self):
        return self.id

    def to_dict(self):
        return {
            "id": self.id,
            "photoId": self.postId,
        }
