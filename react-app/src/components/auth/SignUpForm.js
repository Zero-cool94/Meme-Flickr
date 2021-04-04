import React, { useState } from "react";
import { signUp } from '../../services/auth';
// import { setUser } from "../../store/auth";
import { Redirect } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Emad Masoud
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#128fdc",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const SignUpForm = ({authenticated, setAuthenticated}) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        setAuthenticated(true);
      } else {
        setErrors(user.errors);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };
  const classes = useStyles();
  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
      sign-up to Meme-Flickr
      </Typography>
    <form className={classes.form} noValidate onSubmit={onSignUp}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
      <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          autoComplete="username"
          label="User Name"
          autoFocus
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        />
      </div>
      <div>
        <TextField
           variant="outlined"
           margin="normal"
           required
           fullWidth
           id="email"
           label="Email Address"
           type="text"
           name="email"
           autoComplete="email"
           autoFocus
           onChange={updateEmail}
           value={email}
        />
      </div>
      <div>
      <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          name="password"
          id="password"
          autoFocus
          autoComplete="current-password"
          onChange={updatePassword}
          value={password}
        />
      </div>
      <div>
      <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Confirm Password"
          id="confirm password"
          type="password"
          name="repeat_password"
          autoFocus
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required
        />
      </div>
      <Button
          style={{
          backgroundColor: "#128fdc",
          }}
           type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
       >
       Sign Up
       </Button>
       <Grid item>
        <Link
            style={{
              color: "#128fdc",
                  }}
             href="/login"
              variant="body2">
            {"Already a member? Log in here."}
         </Link>
         </Grid>
    </form>
    <Box mt={8}>
      <Copyright />
      </Box>
      </div>
    </Container>
  );
};

export default SignUpForm;
