import React from 'react';
import './App.css';
import MapBox from './components/MapBox';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';


function App() {
  return (
    <div className="App">
      {/* <SignIn/> */}
      <SignUp></SignUp>
      {/* <MapBox></MapBox> */}
    </div>
  );
}

export default App;
