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

const Sandbox = () => {

   const [expanded, setExpanded] = useState(false);
   const [type, setType] = useState('ride');

   // const getArea = () => {
   //    let areaString = '';
   //    if (props.data.dest.context.length !== 0) {
   //       areaString = props.data.dest.context[0].text + ', ';
   //    }
   //    return areaString;
   // }

   const getTime = (date) => {
      return moment(new Date(date.seconds * 1000)).format('hh:mm A');
   }

   const getDate = (date) => {
      return moment(new Date(date.seconds * 1000)).format('MMM DD');
   }

   const classes = useStyles();

   return (
      <Card style={{margin: '0px 5px', flex: 1, marginBottom: '5px'}} className="ride-card">  
         <CardHeader
            style={{paddingBottom: '0px'}}
            avatar={
               <Avatar aria-label="username" style={{backgroundColor:'blue'}}>
                  A
               </Avatar>
            }
            title="Alex Rodgers"
            subheader={`San Luis Obispo, April 20th 6:30 PM`}
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
               {type === 'drive' ?
                  <Fragment>
                     <Typography>Alex Rodgers is offering a ride</Typography>
                     <Typography>Seats: 4</Typography>  
                  </Fragment>
               :
                  <Typography>Alex Rodgers is looking for a ride</Typography>
               }
               <Typography>Phone number: (916) 280-4529</Typography>
            </CardContent>
         </Collapse>
      </Card>
   );
}

export default Sandbox;