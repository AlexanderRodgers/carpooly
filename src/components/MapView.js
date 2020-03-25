import React, { useState, useEffect } from 'react';
import MapBox from './MapBox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { location } from '../api/search';

const MapView = () => {
   const [search, setSearch] = useState('');
   const [open, setOpen] = useState(false);
   const [options, setOptions] = useState([]);
   const [loading, setLoading] = useState(false);
  
   // runs on open
    useEffect(() => {
      if (!open) {
        setOptions([]);
      }
    }, [open]);

    useEffect(() => {
      let active = true;
      setLoading(true);
      if (!active) return undefined;
      (async () => {
         const res = await location(search);
         console.log(res.features);
         setLoading(false);
         if (active) {
            setOptions(res.features);
         }
      })();
      return () => {
         setLoading(false);
      };
    }, [search]);

   return (
      <div>
         <Autocomplete
            onInputChange={(event, value) => setSearch(value)}
            open={open}
            freeSolo
            onOpen={() => {
            setOpen(true);
            }}
            onClose={() => {
            setOpen(false);
            }}
            getOptionSelected={(option, value) => option.place_name === value.place_name}
            getOptionLabel={option => option.place_name}
            options={options ? options : []}
            loading={loading}
            renderInput={params => (
            <TextField
               {...params}
               label="Choose a starting place"
               variant="outlined"
               InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                  <React.Fragment>
                     {loading ? <CircularProgress color="inherit" size={20} /> : null}
                     {params.InputProps.endAdornment}
                  </React.Fragment>
                  ),
               }}
            />
            )}
            renderOption={option => {
               let start, stop;
               let text, substr;
               const setBold = () => {
                  start = option.text.indexOf(search);
                  if (start === -1) {
                     text = option.text;
                     substr = '';
                     return;
                  } else {
                     text = <b>{option.text.substring(start,stop)}</b>;
                     substr = option.text.substring(stop);
                     return;
                  }
               }
               setBold();

               return (
                  <Grid container alignItems="center">
                     <Grid item xs>
                        <Typography variant="body2" color="textSecondary">
                           {text}{substr}
                        </Typography>
                     </Grid>
                  </Grid>
               );
            }}
         />
         {/* <MapBox></MapBox> */}
      </div>
   );

   
}

export default MapView;