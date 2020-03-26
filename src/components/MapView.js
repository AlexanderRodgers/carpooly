import React, { useState } from 'react';
import MapBox from './MapBox';
import Grid from '@material-ui/core/Grid';
import SearchBar from './SearchBar';
import './MapView.css';


const MapView = () => {
   
   const [start, setStart] = useState({});
   const [dest, setDest] = useState({});

   const getStart = (option) => {
      setStart(option);
   }

   const getDest = (option) => {
      setDest(option);
   }

   return (
      <div>
         <Grid container spacing={2} className="searchbar-grid">
            <Grid lg={4} xs={6} className="searchbar">
               <Grid item xs={12} className="searchbar">
                  <SearchBar getOption={getStart} label="Choose a start location"></SearchBar>
               </Grid>
               <Grid item xs={12} className="searchbar">
                  <SearchBar getOption={getDest} label="Choose a destination"></SearchBar>
               </Grid>
            </Grid>
         </Grid>
         <MapBox></MapBox>
      </div>
   );

   
}

export default MapView;