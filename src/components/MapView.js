import React, { useState, useEffect, Fragment } from 'react';
import MapBox from './MapBox';
import GiveRide from './GiveRide';
import Grid from '@material-ui/core/Grid';
import './MapView.css';

const MapView = () => {
   
   const [start, setStart] = useState({});
   const [dest, setDest] = useState({});
   const [width, setWidth] = useState(0);
   const [rideSnaps, setRideSnaps] = useState({});

   const getStart = (option) => {
      option.origin = 'start';
      setStart(option);
   }

   const getDest = (option) => {
      option.origin = 'dest';
      setDest(option);
   }

   const getRides = (snapshots) => {
      setRideSnaps(snapshots);
   }

   useEffect(() => {
      const width = window.innerWidth;
      window.addEventListener('resize', () => {
         if (width > 960) {
            if (window.innerWidth < 960) {
               setWidth(window.innerWidth);
            }
         } else {
            if (window.innerWidth > 960) {
               setWidth(window.innerWidth);
            }
         }
      })
      setWidth(width);
   }, []);

   return (
      <div>
         { width > 960 
         ?
            <Fragment>
               <Grid container style={{width: '100vw', height: '100vh'}} className="grid-container">
                  <Grid item xs={12} md={3} className="give-ride">
                     <GiveRide getStart={getStart} getDest={getDest} rideSnaps={rideSnaps}></GiveRide>
                  </Grid>
                  <Grid item xs={12} md={9} className="map-box">
                     <MapBox start={start} dest={dest} getRides={getRides}></MapBox>
                  </Grid>
               </Grid>
            </Fragment>
         :
            <Fragment>
               <Grid container className="grid-container">
                  <Grid item className="map-box">
                     <MapBox start={start} dest={dest} getRides={getRides}></MapBox>
                  </Grid>
                  <Grid item xs={12} md={3} className="give-ride">
                     <GiveRide getStart={getStart} getDest={getDest} rideSnaps={rideSnaps}></GiveRide>
                  </Grid>
               </Grid>
            </Fragment>
         }
      </div>
   );

   
}

export default MapView;