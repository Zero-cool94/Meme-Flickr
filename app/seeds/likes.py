
from app.models import db, User, Like, Photo

# Adds a demo user, you can add other users here if you want


def seed_likes():

    likes = Like(userId=1, photoId=1,)
    likes1 = Like(userId=1, photoId=2,)
    likes2 = Like(userId=1, photoId=3,)
    likes3 = Like(userId=1, photoId=4)
    likes4 = Like(userId=1, photoId=5,)
    likes5 = Like(userId=1, photoId=6,)
    likes6 = Like(userId=1, photoId=7,)
    likes7 = Like(userId=1, photoId=8,)
    likes8 = Like(userId=2, photoId=2,)
    likes9 = Like(userId=2, photoId=4,)
    likes10 = Like(userId=2, photoId=5,)
    likes11 = Like(userId=2, photoId=6,)
    likes12 = Like(userId=2, photoId=8,)
    likes13 = Like(userId=2, photoId=7,)
    likes14 = Like(userId=2, photoId=1,)

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
    db.session.add(likes10)
    db.session.add(likes11)
    db.session.add(likes12)
    db.session.add(likes13)
    db.session.add(likes14)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_likes():
    db.session.execute('TRUNCATE likes;')
    db.session.commit()
