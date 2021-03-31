import React, { useState, useEffect } from "react";
import "./photo.css"
import {GridList,GridListTile} from '@material-ui/core';






const GetPhotos= ({setAuthenticated}) => {
  const [photo, setPhoto] = useState([])
  const [loaded, setLoaded] = useState(false);
  useEffect(() =>{
    if (loaded)return
    const onLoad = async () => {
      setLoaded(true);
      const response = await fetch("/api/photos")
      if (!response.ok) return response.status
      const {photos} = await response.json()

      setPhoto([...photo,...photos])
    };
onLoad()
  })
//   let comp
//   if (photo.length){
//     comp = photo.map(el => {

//       const inline = {"background":`url(${el.photoURL})`}
//        return (
//       <li>
//         <img style={inline} className={"img_div"}/>
//       </li>
//     )})
//   }

// <ul>
// {comp?comp:null}
// </ul>
console.log(photo[0]?.photoURL)
  return (
    <GridList cellHeight={160} className="classes.gridList" cols={3}>
  {photo.map((tile) => (
    <GridListTile key={`url(${tile.photoURL})`} cols={tile.cols || 1}>
      <img src={tile.photoURL} alt={tile.id} />
    </GridListTile>
  ))}
</GridList>


)}





export default GetPhotos;
