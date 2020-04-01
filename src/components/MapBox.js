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

   const placeMarker = (locMarker, color = null) => {
      if (!color) {
         color = '#3FB1CE';
      }
      map.flyTo({ center: locMarker.geometry.coordinates });
      let marker = new mapboxgl.Marker({color: color})
         .setLngLat(locMarker.geometry.coordinates)
         .addTo(map);
      return marker;
   }

   const updateRoute = async (start, end) => {
      let res = await route([start, end]);
      map.flyTo({center: end});
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
   }

   // getRoute passed by rideCard
   // TODO: Refactor
   useEffect(() => {
      (async() => {
         if (props.selected.length !== 0) {
            window.scrollTo(0,0);
            const startGeo = props.selected[0].geometry.coordinates;
            const destGeo = props.selected[1].geometry.coordinates;
            await updateRoute(startGeo, destGeo);
            setIsRoute(true);
         }
      })();
   }, [props.selected]);

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
            db.collection('rides')
               .get()
               .then((snapshots) => {
                  props.getRides(snapshots);
                  snapshots.forEach((doc) => {
                     new mapboxgl.Marker()
                        .setLngLat(doc.data().start.geometry.coordinates)
                        .addTo(map);
                     new mapboxgl.Marker({ color: '#B22222' })
                        .setLngLat(doc.data().dest.geometry.coordinates)
                        .addTo(map);
                  });
               })
               .catch(e => console.error(e));
         });
      };

      if (!map) initializeMap({ setMap, mapContainer });
   }, [map]);

   useEffect(() => {
      if (!map || !Object.keys(props.start).length) return;
      if (Object.keys(startMarker).length !== 0) {
         startMarker.remove();
      }
      let marker = placeMarker(props.start);
      setStartMarker(marker);
      setStart(props.start);
   }, [props.start]);

   useEffect(() => {
      if (!map || !Object.keys(props.dest).length) return;
      if (Object.keys(destMarker).length !== 0) {
         destMarker.remove();
      }
      let marker = placeMarker(props.dest, '#B22222');
      setDestMarker(marker);
      setDest(props.dest);
   }, [props.dest]);

   useEffect(() => {
      (async() => {
         if (Object.keys(start).length !== 0 && Object.keys(dest).length !== 0) {
            const startGeo = start.geometry.coordinates;
            const destGeo = dest.geometry.coordinates;
            await updateRoute(startGeo, destGeo);
            setIsRoute(true);
         }
      })();
   }, [start, dest]);

   return <div ref={el => (mapContainer.current = el)} style={styles}></div>
 }

export default MapBox;