// Action Types
const ADD_LIKE = "ADD_LIKE";
const GET_LIKES = "GET_LIKES";
const DELETE_LIKE = "DELETE_LIKE";

// Action Creators
const addLike = (like) => ({
  type: ADD_LIKE,
  like: like,
});

const getLike = (likes) => ({
  type: GET_LIKES,
  payload: likes,
});

const deleteLike = (id) => ({
  type: DELETE_LIKE,
  id: id,
});

// Thunks
export const createLike = (likeObj) => async (dispatch) => {
  // If id has photoId property then body equals photoId
  let likeBody = { userId: likeObj.userId };

  if (likeObj.hasOwnProperty("photoId")) {
    likeBody.photoId = likeObj.photoId;
  }

  const response = await fetch("/api/likes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(likeBody),
  });

  if (response.ok) {
    const res = await response.json();
    dispatch(addLike(res));
  }

  return response;
};

export const getLikes = () => async (dispatch) => {
  const response = await fetch(`/api/likes/`);
  const res = await response.json();
  dispatch(getLike(res));
};

export const unLike = (likeObj) => async (dispatch) => {
  let likeBody = { userId: likeObj.userId };

  if (likeObj.hasOwnProperty("photoId")) {
    likeBody.photoId = likeObj.photoId;
  }

  const response = await fetch("/api/likes/", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(likeBody),
  });

  if (response.ok) {
    const res = await response.json();
    if (res.success) {
      dispatch(deleteLike(res.id));
    }
  }

  return response;
};
// Reducer
// const initialState = {}

const likesReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case ADD_LIKE:
      newState = {};
      const likeId = action.like.id;
      newState[likeId] = action.like;
      return {
        ...state,
        ...newState,
      };
    case GET_LIKES:
      newState = {};
      action.payload.likes.forEach((like) => {
        newState[like.id] = like;
      });
      // return {
      //     ...state,
      //     ...newState,
      // }
      return newState;
    case DELETE_LIKE:
      newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default likesReducer;
