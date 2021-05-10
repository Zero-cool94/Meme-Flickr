# Flask React Project

This is the backend for the Flask React project.

Brief Introduction
Inspired by flickr.com, meme-flickr is a the place where you can find memes, you can upload, like, add comments.

## Getting started

### [live link](https://meme-flickr.herokuapp.com/login)

  ## Technologies
   meme-flickr is built using the following stack & libraries:
 
## Backend 
   1.Python 
      *Flask-SQLAlchemy

   2.PostgreSQL
      *PostgreSQL is a relational database management system emphasizing extensibility and SQL                    compliance.
   

## Frontend

   1.Javascript
   2.React
      *React is a JavaScript library for building user interfaces. It deals with the views and lets you        *choose the rest of your front-end architecture.
   3.Redux
      *Redux is a JavaScript library for managing application state.
      
### how to use :
 #### Install flask dependencies in root directory
$ pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt

#### Install dependencies in react-app directory
$ cd react-app
$ npm install

#### Run back end server from pipenv shell
$ pipenv shell
$ flask run

#### Run front end server
$ npm start

## Hosting 
    1. Heroku
      *Heroku is a platform as a service that enables developers to build, run, and operate applications        entirely in the cloud.
## Features

    *Logged-in users have can upload memes .
