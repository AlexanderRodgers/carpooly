import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from "mapbox-gl";
import { route } from '../api/search';
import { db } from '../firebase';
// import firebase from '../firebase';
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
   width: "100%",
   height: "100%"
 };

 const MapBox = (props) => {
   const [map, setMap] = useState(null);
   const [isRoute, setIsRoute] = useState(false);
   const [start, setStart] = useState({});
   const [dest, setDest] = useState({});
   const [startMarker, setStartMarker] = useState({});
   const [destMarker, setDestMarker] = useState({});
   const mapContainer = useRef(null);

   useEffect(() => {
      mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleHJvZGdlcnMiLCJhIjoiY2s4MjlxMWZzMDh0dzNlbnpxaXd4M3k5diJ9.1VPthZmgxhtKulM9ifl16g';

      const initializeMap = ({ setMap, mapContainer }) => {
         const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",            
            center: [-120.659847, 35.301078],
            zoom: 10
         });

         map.on("load", () => {
            setMap(map);
            map.resize();
            // db.collection('rides')
            //    .get()
            //    .then((snapshots) => {
            //       snapshots.forEach((doc) => {
            //          addPopup(map, doc.data());
            //          new mapboxgl.Marker()
            //             .setLngLat(doc.data().start)
            //             .addTo(map);
            //          new mapboxgl.Marker({ color: '#B22222' })
            //             .setLngLat(doc.data().dest)
            //             .addTo(map);
            //       });
            //    })
            //    .catch(e => console.error(e));
         });
      };

      if (!map) initializeMap({ setMap, mapContainer });
   }, [map]);

   useEffect(() => {
      if (!map || !Object.keys(props.start).length) return;
      if (Object.keys(startMarker).length !== 0) {
         startMarker.remove();
      }
      map.flyTo({center: props.start.geometry.coordinates});
      let marker = new mapboxgl.Marker()
         .setLngLat(props.start.geometry.coordinates)
         .addTo(map);
      setStartMarker(marker);
      setStart(props.start);
   }, [props.start]);

   useEffect(() => {
      if (!map || !Object.keys(props.dest).length) return;
      if (Object.keys(destMarker).length !== 0) {
         destMarker.remove();
      }
      map.flyTo({center: props.dest.geometry.coordinates});
      let marker = new mapboxgl.Marker({ color: '#B22222' })
         .setLngLat(props.dest.geometry.coordinates)
         .addTo(map);
      setDestMarker(marker);
      setDest(props.dest);
   }, [props.dest]);

   useEffect(() => {
      (async() => {
         if (Object.keys(start).length !== 0 && Object.keys(dest).length !== 0) {
            const startGeo = start.geometry.coordinates;
            const destGeo = dest.geometry.coordinates;
            let res = await route([startGeo, destGeo]);
            if (isRoute) {
               map.removeLayer('route');
               map.removeSource('route');
               setIsRoute(false);
            }
            map.addSource('route', {
               type: 'geojson',
               data: {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                     type: 'LineString',
                     coordinates: res.routes[0].geometry.coordinates
                  }
               }
            });
            map.addLayer({
               id: 'route',
               type: 'line',
               source: 'route',
               layout: {
                  'line-join': 'round',
                  'line-cap': 'round'
               },
               paint: {
                  'line-color': '#888',
                  'line-width': 7
               }
            });
            setIsRoute(true);
         }
      })();
   }, [start, dest]);

   return <div ref={el => (mapContainer.current = el)} style={styles}></div>
 }

export default MapBox;