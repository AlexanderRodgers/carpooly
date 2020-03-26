import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import SearchBar from './SearchBar';
import DateFnsUtils from '@date-io/date-fns';
import {
   MuiPickersUtilsProvider,
   KeyboardTimePicker,
   KeyboardDatePicker,
 } from '@material-ui/pickers';
import './SandBox.css';

const SandBox = () => {

   const [checked, setChecked] = useState(false);
   const [date, setDate] = useState(new Date());
   const [time, setTime] = useState(new Date());
   const [seats, setSeats] = useState();

   return (
      <div className="ride-form">
         <Grid lg={4} md={6} xs={12} item>
            <Grid item xs={12} className="searchbar">
               <SearchBar label="Choose a start location"></SearchBar>
            </Grid>
            <Grid item xs={12} className="searchbar">
               <SearchBar label="Choose a destination"></SearchBar>
            </Grid>
         </Grid>
         <FormControlLabel
            style={{verticalAlign: "top", display: "inline", alignItems: "inherit"}} 
            control={<Switch checked={checked} onChange={() => setChecked(!checked)}/>}
            label={checked ? 'Get a Ride' : 'Give a Ride'}
         />
         <FormControl >
        <InputLabel id="seat-select">Number of Seats</InputLabel>
        <Select
            style={{minWidth: '250px'}}
            labelId="seat-select"
            id="demo-simple-select"
            value={seats}
            onChange={(seats) => setSeats(seats)}
        >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={3}>4</MenuItem>
            <MenuItem value={3}>5</MenuItem>
            <MenuItem value={3}>6</MenuItem>
        </Select>
      </FormControl>
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div class="option-pickers">
               <KeyboardDatePicker
                  className="date-picker"
                  margin="normal"
                  label="Select date to leave"
                  format="MM/dd/yyyy"
                  value={date}
                  onChange={(date) => setDate(date)}
               />
               <KeyboardTimePicker
                  className="time-picker"
                  margin="normal"
                  label="Select a time to leave"
                  value={time}
                  onChange={(time) => setTime(time)}
               />
            </div>
         </MuiPickersUtilsProvider>
      </div>
   );
};

export default SandBox;