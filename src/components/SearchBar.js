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

   const getLabel = () => {
      return props.label;
   }
  
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
            size="small"
            filterOptions={x => x}
            getOptionSelected={(option, value) => option.place_name === value.place_name }
            getOptionLabel={option => option.place_name}
            options={options ? options : []}
            loading={loading}
            includeInputInList
            renderInput={params => (
            <TextField
               {...params}
               label={getLabel()}
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
                  start = option.place_name.indexOf(search);
                  stop = search.length;
                  if (start === -1) {
                     if (option.place_name.indexOf(',') !== -1) {
                        text = option.place_name.substring(0, option.place_name.indexOf(','));
                     } else {
                        text = option.place_name;
                     }
                     substr = '';
                     return;
                  } else {
                     text = <b>{option.place_name.substring(start,stop)}</b>;
                     if (option.place_name.indexOf(',') !== -1) {
                        substr = option.place_name.substring(stop, option.place_name.indexOf(','));
                     } else {
                        substr = option.place_name.substring(stop);
                     }
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
                  <Grid container alignItems="center" onClick={() => props.getOption(option)}>
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