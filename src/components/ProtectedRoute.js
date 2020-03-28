import React, { useContext, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './UserContext';
export const ProtectedRoute = ({ component: Component , authed, loading, ...rest }) => {

   if (loading) {
      return (<div>Loadin...</div>);
   }

   return (
      <Route {...rest} render={
         (props) => {
            if (authed) {
               return <Component {...props}/>
            } else {
               return (<Redirect to={
                  {
                     pathname: "/login",
                     state: props.location
                  }
               }/>);
            }
         }
      }
      />
   );
}