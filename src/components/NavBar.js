import React, { useContext, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { UserContext } from './UserContext';
const NavBar = () => {

  const user = useContext(UserContext);
  console.log(user);

  return (
    <div>
        <AppBar position="static" color="transparent" style={{zIndex:0, boxShadow:"none"}}>
          <Toolbar>
            <span id="spacer" style={{flexGrow:1}}></span>
            { !user
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
                <Link to="/sign-up" style={{textDecoration:'none', color:'black'}}>
                  <Button color="inherit" >Sign Out</Button>
                </Link>
              </Fragment>
          }
          </Toolbar>
        </AppBar>
    </div>
  );
}

export default NavBar;