
from app.models import db, User, Photo

# Adds a demo user, you can add other users here if you want


def seed_photos():

    photo1 = Photo(userId=1, photoURL="https://s29843.pcdn.co/blog/wp-content/uploads/sites/2/2016/09/generate-a-meme.jpg")  # noqa
    photo2 = Photo(userId=1, photoURL="https://d35w6hwqhdq0in.cloudfront.net/318193d65ba9493c09efb8ebc3dbaf2c.png")  # noqa
    photo3 = Photo(userId=1, photoURL="https://i.imgur.com/RHpy3Ho.jpg")  # noqa
    photo4 = Photo(userId=1, photoURL="https://funvizeo.com/media/memes/ee1cd1ff2ab81897/nobody-me-after-taking-one-programming-class-memes-fc239a104afe2365-d954df689bc7a8d3.jpg")  # noqa
    photo5 = Photo(userId=1, photoURL="https://miro.medium.com/max/2880/1*0VaTwYF3RdMFp1PjY_1NqA@2x.jpeg")  # noqa
    photo6 = Photo(userId=1, photoURL="https://i.pinimg.com/originals/23/b1/e7/23b1e763c040474632562c81152c1675.png")  # noqa
    photo7 = Photo(userId=1, photoURL="https://s3.amazonaws.com/rails-camp-tutorials/blog/programming+memes/programming-or-googling.jpg")  # noqa
    photo8 = Photo(userId=1, photoURL="https://wyncode.co/uploads/2014/08/81.jpg")  # noqa

    db.session.add(photo1)
    db.session.add(photo2)
    db.session.add(photo3)
    db.session.add(photo4)
    db.session.add(photo5)
    db.session.add(photo6)
    db.session.add(photo7)
    db.session.add(photo8)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_photos():
    db.session.execute('TRUNCATE photos;')
    db.session.commit()
