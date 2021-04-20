const SET_COMMENTS = "SET_COMMENTS";
const CREATE_COMMENTS = "CREATE_COMMENTS";
const DELETE_COMMENTS = "DELETE_COMMENTS";

const setComments = (comments) => ({
  type: SET_COMMENTS,
  comments,
});

const createComments = (comments) => ({
  type: CREATE_COMMENTS,
  comments,
});

const deleteComments = (id) => ({
  type: DELETE_COMMENTS,
  id,
});

// get all comments in database
export const getComments = (id) => async (dispatch) => {
  const response = await fetch(`/api/comments/${id}`);

  if (response.ok) {
    const res = await response.json();
    dispatch(setComments(res.comments));
    return response;
  }
};

export const createComment = (userId, photoId, body) => async (dispatch) => {
  const build = {
    method: "POST",
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify({ userId, photoId, body }),
  };
  const response = await fetch(`/api/comments/`, build);
  if (!response.ok) alert("ERROR something went wrong ");
  const data = await response.json();
  return dispatch(createComments(data));
};

// Deleting a comment
export const deleteComment = (id) => async (dispatch) => {
  const build = {
    method: "DELETE",
    headers: { "Content-Type": "Application/json" },
  };
  const response = await fetch(`/api/comments/${id}`, build);
  const result = response.json();
  dispatch(deleteComments(result));
  return response;
};

const initialState = {};
const commentsReducer = (state = initialState, action) => {
  let newState;
  let allComments;
  switch (action.type) {
    case SET_COMMENTS:
      allComments = [];
      action.comments.forEach((comment) => {
        allComments.push(comment);
      });
      return {
        commentsArray: allComments,
      };
    case CREATE_COMMENTS:
      // allComments = [];
      // action.comments.forEach((comment) => {
      //   allComments.unshift(comment);
      // });
      const newCommentsArray = [...state.commentsArray, action.comments];
      return {
        commentsArray: newCommentsArray,
      };

    case DELETE_COMMENTS:
      newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;
