import axios from 'axios';

const TOKEN = 'pk.eyJ1IjoiYWxleHJvZGdlcnMiLCJhIjoiY2s4MjlxMWZzMDh0dzNlbnpxaXd4M3k5diJ9.1VPthZmgxhtKulM9ifl16g';

const locUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

const routeUrl = 'https://api.mapbox.com/directions/v5/mapbox/driving-traffic/';

export const location = async (input) => {
  if (!input) return {};
  const res = await axios.get(`${locUrl}${input}.json?access_token=${TOKEN}`);
  return res.data;
}

export const route = async (input) => {
  let formattedUrl = routeUrl;
  input.forEach(coordPair => {
    coordPair.forEach(coord => {
      if (Object.keys(coord).length === 0) return;    
    });
  });
  input.forEach(coordPair => {
    formattedUrl += coordPair.join(',');
    formattedUrl += ';';
  });
  formattedUrl = formattedUrl.slice(0, -1);
  formattedUrl += `?alternatives=true&geometries=geojson&steps=true&access_token=${TOKEN}`;
  const res = await axios.get(formattedUrl);
  return res.data;
}