import React, { useState, useEffect } from "react";
import "./photo.css"
import {GridList,GridListTile} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import GridListTileBar from '@material-ui/core/GridListTileBar';




const GetPhotos= ({setAuthenticated}) => {
  const [photo, setPhoto] = useState([])
  const [loaded, setLoaded] = useState(false);
  const [likes , setLikes] = useState([])
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

      let photoId;
      if(photo){
      photoId = photo.map(img => img.id)
      }else return null
    async function getLikes (id){


    const response = await fetch(`/api/likes/${id}`)
    if (response.ok){
      const upVote = await response.json()

      setLikes([...likes, upVote])
      // return likes

    }else return response.status
};

  // if(photoId)photoId.forEach(id => getLikes(id))
  getLikes(1)
},[photo])








  return (
    <GridList cellHeight={350} className={"gridList"} cols={3}>
  {photo.map((tile) => (
    <GridListTile   key={`url(${tile.photoURL})`} cols={tile.cols || 1}>
    <div>
      <img className={"img_home"}  src={tile.photoURL} alt={tile.id} />
      </div>
      <GridListTileBar
              title={tile.title}
              // subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton aria-label={`like  ${tile.like}`} className={"classes.icon"}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>

  ))}
</GridList>


)}





export default GetPhotos;
