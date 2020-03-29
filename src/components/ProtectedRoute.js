import React from 'react';
import { Route, Redirect } from 'react-router-dom';
export const ProtectedRoute = ({ component: Component , authed, loading, ...rest }) => {

   if (loading) {
      return (<div>Loading...</div>);
   }

   const getCookie = (cname) => {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
         var c = ca[i];
         while (c.charAt(0) === ' ') {
            c = c.substring(1);
         }
         if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
         }
      }
      return "";
   }

   const isAuthed = () => {
      let cookie = getCookie('user');
      if (cookie.length === 0) {
         return false;
      }
      return true;
   }

   return (
      <Route {...rest} render={
         (props) => {
            console.log(authed);
            if (isAuthed()) {
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