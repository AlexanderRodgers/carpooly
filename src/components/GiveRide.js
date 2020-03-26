import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import SearchBar from './SearchBar';
import DateFnsUtils from '@date-io/date-fns';
import styled from 'styled-components';
import {
   MuiPickersUtilsProvider,
   KeyboardTimePicker,
   KeyboardDatePicker,
 } from '@material-ui/pickers';

 const StyledButton = styled(({ background, ...other }) => <Button {...other} />)`
   font-family: 'Dosis', sans-serif;
   font-weight: 600px;
   font-size: 18px;
   line-height: 22px;
   background: linear-gradient(45deg, ${props => props.background} 30%, ${props => props.background} 90%);
   border: 0;
   color: white;
   height: 48px;
   letter-spacing: 1px;
   border-radius: 5px;
   padding: 0 30px;
   box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);

   & .MuiButton-label {
      color: papayawhip;
   }
`;

const GiveRide = () => {

   const [checked, setChecked] = useState(false);
   const [date, setDate] = useState(new Date());
   const [time, setTime] = useState(new Date());
   const [seats, setSeats] = useState();

   return (
      <div className="ride-form">
         <Grid md={4} xs={12} item>
            <Grid item xs={12} className="searchbar">
               <SearchBar label="Choose a start location"></SearchBar>
            </Grid>
            <Grid item xs={12} className="searchbar">
               <SearchBar label="Choose a destination"></SearchBar>
            </Grid>
            <div class="option-pickers">
               <FormControlLabel
                  style={{verticalAlign: "top", display: "inline", alignItems: "inherit"}} 
                  control={<Switch checked={checked} onChange={() => setChecked(!checked)}/>}
                  label={checked ? 'Get a Ride' : 'Give a Ride'}
               />
               <FormControl style={{width:'50%'}}>
            <InputLabel id="seat-select">Number of Seats</InputLabel>
            <Select
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
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
               <div class="option-pickers">
                  <KeyboardDatePicker
                     className="date-picker"
                     margin="normal"
                     label="Leave Date"
                     format="MM/dd/yyyy"
                     value={date}
                     onChange={(date) => setDate(date)}
                  />
                  <KeyboardTimePicker
                     className="time-picker"
                     margin="normal"
                     label="Leave Time"
                     value={time}
                     onChange={(time) => setTime(time)}
                  />
               </div>
            </MuiPickersUtilsProvider>
            <div class="button-container">
               <StyledButton 
                  background="#1089d4"
                  style={{width:"95%", margin:"auto"}}
                  ><b>Add Ride</b></StyledButton>
            </div>
         </Grid>
      </div>
   );
};

export default GiveRide;