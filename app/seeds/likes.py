
from app.models import db, User, Like, Photo

# Adds a demo user, you can add other users here if you want


def seed_likes():

    likes = Like(userId=1, photoId=1,)

    db.session.add(likes)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_likes():
    db.session.execute('TRUNCATE likes;')
    db.session.commit()
