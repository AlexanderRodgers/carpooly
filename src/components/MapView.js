import React, { useState } from 'react';
import MapBox from './MapBox';
import GiveRide from './GiveRide';
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
         <GiveRide getStart={getStart} getDest={getDest}></GiveRide>
         <MapBox start={start} dest={dest}></MapBox>
      </div>
   );

   
}

export default MapView;