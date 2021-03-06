import React, { useState, useContext, useEffect } from 'react';
import SearchBar from './SearchBar';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { UserContext } from './UserContext';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import { db } from '../firebase';
import './GiveRide.css';
import RideCard from './RideCard';
import RideForm from './RideForm';
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

const GiveRide = (props) => {

   const [checked, setChecked] = useState(false);
   const [date, setDate] = useState(new Date());
   const [time, setTime] = useState(new Date());
   const [seats, setSeats] = useState(1);
   const [start, setStart] = useState({});
   const [dest, setDest] = useState({});
   const [cards, setCards] = useState([]);
   const [number, setNumber] = useState('(1  )    -    ');

   const handleChange = event => {
      setNumber(event.target.value);
   }

   const handleStart = option => {
      setStart(option);
      console.log(option);
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
            db.collection('rides').add({
               userId: user.uid,
               type: 'drive',
               start: {
                  context: start.context ? start.context : null,
                  geometry: start.geometry
               },
               dest: {
                  context: dest.context ? dest.context : null,
                  geometry: dest.geometry
               },
               date,
               time,
               seats,
               number,
               name: user.displayName,
               email: user.email
            }).then(res => console.log(res));
         } else {
            // rider flow
            db.collection('rides').add({
               userId: user.uid,
               type: 'ride',
               start: {
                  context: start.context,
                  geometry: start.geometry
               },
               dest: {
                  context: dest.context,
                  geometry: dest.geometry
               },
               date,
               time,
               number,
               name: user.displayName,
               email: user.email
            }).then(res => console.log(res));
         }
      } 
   }

   useEffect(() => {
      //TODO: Change height of scroll cards if being used on a mobile device.
      const width = window.innerWidth;
      // if (width < 960) {
      //    document.getElementById('loc-grid').
      // }
      const height = document.getElementById('loc-grid').clientHeight;
      const windowHeight = window.innerHeight;
      document.getElementById('scroll-cards').style.height = `${windowHeight - height - 5}px`
   }, []);

   useEffect(() => {
      if (Object.keys(props.rideSnaps).length === 0) return;
      let rides = props.rideSnaps;
      let cards = [];
      let i = 0;
      rides.forEach(doc => {
         cards.push(
            <RideCard 
               data={doc.data()}
               key={`${i}-${doc.id}`}
               id={`${i}-${doc.id}`}
               passRoute={props.passRoute}
            />
         );
         i++;
      });
      setCards(cards);

   }, [props.rideSnaps]);

   return (
      <div>
         <Grid className="ride-form" id="ride-form" md={3} xs={12} item style={{backgroundColor:"white"}}>
             <div id="loc-grid">
                <Grid item xs={12} className="searchbar" style={{marginBottom:'5px'}}>
                  <SearchBar label="Choose a start location" getOption={handleStart}></SearchBar>
               </Grid>
               <Grid item xs={12} className="searchbar">
                  <SearchBar label="Choose a destination" getOption={handleDest}></SearchBar>
               </Grid>
               <RideForm/>
               <StyledButton 
                  background="#1089d4"
                  style={{ width:"100%" }}
                  onClick={() => submit()}
                  ><b>{checked ? 'Request Ride' : 'Add Ride'}</b>
               </StyledButton>
               {/*<div className="option-pickers">
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
               </div> */}
            </div>

            <div className="scroll-cards" id="scroll-cards">
               {cards.length === 0 ? '' : cards}
            </div>
         </Grid>
      </div>
   );
};

export default GiveRide;