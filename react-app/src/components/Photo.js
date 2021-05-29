import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../store/comments";
import { getPhotos } from "../store/photos";
import "./photo.css";
import { GridList, GridListTile } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GridListTileBar from "@material-ui/core/GridListTileBar";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
// import Avatar from "@material-ui/core/Avatar";
// import Typography from "@material-ui/core/Typography";
// import { createLike, getLikes, unLike } from "../store/likes";
// import { useHistory } from "react-router-dom";
import ShowPosts from "./Comments";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const GetPhotos = ({ setAuthenticated }) => {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const { photos } = useSelector((state) => state?.photo);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session);
  const useStyles = makeStyles((theme) => ({
    // root: {
    //   display: "flex",
    //   flexWrap: "wrap",
    //   justifyContent: "space-around",
    //   overflow: "hidden",
    //   backgroundColor: theme.palette.background.paper,
    //   // width: "100%",
    //   // maxWidth: "36ch",
    // },
    // title: {
    //   color: theme.palette.primary.light,
    // },
    // titleBar: {
    //   background:
    //     "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    // },
    // inline: {
    //   display: "inline",
    // },
    icon: {
      color: "black",
      cursor: "pointer",
    },

    root: {
      margin: "7px",
      paddingTop: "16px",
      width: "29%",
      height: "40%",
      backgroundColor: "#fff",
      borderRadius: "6px",
      border: "1px solid rgb(205, 219, 226)",
    },

    media: {
      maxHeight: 590,
      width: "400px",
      objectFit: "fill",
      paddingLeft: "4%",
    },,
    likes: {
      position: "relative",
    },
  }));

  const classes = useStyles();

  function handleLikeClick(e) {
    e.preventDefault();
    setLoaded(true);
    let id = e.target.id;
    if (!e.target.id) id = e.target.parentNode.nextSibling.id;

    const addLike = async () => {
      const res = await fetch(`/api/likes/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await res.json();
    };
    addLike();
    window.location.reload();
  }
  const handleClickOpen = (e, id) => {
    setOpen(true);
    setCurrentPhoto(id);
  };
  const handleClose = () => {
    setOpen(false);
    setCurrentPhoto(null);
  };

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  return (
    <>
      <div className="wrapper">
        {photos &&
          Object.values(photos).map((photo) => (
            <Card className={classes.root}>
              <CardActionArea>
                <img src={photo.photoURL} className={classes.media} />
              </CardActionArea>
              <CardActions>
                <IconButton
                  aria-label={`like ${photo.title}`}
                  className={classes.icon}
                  onClick={handleLikeClick}
                >
                  <FavoriteIcon />
                  <div className={classes.likes} id={photo.id}>
                    {Object.keys(photo.likes).length} Likes
                  </div>
                </IconButton>
                <CommentIcon
                  id={photo.id}
                  onClick={(e) => handleClickOpen(e, photo.id)}
                  className={classes.icon}
                />
                <ShowPosts
                  currentPhoto={currentPhoto}
                  setCurrentPhoto={setCurrentPhoto}
                  handleClose={handleClose}
                  open={open}
                  setOpen={setOpen}
                />
              </CardActions>
            </Card>
          ))}
      </div>
    </>
  );
};

export default GetPhotos;

{
