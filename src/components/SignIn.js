import React, { useState, useEffect } from 'react';
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
import { useHistory } from 'react-router-dom';

// firebase
import firebase, { auth } from '../firebase';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Carpooly 
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

const SignIn = () => {
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [pass, setPass] = useState('');
  const [check, setCheck] = useState(false);
  const [pHelperText, setPHelperText] = useState('');
  const [pError, setPError] = useState(false);

  const classes = useStyles();

  const history = useHistory();

  const submit = () => {
    if (!email.includes('@calpoly.edu')) {
      setEmailError(true);
      return;
    }
    let persistance;
     if (!check) {
      persistance = firebase.auth.Auth.Persistence.NONE;
    } else {
      persistance = firebase.auth.Auth.Persistence.LOCAL;
    }
    auth.setPersistence(persistance).then(() => {
      return auth.signInWithEmailAndPassword(email, pass)
        .then((res) => {
          // Bandage, fixes race condition with user updating from app.js
          const delay = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
          delay(1000).then(() => history.push('/map'));
        })
        .catch(e => {
          let errorCode = e.code;
          let errorMessage = e.message;
          switch (errorCode) {
            case 'auth/wrong-password':
              setPHelperText('Username or password is incorrect.');
              setPError(true);
              break;
            case 'auth/user-not-found':
              setPHelperText('That email does not exist.');
              setPError(true);
              break;
            default:
              setPHelperText(errorMessage);
              break;
          }
        });
    })
  }

  // update the disabled state
  useEffect(() => {
    if (email && pass) {
      if (disabled) setDisabled(false);
      return;
    }
    if (!disabled) setDisabled(true);
  }, [email, pass, disabled]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText="You must use your @calpoly.edu email address."
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onClick={() => {
              setPHelperText('')
              setPError(false)
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            helperText={pHelperText}
            error={pError}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox onChange={(e) => setCheck(e.target.value)} value={check} color="primary" />}
            label="Remember me"
          />
          <Button
            disabled={disabled}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => submit()}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignIn;