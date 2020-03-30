import React, { useContext, Fragment, useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

import { UserContext } from './UserContext';
const NavBar = () => {

  const [load, setLoad] = useState(false)

  let authUser = useContext(UserContext);

  const signOut = () => {
    auth.signOut()
      .then(() => {
        setLoad(!load);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
        <AppBar position="static" color="transparent" style={{zIndex:0, boxShadow:"none"}}>
          <Toolbar>
            <span id="spacer" style={{flexGrow:1}}></span>
            { !authUser
            ?
              <Fragment>
                <Link to="/login" style={{textDecoration:'none', color:'black'}}>
                  <Button color="inherit">Login</Button>
                </Link>
                <Link to="/sign-up" style={{textDecoration:'none', color:'black'}}>
                  <Button color="inherit" >Sign Up</Button>
                </Link>
              </Fragment>
            :
              <Fragment>
                  <Button color="inherit" onClick={() => signOut()}>Sign Out</Button>
              </Fragment>
          }
          </Toolbar>
        </AppBar>
    </div>
  );
}

export default NavBar;