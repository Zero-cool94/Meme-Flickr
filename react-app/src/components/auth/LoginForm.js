import React, { useState } from "react";
import { useDispatch } from "react-redux"
// import { useHistory } from "react-router-dom";
import { setUser } from "../../store/auth";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import "./LoginForm.css"


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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  // const history = useHistory()

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  const classes = useStyles();
  if (authenticated) {
    return <Redirect to="/" />;
  }

  const handleDemoClick = async (e) => {
    const demoUser = await login("demo@aa.io", "password");
    dispatch(setUser(demoUser));
    setAuthenticated(true);
  };

  return (

    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
      Log in to Meme-Flickr
      </Typography>
    <form className={classes.form} noValidate onSubmit={onLogin}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        {/* <label htmlFor="email">Email</label> */}
        <TextField

         variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        {/* <label htmlFor="password">Password</label> */}
        <TextField
        // className="textfield" InputLabelProps={{className:textfield__form}}
           variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={updatePassword}
        />
         <FormControlLabel

            control={<Checkbox
              style={{
        color: "#128fdc",
        }}
            value="remember"
             color="primary" />}
            label="Remember me"
          />
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
        Login
        </Button>
        <Button
        style={{
        backgroundColor: "#128fdc",
        }}
        type="click"
        fullWidth
        onClick={handleDemoClick}
        variant="contained"
        color="primary"
        className={classes.submit}
        >
        Demo User
        </Button>
      </div>
      <Grid container>
            <Grid item xs>
            <div>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
              </div>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      <Copyright />
      </Box>
    </Container>
  );
};

export default LoginForm;
