
from app.models import db, Tag, Photo

# Adds a tag user, you can add other users here if you want


def seed_tags():

    tag1 = Tag(photoId=1, tag_name="funny")
    tag2 = Tag(photoId=2, tag_name="softwear")
    tag3 = Tag(photoId=3, tag_name="animal")
    tag4 = Tag(photoId=4, tag_name="2021")
    tag5 = Tag(photoId=5, tag_name="anything")
    tag6 = Tag(photoId=6, tag_name="meme")
    tag7 = Tag(photoId=7, tag_name="stocks")
    tag8 = Tag(photoId=8, tag_name="cats")

    db.session.add(tag1)
    db.session.add(tag2)
    db.session.add(tag3)
    db.session.add(tag4)
    db.session.add(tag5)
    db.session.add(tag6)
    db.session.add(tag7)
    db.session.add(tag8)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_tags():
    db.session.execute('TRUNCATE tags;')
    db.session.commit()
