import React from 'react';
import { Route, Redirect } from 'react-router-dom';
export const ProtectedRoute = ({ component: Component , authed, loading, ...rest }) => {

   if (loading) {
      return (<div>Loading...</div>);
   }

   return (
      <Route {...rest} render={
         (props) => {
            if (Object.keys(authed).length !== 0) {
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