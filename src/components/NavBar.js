import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const NavBar = () => {

  return (
    <div>
      <AppBar position="static" color="transparent" style={{zIndex:0, boxShadow:"none"}}>
        <Toolbar>
          <span id="spacer" style={{flexGrow:1}}></span>
          <Button color="inherit" >Login</Button>
          <Button color="inherit" >Sign Up</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;