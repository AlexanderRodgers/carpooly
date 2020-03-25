import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import NavBar from './NavBar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import rideshare from '../assets/order_ride.svg';
import './Home.css';

// const ActionButton = styled(({ color, ...other}) => <Button {...other }/>)`
   // font-family: 'Dosis', sans-serif;
   // font-size: 18px;
   // line-height: 22px;
   // font-weight: 600;
   // color: white;
   // background-color: #1089d4;
   // box-shadow: 0px 8px 40px 0 rgba(0, 0, 0, 0.37);
   // text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
   // letter-spacing: 1px;
   // border-radius: 5px;
   // padding: 20px 30px;
   // display: inline-block;
   // -webkit-translation: all 0.4s ease-in-out;
// `

const StyledButton = styled(({ color, ...other }) => <Button {...other} />)`
   font-family: 'Dosis', sans-serif;
   font-weight: 600px;
   font-size: 18px;
   line-height: 22px;
   background: linear-gradient(45deg, #1089d4 30%, #1089d4 90%);
   border: 0;
   color: white;
   height: 48px;
   padding: 0 30px;
   box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);

   & .MuiButton-label {
      color: ${props => props.color};
   }
`;


const Home = () => {
   return (
      <div id="home">
         <NavBar></NavBar>
         <section id="main">
            <Grid container spacing={3}>
               <Grid item xs={12} sm={6}>
                  <h1 align="center" class="title-header">Carpooly - Ridesharing for Cal Poly</h1>
                  <h3 align="center" class="title-subheader">To begin, create an account </h3>
               </Grid>
               <Grid item xs={12} sm={6}>
                  <img src={rideshare} style={{height: '60vh', width: '45vw'}}/>
                  <StyledButton color="papayawhip">Get a ride</StyledButton>
               </Grid>
            </Grid>
         </section>
      </div>
   );
}

export default Home;