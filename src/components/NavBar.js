import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
const NavBar = () => {

  return (
    <div>
      <AppBar position="static" color="transparent" style={{zIndex:0, boxShadow:"none"}}>
        <Toolbar>
          <span id="spacer" style={{flexGrow:1}}></span>
          <Link to="/login" style={{textDecoration:'none', color:'black'}}>
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="/sign-up" style={{textDecoration:'none', color:'black'}}>
            <Button color="inherit" >Sign Up</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;