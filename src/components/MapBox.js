import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from "mapbox-gl";
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
// import firebase from '../firebase';
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
   width: "100vw",
   height: "100vh",
   position: "absolute"
 };

 const directions = new MapboxDirections({
    accessToken: 'pk.eyJ1IjoiYWxleHJvZGdlcnMiLCJhIjoiY2s4MjlxMWZzMDh0dzNlbnpxaXd4M3k5diJ9.1VPthZmgxhtKulM9ifl16g',
    unit: 'imperial',
    profile: 'mapbox/driving-traffic'
 });

 const MapBox = () => {
   const [map, setMap] = useState(null);
   // const [origin, setOrigin] = useState({});
   // const [dest, setDest] = useState({});
   const [waypoints, setWaypoints] = useState(null);
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

         // directions.on('origin', () => {
         //    setOrigin(directions.getOrigin());
         // });

         // directions.on('destination', () => {
         //    setDest(directions.getDestination());
         // });

         // directions.on('route', () => {
         //    setWaypoints(directions.getWaypoints());
         //    // firebase.firestore().collection('routes').add({
         //    //    origin,
         //    //    destination: dest
         //    // });
         //    console.log('route set', directions.getWaypoints());
         // });

         // map.addControl(directions, 'top-left');

         map.on("load", () => {
            setMap(map);
            map.resize();
         });

      };

      if (!map) initializeMap({ setMap, mapContainer });
   }, [map]);

   useEffect(() => {
      // firebase.firestore().collection('routes').add({
      //    origin,
      //    destination: dest,
      //    waypoints
      // });
   }, [waypoints]);

   return <div ref={el => (mapContainer.current = el)} style={styles}></div>
 }

export default MapBox;