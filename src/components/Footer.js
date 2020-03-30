import React from 'react';
import Typography from '@material-ui/core/Typography';
import './Footer.css';

const Footer = () => {
   return (
      <footer className="footer">
         <div className="contact">
            <h2>Contact me</h2>
            <h4 className="contact-info">aerodger@calpoly.edu</h4>
            <h4 className="contact-info">alexedrodgers@gmail.com</h4>
            <h4 className="contact-info">github.com/AlexanderRodgers</h4>
         <span>Made with <span className="heart">♥</span></span>
         </div>
      </footer>
   );
}

export default Footer;