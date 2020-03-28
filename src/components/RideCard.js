import React, { useState, useEffect } from 'react';
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
   // const [docData, setDocData] = useState({});

   // useEffect(() => {
   //    setDocData(props.data);
   // }, [props.data]);

   const classes = useStyles();

   return (
      <Card style={{margin: '0px 5px', flex: 1}} key={props.index}>  
         <CardHeader
            style={{paddingBottom: '0px'}}
            avatar={
               <Avatar aria-label="username" style={{backgroundColor:'blue'}}>
                  A
               </Avatar>
            }
            title={props.data.number}
            subheader="Tiburon, CA - March 30th 8:00 AM"
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
               <Typography>Seats: 3</Typography>
               <Typography>Phone number: (916) 280-4529</Typography>
            </CardContent>
         </Collapse>
      </Card>
   );
}

export default RideCard;