import React, { useState, Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
   expand: {
     transform: 'rotate(0deg)',
     marginLeft: 'auto',
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

   const classes = useStyles();

   return (
      <Card style={{margin: '0px 5px', flex: 1, marginBottom: '5px'}} key={props.id} className="ride-card">  
         <CardHeader
            style={{paddingBottom: '0px'}}
            avatar={
               <Avatar aria-label="username" style={{backgroundColor:'blue'}}>
                  A
               </Avatar>
            }
            title={props.data.name}
            subheader={`${getArea()} ${getDate(props.data.date)} ${getTime(props.data.time)}`}
         />
         <CardActions>
            Details
            <IconButton
               className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
               })}
               onClick={() => setExpanded(!expanded)}
            >
               <ExpandMoreIcon/>
            </IconButton>
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
   );
}

export default RideCard;