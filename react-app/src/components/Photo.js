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
const GetPhotos = ({ setAuthenticated }) => {
  // const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const { photos } = useSelector((state) => state?.photo);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session);
  // const likes = useSelector((state) => state?.likes);
  // const [value, setValue] = React.useState(0);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
      // width: "100%",
      // maxWidth: "36ch",
    },
    icon: {
      // color: "rgba(4, 0, 255, 0.9)",
      color: "white",
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
    inline: {
      display: "inline",
    },
  }));

  const classes = useStyles();
  // useEffect(() => {
  //   if (user) dispatch(getLikes());
  // }, [dispatch, user]);

  // const likePhoto = (id) => {
  //   dispatch(createLike({ userId: user.id, photoId: id }));
  // };

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
  return (
    <>
      <div className={classes.root}>
        <GridList cellHeight={350} className={classes.gridList} cols={3}>
          {photos &&
            Object.values(photos).map((photo) => (
              <GridListTile
                key={`url(${photo.photoURL})`}
                cols={0.95}
                style={{ padding: 3 }}
              >
                <div>
                  <img
                    className="img_home"
                    src={photo.photoURL}
                    alt={photo.id}
                  />
                </div>
                <GridListTileBar
                  title={photo.title}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                  actionIcon={
                    <>
                      <IconButton
                        aria-label={`like ${photo.title}`}
                        className={classes.icon}
                        onClick={handleLikeClick}
                      >
                        <FavoriteIcon />
                        <div className={`left`} id={photo.id}>
                          {Object.keys(photo.likes).length} Likes
                        </div>
                      </IconButton>
                      {/* <IconButton */}
                      {/* aria-label={`comments ${photo.title}`}
                      className={classes.icon}
                      onClick={handleClickOpen}
                      id={photo.id} */}
                      {/* // > */}
                      <CommentIcon
                        id={photo.id}
                        onClick={(e) => handleClickOpen(e, photo.id)}
                        className={classes.icon}
                      />

                      {/* </IconButton> */}
                      <ShowPosts
                        currentPhoto={currentPhoto}
                        setCurrentPhoto={setCurrentPhoto}
                        handleClose={handleClose}
                        open={open}
                        setOpen={setOpen}
                      />
                    </>
                  }
                />
              </GridListTile>
            ))}
        </GridList>
      </div>
    </>
  );
};

export default GetPhotos;
