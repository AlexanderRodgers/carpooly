import axios from 'axios';

const TOKEN = 'pk.eyJ1IjoiYWxleHJvZGdlcnMiLCJhIjoiY2s4MjlxMWZzMDh0dzNlbnpxaXd4M3k5diJ9.1VPthZmgxhtKulM9ifl16g';

const locUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

export const location = async (input) => {
  if (!input) return {};
  const res = await axios.get(`${locUrl}${input}.json?access_token=${TOKEN}`);
  console.log(res.data);
  return res.data;
}