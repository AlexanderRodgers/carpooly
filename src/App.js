import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import MapView from './components/MapView';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import SandBox from './components/SandBox';
import { UserContext } from './components/UserContext';
import './App.css';

import { auth } from './firebase';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    console.log('running affect');
    auth.onAuthStateChanged(authUser => {
      console.log('auth user', authUser);
      if (authUser) {
        setUser(authUser);
        setLoading(false);
      }
      setLoading(false);
    });
  }, [user]);
  
  return (
    <Router>
      <Switch>
        <UserContext.Provider value={user}>
          <Route exact path="/" component={Home}></Route>
          <Route path="/login" component={SignIn}></Route>
          <Route path="/sign-up" component={SignUp}></Route>
          <ProtectedRoute path="/map" component={MapView} authed={user} loading={loading}></ProtectedRoute>
          <Route path="/sandbox" component={SandBox} ></Route>
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
