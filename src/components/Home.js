import React from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import rideshare from '../assets/order_ride.svg';
import { Link } from 'react-router-dom';
import './Home.css';

const StyledButton = styled(({ background, ...other }) => <Button {...other} />)`
   font-family: 'Dosis', sans-serif;
   font-weight: 600px;
   font-size: 18px;
   line-height: 22px;
   background: linear-gradient(45deg, ${props => props.background} 30%, ${props => props.background} 90%);
   border: 0;
   color: white;
   height: 48px;
   letter-spacing: 1px;
   border-radius: 5px;
   padding: 0 30px;
   box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);

   & .MuiButton-label {
      color: papayawhip;
   }
`;


const Home = () => {
   return (
      <div id="home">
         <NavBar></NavBar>
         <section id="main">
            <Grid container spacing={3}>
               <Grid item xs={12} lg={6}>
                  <h1 align="center" className="title-header">Carpooly - Ridesharing for Cal Poly</h1>
                  <h3 align="center" className="title-subheader">No more combing through facebook groups hoping you get a ride,
                   sign up and find someone near your area in seconds. </h3>
                  <div className="align-item-container">
                     <Link to="/login" className="remove-button-link">
                        <StyledButton background="#1089d4"><b>Log In</b></StyledButton>
                     </Link>
                     <Link to="/sign-up" className="remove-button-link">
                        <StyledButton background="#1089d4"><b>Sign Up</b></StyledButton>
                     </Link>
                  </div>
               </Grid>
               <Grid item xs={12} lg={6}>
                  <div style={{padding:"0px 10px"}}>
                     <img src={rideshare} style={{height: 'auto', width: '100%'}} alt="Rideshare"/>
                  </div>
                  <Link to="/map" className="remove-button-link">
                     <StyledButton background="#1089d4" style={{width: '100%', verticalAlign: "center"}}><b>Get a ride</b></StyledButton>
                  </Link>
               </Grid>
            </Grid>
         </section>
      </div>
   );
}

export default Home;