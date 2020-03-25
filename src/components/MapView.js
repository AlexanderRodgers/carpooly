import React, { useState } from 'react';
import MapBox from './MapBox';
import SearchBar from './SearchBar';

const MapView = () => {
   
   const [start, setStart] = useState({});

   const getOptionSelected = (option) => {
      console.log(option);
      setStart(option);
   }

   return (
      <div>
         <SearchBar getStart={getOptionSelected}></SearchBar>
         <MapBox></MapBox>
      </div>
   );

   
}

export default MapView;