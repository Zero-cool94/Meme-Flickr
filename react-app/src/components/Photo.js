import React, { useState, useEffect } from "react";
import * as classes from "./photo.module.css"
import { getLikes } from "../store/likes";




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
      console.log(photos)
      setPhoto([...photo,...photos])
    };
onLoad()
  })
  let comp
  if (photo.length){
    comp = photo.map(el => {

      const inline = {"background":`url(${el.photoURL})`}
       return (
      <li>
        <div style={inline} className={classes.img_div}></div>
      </li>
    )})
  }
  return (
  <ul>
    {comp?comp:null}
  </ul>
)}

export default GetPhotos;
