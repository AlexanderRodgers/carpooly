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
   const [startMarker, setStartMarker] = useState({});
   const [destMarker, setDestMarker] = useState({});
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
      if (!map) return;
      if (Object.keys(startMarker).length !== 0) {
         startMarker.remove();
      }
      map.flyTo({center: props.start.geometry.coordinates});
      let marker = new mapboxgl.Marker()
         .setLngLat(props.start.geometry.coordinates)
         .addTo(map);
      setStartMarker(marker);
   }, [props.start]);

   useEffect(() => {
      if (!map) return;
      if (Object.keys(destMarker).length !== 0) {
         destMarker.remove();
      }
      map.flyTo({center: props.dest.geometry.coordinates});
      let marker = new mapboxgl.Marker({ color: '#B22222' })
         .setLngLat(props.dest.geometry.coordinates)
         .addTo(map);
      setDestMarker(marker);
   }, [props.dest]);

   return <div ref={el => (mapContainer.current = el)} style={styles}></div>
 }

export default MapBox;