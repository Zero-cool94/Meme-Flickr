const SET_PHOTOS = "SET_PHOTOS";

const setPhotos = (photos) => ({
  type: SET_PHOTOS,
  photos,
});

export const getPhotos = () => async (dispatch) => {
  const response = await fetch(`/api/photos`);
  if (response.ok) {
    const res = await response.json();
    dispatch(setPhotos(res.photos));
    return response;
  }
};

const initialState = {};

const photosReducer = (state = initialState, action = {}) => {
  let newState;
  let allPhotos;
  switch (action.type) {
    case SET_PHOTOS:
      allPhotos = action.photos;
      // action.photos.forEach((photo) => {
      //   allPhotos.push(photo);
      // });

      return {
        photos: allPhotos,
      };
    default:
      return state;
  }
};

export default photosReducer;
