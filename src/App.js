import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MapView from './components/MapView';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import SandBox from './components/SandBox';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/login" component={SignIn}></Route>
        <Route path="/sign-up" component={SignUp}></Route>
        <Route path="/map" component={MapView}></Route>
        <Route path="/sandbox" component={SandBox}></Route>
      </Switch>
    </Router>
  );
}

export default App;
