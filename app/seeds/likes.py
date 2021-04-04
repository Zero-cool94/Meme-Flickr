
from app.models import db, User, Like, Photo

# Adds a demo user, you can add other users here if you want


def seed_likes():

    likes = Like(userId=1, photoId=1,)
    likes1 = Like(userId=1, photoId=1,)
    likes2 = Like(userId=1, photoId=1,)
    likes3 = Like(userId=1, photoId=1,)
    likes4 = Like(userId=1, photoId=1,)
    likes5 = Like(userId=1, photoId=1,)
    likes6 = Like(userId=1, photoId=1,)
    likes7 = Like(userId=1, photoId=2,)
    likes8 = Like(userId=1, photoId=2,)
    likes9 = Like(userId=1, photoId=2,)

    db.session.add(likes)
    db.session.add(likes1)
    db.session.add(likes2)
    db.session.add(likes3)
    db.session.add(likes4)
    db.session.add(likes5)
    db.session.add(likes6)
    db.session.add(likes7)
    db.session.add(likes8)
    db.session.add(likes9)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_likes():
    db.session.execute('TRUNCATE likes;')
    db.session.commit()
