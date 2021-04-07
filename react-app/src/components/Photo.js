import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../store/comments";
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
  const [photos, setPhoto] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [counter, setCounter] = useState(photos.length);
  const [open, setOpen] = React.useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [commentState, setComments] = useState(null);
  const comments = useSelector((state) => state?.comments?.commentsArray);
  const dispatch = useDispatch();
  // const [likes, setLikes] = useState([0]);
  const { user } = useSelector((state) => state.session);

  useEffect(() => {
    if (loaded) return;
    const onLoad = async () => {
      setLoaded(true);
      const response = await fetch("/api/photos");
      if (!response.ok) return response.status;
      const data = await response.json();
      const { photos: photosData } = data;
      const { comments } = photosData;

      setPhoto([...photos, ...photosData]);
      setCounter(photos.length);
      setComments(comments);
      // dispatch(getComments(comments));
    };

    onLoad();
  }, [dispatch, user]);

  // let commentCount = 0;
  // Object.values(comments).map((comment) => {
  //   if (comment.photoId === photos.id) commentCount += 1;
  // });
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
      width: "100%",
      maxWidth: "36ch",
    },

    icon: {
      color: "rgba(4, 0, 255, 0.54)",
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

  // function handleCommentClick(e) {
  //   e.preventDefault();
  // }
  const handleClickOpen = (e) => {
    setOpen(true);
    let photo = e.target.parentNode.parentNode.parentNode.id;

    setCurrentPhoto(photo);
  };
  const handleClose = () => {
    setOpen(false);
    setCurrentPhoto(null);
  };

  return (
    <>
      <GridList cellHeight={350} className={classes.gridList} cols={3}>
        {photos.map((photo) => (
          <GridListTile key={`url(${photo.photoURL})`} cols={1}>
            <img className="img_home" src={photo.photoURL} alt={photo.id} />
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
                      {counter ? counter : photo.likes.length} Likes
                    </div>
                  </IconButton>
                  <IconButton
                    aria-label={`comments ${photo.title}`}
                    className={classes.icon}
                    onClick={handleClickOpen}
                    id={photo.id}
                  >
                    <CommentIcon />
                  </IconButton>
                  <ShowPosts
                    currentPhoto={currentPhoto}
                    setCurrentPhoto={setCurrentPhoto}
                    comments={commentState}
                    handleClose={handleClose}
                    open={open}
                    setOpen={setOpen}
                  />

                  {/* <div className="right">{commentCount} Comments</div> */}
                </>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </>
  );
};

export default GetPhotos;
