import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MapBox from './components/MapBox';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/login" component={SignIn}></Route>
        <Route path="/sign-up" component={SignUp}></Route>
      </Switch>
    </Router>
  );
}

export default App;
