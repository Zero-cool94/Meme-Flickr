import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { createComment, deleteComment, getComments } from "../store/comments";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const ShowPosts = ({
  currentPhoto,
  setCurrentPhoto,
  handleClose,
  open,
  // comments,
  setOpen,
}) => {
  // const [comment, setComment] = React.useState(null);
  // comments = comments ? Object.values(comments) : undefined;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session);
  const photoId = currentPhoto;
  const [body, setBody] = useState("");
  let comments = useSelector((state) => state.comments.commentsArray);
  // let comments;
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: "36ch",
    },

    inline: {
      display: "inline",
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    dispatch(getComments(photoId));
  }, [photoId]);

  const removeComments = (id) => {
    dispatch(deleteComment(id));
  };

  const handleComments = (e) => {
    e.preventDefault();
    dispatch(createComment(user.id, currentPhoto, body));
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">add your comments here.</DialogTitle>
      <List className={classes.root}>
        {comments &&
          comments.map((oneComment) => {
            return (
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                  <button>
                    {" "}
                    <DeleteForeverIcon
                      onClick={() => removeComments(oneComment.id)}
                    />{" "}
                  </button>
                </ListItemAvatar>
                <ListItemText
                  primary={oneComment.body}
                  // secondary={
                  //   <React.Fragment>
                  //     <Typography
                  //       component="span"
                  //       variant="body2"
                  //       className={classes.inline}
                  //       color="textPrimary"
                  //     ></Typography>
                  //     {/* {oneComment.body} */}
                  //   </React.Fragment>
                  // }
                />
              </ListItem>
            );
          })}

        <Divider variant="inset" component="li" />
      </List>
      <DialogContent>
        <TextField
          autoFocus
          onChange={(e) => setBody(e.target.value)}
          margin="dense"
          id="name"
          label="add comment"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleComments} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ShowPosts;
