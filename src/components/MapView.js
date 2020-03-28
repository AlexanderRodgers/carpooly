import React, { useState } from 'react';
import MapBox from './MapBox';
import GiveRide from './GiveRide';
import Grid from '@material-ui/core/Grid';
import './MapView.css';

const MapView = () => {
   
   const [start, setStart] = useState({});
   const [dest, setDest] = useState({});

   const getStart = (option) => {
      option.origin = 'start';
      setStart(option);
   }

   const getDest = (option) => {
      option.origin = 'dest';
      setDest(option);
   }

   return (
      <div>
         <Grid container style={{width: '100vw', height: '100vh'}}>
            <Grid item xs={12} md={3}>
               <GiveRide getStart={getStart} getDest={getDest}></GiveRide>
            </Grid>
            <Grid item xs={12} md={9}>
               <MapBox start={start} dest={dest}></MapBox>
            </Grid>
         </Grid>
      </div>
   );

   
}

export default MapView;