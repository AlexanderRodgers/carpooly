import React, { useState, useEffect } from 'react';
import MapBox from './MapBox';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import SearchBar from './SearchBar';
import './MapView.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Card from '@material-ui/core/Card';

const MapView = () => {
   
   const [start, setStart] = useState({});
   const [dest, setDest] = useState({});
   const [checked, setChecked] = useState(false);
   const [geoJson, setGeoJson] = useState([]);

   const getStart = (option) => {
      setStart(option);
      let geoObj = {
         type: option.type,
         geometry: option.geometry
      }
      if (geoJson.length > 0) {
         setGeoJson(geoJson.splice(0, 1, geoObj));
      } else {
         setGeoJson([geoObj]);
      }
   }

   const getDest = (option) => {
      setDest(option);
      let geoObj = {
         type: option.type,
         geometry: option.geometry
      }
      if (geoJson.length > 0) {
         setGeoJson(geoJson.splice(1, 1, geoObj));
      } else {
         setGeoJson([{}, geoObj])
      }
   }

   useEffect(() => {
      console.log(geoJson);
   }, [geoJson])

   return (
      <div>
         <Grid container spacing={2} className="searchbar-grid">
            <Grid lg={4} md={6} xs={9} item className="searchbar">
               <Grid item xs={12} className="searchbar">
                  <SearchBar getOption={getStart} label="Choose a start location"></SearchBar>
               </Grid>
               <Grid item xs={12} className="searchbar">
                  <SearchBar getOption={getDest} label="Choose a destination"></SearchBar>
               </Grid>
            </Grid>
         <span style={{flexGrow:1}}></span>
         <FormControlLabel
            style={{verticalAlign: "top", display: "inline", alignItems: "inherit"}} 
            control={<Switch checked={checked} onChange={() => setChecked(!checked)}/>}
            label={checked ? 'Get a Ride' : 'Give a ride'}
         />
         </Grid>
         <Grid container>
         <Grid item xs={4}>
            <Card>
               Hello
            </Card>
         </Grid>
      </Grid>
         <MapBox geoJson={geoJson}></MapBox>
      </div>
   );

   
}

export default MapView;