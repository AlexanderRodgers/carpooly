import React, { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MaskedInput from 'react-text-mask';
import DateFnsUtils from '@date-io/date-fns';
import {
   MuiPickersUtilsProvider,
   KeyboardTimePicker,
   KeyboardDatePicker,
 } from '@material-ui/pickers';
import PropTypes from 'prop-types';
import './RideForm'

const NumberTextMask = (props) => {
   const { inputRef, ...other } = props;
 
   return (
     <MaskedInput
       {...other}
       ref={ref => {
         inputRef(ref ? ref.inputElement : null);
       }}
       mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
       placeholderChar={'\u2000'}
       showMask
     />
   );
 }
 
 NumberTextMask.propTypes = {
   inputRef: PropTypes.func.isRequired,
 };

const RideForm = (props) => {

   const [checked, setChecked] = useState(false);
   const [date, setDate] = useState(new Date());
   const [time, setTime] = useState(new Date());
   const [seats, setSeats] = useState(1);
   const [number, setNumber] = useState('(1  )    -    ');

   const handleChange = event => {
      setNumber(event.target.value);
   }

   return (
      <div id="loc-grid">
         <div className="option-pickers">
            <FormControlLabel
               style={{verticalAlign: "top", display: "inline", alignItems: "inherit"}} 
               control={<Switch checked={checked} onChange={() => setChecked(!checked)}/>}
               label={checked ? 'Get a Ride' : 'Give a Ride'}
            />
         {!checked ?
            <FormControl style={{width:'50%'}}>
            <InputLabel id="seat-select">Number of Seats</InputLabel>
            <Select
                  labelId="seat-select"
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
            >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
            </Select>
            </FormControl>
         :
            <div style={{width: '50%'}}></div>
      }
         </div>
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="option-pickers">
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
         <div className="button-container" style={{marginBottom:'3px'}}>
            <FormControl className="phone-number">
               <InputLabel htmlFor="phone-number">Phone number</InputLabel>
               <Input
                  value={number}
                  onChange={(e) => handleChange(e)}
                  id="phone-number"
                  inputComponent={NumberTextMask}
               />
            </FormControl>
            <div style={{width: '45%', padding: '5px'}}></div>
         </div>
      </div>
   );
}

export default RideForm;