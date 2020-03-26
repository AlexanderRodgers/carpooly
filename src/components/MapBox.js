import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from "mapbox-gl";
// import firebase from '../firebase';
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
   width: "100vw",
   height: "100vh",
   position: "absolute"
 };

 const MapBox = (props) => {
   const [map, setMap] = useState(null);
   const [geoJson, setGeoJson] = useState(null);
   const [markers, setMarkers] = useState(null);
   const mapContainer = useRef(null);

   useEffect(() => {
      mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleHJvZGdlcnMiLCJhIjoiY2s4MjlxMWZzMDh0dzNlbnpxaXd4M3k5diJ9.1VPthZmgxhtKulM9ifl16g';

      const initializeMap = ({ setMap, mapContainer}) => {
         const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",            
            center: [-120.659847, 35.301078],
            zoom: 10
         });

         map.on("load", () => {
            setMap(map);
            map.resize();
         });

      };

      if (!map) initializeMap({ setMap, mapContainer });
   }, [map]);

   useEffect(() => {
      setGeoJson(props.geoJson);
      if (!map) return;
      console.log(props.geoJson);
      props.geoJson.forEach(el => {
         if (Object.keys(el).length !== 0) {
            new mapboxgl.Marker()
               .setLngLat(el.geometry.coordinates)
               .addTo(map);
         } 
      });
   }, [props.geoJson]);

   return <div ref={el => (mapContainer.current = el)} style={styles}></div>
 }

export default MapBox;