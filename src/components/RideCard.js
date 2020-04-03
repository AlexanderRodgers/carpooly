import React, { useState, useContext, Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import moment from 'moment';
import { db, auth } from '../firebase';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
   expand: {
     transform: 'rotate(0deg)',
     transition: theme.transitions.create('transform', {
       duration: theme.transitions.duration.shortest,
     }),
   },
   expandOpen: {
     transform: 'rotate(180deg)',
   }
 }));

const RideCard = (props) => {

   const [expanded, setExpanded] = useState(false);
   const [select, setSelect] = useState(false);
   const [option, setOption] = useState('');
   const [dialog, setDialog] = useState(false);
   const theme = useTheme();
   const fullscreen = useMediaQuery(theme.breakpoints.down('sm'));

   let same = false;
   let id = props.id.split('-')[1];

   if (auth.currentUser.uid === props.data.userId) {
      same = true;
   }

   const handleOption = event => {
      console.log(event.target.value);
      let option = event.target.value
      if (option === 'delete') {
         db.collection('rides').doc(id)
            .delete()
            .then(res => {
               console.log(res);
               // TODO: Update give ride component so card is removed.
            })
            .catch(res => {
               alert('unable to delete ride at this time.');
            });
      }
   }

   const getArea = () => {
      let areaString = '';
      if (props.data.dest.context.length !== 0) {
         areaString = props.data.dest.context[0].text + ', ';
      }
      return areaString;
   }

   const getTime = (date) => {
      return moment(new Date(date.seconds * 1000)).format('hh:mm A');
   }

   const getDate = (date) => {
      return moment(new Date(date.seconds * 1000)).format('MMM DD');
   }

   const getRoute = () => {
      props.passRoute(props.data.start, props.data.dest);
   }

   const classes = useStyles();

   return (
      <div>
         <Dialog
            fullscreen={fullscreen}
            open={dialog}
            onClose={() => setDialog(false)}
         >
            <DialogTitle>Edit Ride</DialogTitle>
            <DialogContent>
            </DialogContent>
         </Dialog>
         <Card 
            style={{margin: '0px 5px', flex: 1, marginBottom: '5px'}}
            key={props.id}
            className="ride-card"
         >  
            <CardHeader
               style={{paddingBottom: '0px'}}
               avatar={
                  <Avatar aria-label="username" style={{backgroundColor:'blue'}}>
                     A
                  </Avatar>
               }
               title={props.data.name}
               subheader={`${getArea()} ${getDate(props.data.date)} ${getTime(props.data.time)}`}
               action={
                  <IconButton onClick={() => getRoute()}>
                     <ArrowUpwardIcon/>
                  </IconButton>
               }
            />
            <CardActions disableSpacing>
               <span style={{paddingLeft: '8px'}}>Details</span>
               <IconButton
                  className={clsx(classes.expand, {
                     [classes.expandOpen]: expanded,
                  })}
                  onClick={() => setExpanded(!expanded)}
               >
                  <ExpandMoreIcon/>
               </IconButton>
               <div style={{flexGrow: '1'}}></div>
               { same ?
                  <Fragment>
                     <Select
                        style={{visibility: 'hidden'}}
                        value={option}
                        open={select}
                        onClose={() => setSelect(false)}
                        onOpen={() => setSelect(true)}
                        onChange={(event) => handleOption(event)}
                     >
                        <MenuItem value={'edit'}>Edit</MenuItem>
                        <MenuItem value={'delete'}>Delete</MenuItem>
                     </Select>
                     <IconButton aria-label="settings" onClick={() => setSelect(true)}>
                        <MoreVertIcon />
                     </IconButton>
                  </Fragment>
               :
                  ''
               }
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
               <CardContent>
                  {props.data.type === 'drive' ?
                     <Fragment>
                        <Typography>{props.data.name} is offering a ride</Typography>
                        <Typography>Seats: {props.data.seats}</Typography>  
                     </Fragment>
                  :
                     <Typography>{props.data.name} is looking for a ride</Typography>
                  }
                  <Typography>Phone number: {props.data.number}</Typography>
               </CardContent>
            </Collapse>
         </Card>
      </div>
   );
}

export default RideCard;