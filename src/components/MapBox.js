import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from "mapbox-gl";
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
   width: "100vw",
   height: "100vh",
   position: "absolute"
 };

 const directions = new MapboxDirections({
    accessToken: 'pk.eyJ1IjoiYWxleHJvZGdlcnMiLCJhIjoiY2s4MjlxMWZzMDh0dzNlbnpxaXd4M3k5diJ9.1VPthZmgxhtKulM9ifl16g',
    unit: 'imperial',
    profile: 'mapbox/driving'
 });

 const MapBox = () => {
   const [map, setMap] = useState(null);
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

         map.addControl(directions, 'top-left');

         map.on("load", () => {
            map.loadImage(
               'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png',
               (error, image) => {
                  if (error) throw error;
                  map.addImage('cat', image);
                  map.addSource('point', {
                     'type': 'geojson',
                     'data': {
                        'type': 'FeatureCollection',
                        'features': [
                           {
                              'type': 'Feature',
                              'geometry': {
                                 'type': 'Point',
                                 'coordinates': [0, 0]
                              }
                           }
                        ]
                     } 
                  });
                  map.addLayer({
                     'id': 'points',
                     'type': 'symbol',
                     'source': 'point',
                     'layout': {
                        'icon-image': 'cat',
                        'icon-size': 0.25
                     }
                  });
               }
            )
            setMap(map);
            map.resize();
         })
      };

      if (!map) initializeMap({ setMap, mapContainer });
   }, [map]);

   return <div ref={el => (mapContainer.current = el)} style={styles}></div>
 }

export default MapBox;