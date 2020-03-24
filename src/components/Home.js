import React from 'react';
import Typography from '@material-ui/core/Typography';
import NavBar from './NavBar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import rideshare from '../assets/order_ride.svg';
import './Home.css';

const Home = () => {
   return (
      <div id="home">
         <NavBar></NavBar>
         <section id="main">
            <Grid container spacing={3}>
               <Grid item xs={12} sm={6}>
                  <h1 align="center" class="title-header">Carpooly</h1>
                  <Typography variant="h4" align="center">Get a ride with other Cal Poly Students</Typography>
               </Grid>
               <Grid item xs={12} sm={6}>
                  <img src={rideshare} style={{height: '60vh', width: '45vw'}}/>
                  <Button variant="contained">Get a ride</Button>
               </Grid>
            </Grid>
         </section>
      </div>
   );
}

export default Home;