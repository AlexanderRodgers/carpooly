import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { location } from '../api/search';

const SearchBar = (props) => {

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
      // TODO: Add throttle method
      (async () => {
         const res = await location(search);
         setLoading(false);
         if (active) {
            setOptions(res.features);
         }
      })();
      return () => {
         active = false;
         setLoading(false);
      };
    }, [search]);

   return (
      <Autocomplete
            open={open}
            freeSolo
            onOpen={() => {
            setOpen(true);
            }}
            onClose={() => {
            setOpen(false);
            }}
            filterOptions={x => x}
            getOptionSelected={(option, value) => option.text === value.text }
            getOptionLabel={option => option.place_name}
            options={options ? options : []}
            loading={loading}
            includeInputInList
            renderInput={params => (
            <TextField
               {...params}
               label="Choose a starting place"
               variant="outlined"
               onChange={(event) => setSearch(event.target.value)}
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
                  stop = search.length;
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
               let contextString;
               const getcontext = () => {
                  if (option.place_name.includes(',')) {
                     contextString = option.place_name.slice(option.place_name.indexOf(',')+1);
                     return;
                  }
                  contextString = '';
               }
               getcontext();
               setBold();

               return (
                  <Grid container alignItems="center" onClick={() => props.getStart(option)}>
                     <Grid item xs>
                        {text}{substr}
                        <Typography variant="body2" color="textSecondary">
                           {contextString}
                        </Typography>
                     </Grid>
                  </Grid>
               );
            }}
         />
   );
}

export default SearchBar;