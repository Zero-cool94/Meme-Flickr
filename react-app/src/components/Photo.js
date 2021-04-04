import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./photo.css"
import {GridList,GridListTile} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { createLike, getLikes, unLike } from "../store/likes";
import { makeStyles } from '@material-ui/core/styles';


const GetPhotos= ({setAuthenticated}) => {
  const state = useSelector(state => state.likes)
const [counter, setCounter] = useState(0)
  const likeState = Object.values(state)
  console.log('-------------',likeState)


  likeState.forEach(like => {
    let counter1 = 0
    console.log(like)
    if(like.photoId == 1){
      // counter1 = counter1 + 1
      // setCounter(1)
    }
  })
  // const s = Object.values(likeState[0])
  const [photo, setPhoto] = useState([])
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch()
  const [likes , setLikes] = useState([0])
  const sessionUser = useSelector((state) => state?.session?.user);

  useEffect(() =>{
    if (loaded)return
    const onLoad = async () => {
      setLoaded(true);
      const response = await fetch("/api/photos")
      if (!response.ok) return response.status
      const {photos} = await response.json()

      setPhoto([...photo,...photos])

    }

    onLoad()
    })
    useEffect(() =>{
      dispatch(getLikes())
    },[dispatch])
    //   let photoId;
    //   if(photo){
    //   photoId = photo.map(img => img.id)
    //   }else return null
    // async function getLikes (id){
    // const response = await fetch(`/api/likes/`)
    // if (response.ok){
    //   const upVote = await response.json()
    //   setLikes([...likes, upVote])
    //   // return likes
    // }else return response.status
// };

  // if(photoId)photoId.forEach(id => getLikes(id))
  // getLikes(likes)

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },

    icon: {
      // color: 'rgba(255, 255, 255, 0.54)',
      color: "rgba(53, 179, 252, 0.54)",
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  }));

  const classes = useStyles();
  return (
    <>
    <div className={classes.root}></div>
    <GridList cellHeight={350} className={classes.gridList} cols={3}>
  {photo.map((tile) => (
    <GridListTile   key={`url(${tile.photoURL})`} cols={tile.cols || 1}>
    {tile.id === 1 &&<h1 className="like-numbers">{counter}</h1>}

    <div>
      <img className={"img_home"}  src={tile.photoURL} alt={tile.id} />
      </div>
      <GridListTileBar

              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              // subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton aria-label={`like  ${tile.like}`} className={classes.icon}>
                  <FavoriteIcon />
                </IconButton>
              } />
          </GridListTile>

  ))}
</GridList>
</>

)}





export default GetPhotos;
