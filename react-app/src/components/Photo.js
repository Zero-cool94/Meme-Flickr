import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./photo.css";
import { GridList, GridListTile } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { createLike, getLikes, unLike } from "../store/likes";
import { makeStyles } from "@material-ui/core/styles";
// import { useHistory } from "react-router-dom";

const GetPhotos = ({ setAuthenticated }) => {
  // const history = useHistory();
  // const state = useSelector((state) => state.likes);
  // const [counter, setCounter] = useState(0);
  // const likeState = Object.values(state);
  const [photos, setPhoto] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [counter, setCounter] = useState(photos.length);
  // const dispatch = useDispatch();
  // const [likes, setLikes] = useState([0]);
  const { user } = useSelector((state) => state.session);

  useEffect(() => {
    if (loaded) return;
    const onLoad = async () => {
      setLoaded(true);
      const response = await fetch("/api/photos");
      if (!response.ok) return response.status;
      const { photos: photosData } = await response.json();

      setPhoto([...photos, ...photosData]);
      setCounter(photos.length);
    };

    onLoad();
  });
  // useEffect(() =>{
  //   dispatch(getLikes())
  // },[dispatch])

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },

    icon: {
      color: "rgba(53, 179, 252, 0.54)",
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
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
      console.log(data);
    };
    addLike();
    window.location.reload();
  }
  return (
    <>
      <GridList cellHeight={350} className={classes.gridList} cols={3}>
        {photos.map((photo) => (
          <GridListTile key={`url(${photo.photoURL})`} cols={1}>
            {/* <h1 className="like-numbers"></h1> */}
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
                    aria-label={`info about ${photo.title}`}
                    className={classes.icon}
                  >
                    <CommentIcon />
                  </IconButton>
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
