
from app.models import db, Comment, User, Photo

# Adds a comment, you can add other users here if you want


def seed_comments():

    comment1 = Comment(userId=1, photoId=1, body='thats funny')
    comment2 = Comment(userId=1, photoId=2, body='lol')
    comment3 = Comment(userId=1, photoId=3, body='true')
    comment4 = Comment(userId=1, photoId=4, body='[hahahahahah]')
    comment5 = Comment(userId=1, photoId=5, body='!!!!!!!!!!!!!!!!')
    comment6 = Comment(userId=1, photoId=6, body='thats funny')
    comment7 = Comment(userId=1, photoId=7, body='hahahahahhaha')
    comment8 = Comment(userId=1, photoId=8, body='thats funny')
    comment9 = Comment(userId=2, photoId=1, body='thats funny')
    comment10 = Comment(userId=2, photoId=1, body='so true hahaha')
    comment11 = Comment(userId=2, photoId=1, body='thats super funny')

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the comments table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_comments():
    db.session.execute('TRUNCATE comments;')
    db.session.commit()
