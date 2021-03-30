
from app.models import db, Comment, User, Photo

# Adds a comment, you can add other users here if you want


def seed_comments():

    comment1 = Comment(userId=1, photoId=1, body='thats funny')

    db.session.add(comment1)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the comments table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_comments():
    db.session.execute('TRUNCATE comments;')
    db.session.commit()
