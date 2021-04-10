// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import ImageUploading from "react-images-uploading";
// // import { createNewPhoto } from "../store/photos";

// const Upload = () => {
//   const history = useHistory();
//   const dispatch = useDispatch();
//   const [image, setImage] = useState([]);
//   const [tag, setTags] = useState("");
//   const sessionUser = useSelector((state) => state.session.user);
//   const maxNumber = 1;

//   const onChange = (imageList, addUpdateIndex) => {
//     setImage(imageList);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const photoURL = image[0]?.data_url;
//     // add the post to the database
//     const newPhoto = {
//       userId: sessionUser.id,
//       photoURL,
//       tag,
//     };
//     const res = dispatch(createNewPhoto(newPhoto));

//     if (res) {
//       return history.push("/");
//     }
//   };
