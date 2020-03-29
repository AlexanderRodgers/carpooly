import React from 'react';
import Typography from '@material-ui/core/Typography';
import './Footer.css';

const Footer = () => {
   return (
      <footer className="footer">
         <div className="contact">
            <h2>Contact me</h2>
            <h4>aerodger@calpoly.edu</h4>
            <h4>alexedrodgers@gmail.com</h4>
            <h4>github.com/AlexanderRodgers</h4>
         </div>
         <ul className="footer-nav">
            <li className="nav-item">
               <h3 className="nav-title">Other</h3>
            </li>
         </ul>
      </footer>
   );
}

export default Footer;