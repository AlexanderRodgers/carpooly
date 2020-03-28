import React, { useState, useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input'; 
import SearchBar from './SearchBar';
import DateFnsUtils from '@date-io/date-fns';
import styled from 'styled-components';
import { UserContext } from './UserContext';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import { db } from '../firebase';
import {
   MuiPickersUtilsProvider,
   KeyboardTimePicker,
   KeyboardDatePicker,
 } from '@material-ui/pickers';

import RideCard from './RideCard';

import './GiveRide.css';
import './SandBox.css'

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

const SandBox = (props) => {


   const [checked, setChecked] = useState(false);
   const [date, setDate] = useState(new Date());
   const [time, setTime] = useState(new Date());
   const [seats, setSeats] = useState(1);
   const [start, setStart] = useState({});
   const [dest, setDest] = useState({});
   const [number, setNumber] = useState('(1  )    -    ');
   const [expanded, setExpanded] = useState(false);

   const handleChange = event => {
      setNumber(event.target.value);
   }

   const createCards = () => {
      let cards = [1, 2, 3];
      let newCards = cards.map((card, index) => {
         return (<RideCard></RideCard>);
      });
      return newCards;
   }

   const handleStart = option => {
      setStart(option);
      props.getStart(option);
   }

   const handleDest = option => {
      setDest(option);
      props.getDest(option);
   }

   const user = useContext(UserContext);

   const submit = () => {
      if (start && dest) {
         // driver flow
         if (!checked) {
            db.collection('drives').add({
               userId: user.uid,
               start: start.geometry.coordinates,
               dest: dest.geometry.coordinates,
               date,
               time,
               seats,
               number
            }).then(res => console.log(res));
         } else {
            // rider flow
            db.collection('rides').add({
               userId: user.uid,
               start: start.geometry.coordinates,
               dest: dest.geometry.coordinates,
               date,
               time,
               number
            }).then(res => console.log(res));
         }
      } 
   }

   useEffect(() => {
      const height = document.getElementById('loc-grid').clientHeight;
      console.log('objheight', height);
      const windowHeight = window.innerHeight;
      console.log('win-height', windowHeight);
      document.getElementById('scroll-cards').style.height = `${windowHeight - height}px`
   }, []);

   return (
      <div>
         <Grid className="ride-form" id="ride-form" md={3} xs={12} item style={{backgroundColor:"white"}}>
            <div id="loc-grid">
               <Grid item xs={12} className="searchbar">
                  <SearchBar label="Choose a start location" getOption={handleStart}></SearchBar>
               </Grid>
               <Grid item xs={12} className="searchbar">
                  <SearchBar label="Choose a destination" getOption={handleDest}></SearchBar>
               </Grid>
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
               <div className="button-container">
                  <StyledButton 
                     background="#1089d4"
                     style={{width:"95%", margin:"auto"}}
                     onClick={() => submit()}
                     ><b>{checked ? 'Request Ride' : 'Add Ride'}</b></StyledButton>
               </div>
            </div>
            <div className="scroll-cards" id="scroll-cards">
               {createCards()}
            </div>
         </Grid>
      </div>
   );
};

export default SandBox;