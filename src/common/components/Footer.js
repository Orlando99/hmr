/* eslint-disable */
import React from 'react';
import footer_logo from '../../assets/images/logo_white.png';
// import Fedup_img from '../../assets/images/fedup.png';
import Fedup_img from '../../assets/images/fedup-new.png';
import {Link} from 'react-router-dom';

class Footer extends React.Component {
  render() {
    return (
      <div>
        <div id='footerAnchor' className="bottom_part">
          <div className="content_container">
            <div className="content">
              <h1 className="title">HELP US WAGE A #BILLIONSNOTMILLIONS ROAR TO SAVE LIVES...</h1>
              <img src={Fedup_img} alt="fedup" className="fedupImage"/>
              <h3>We’re fighting back to rebuild our communities, and trying something that's never been done before.</h3>
              <p>Now it’s easy to send a <b>personalized printed postcard</b> to your elected officials.
                Share your voice demanding that all lawsuits filed against opioid manufacturers and distributors be settled for BILLIONS NOT MILLIONS. <b>Help us shatter the stigma of addiction and get the resources our communities so desperately need</b> to turn the tide on this health care emergency once and for all.
                <br/><br/>Thank you for helping us unite thousands of voices into a ROAR way too loud for our Governors & Attorneys General, Senators & Representatives,
                and President & First Lady Trump to ignore!<br/><br/>And don’t forget to join us to ROAR in person on October 6th & 7th for
                our 6th Annual FED UP! Rally in Washington DC.  <a target="_blank" rel="noreferrer noopener" href="https://feduprally.org/rally2018/">CLICK FOR MORE INFORMATION</a>.<br/><br/>One voice is a whisper.
                Thousands of voices joined together? THAT’S A ROAR.</p>
              <a href="https://feduprally.org/become-a-member/" target="_blank" rel="noreferrer noopener">
                <div className="yellowbutton fed-up-link footer-button-cta">
                  Visit Fed Up!
                </div>
              </a>
              <Link to='/select-roar-type'>
                <div className="yellowbutton fed-up-link footer-button-cta create-card-link">
                  Create a Card
                </div>
              </Link>
              <div className="clear"></div>
            </div>
          </div>
        </div>
        <div className="footer_container">
          <div className="footer">
            <div className="leftpart">
              <div className="footer_logo">
                <img src={footer_logo} alt="Footer Logo" width="65"/>
              </div>
              <div className="footer_menu">
                <ul>
                  <li><Link to="/about">about</Link></li>
                  <li><Link to="/faq">Faq</Link></li>
                  <li><Link to="/tcs">terms</Link></li>
                  <li><Link to="/privacypolicy">privacy</Link></li>
                  <li><Link to="/contact">contact</Link></li>
                </ul>
              </div>
              <div className="copyright">
                © COPYRIGHT 2018 HearMyRoar LLC
              </div>
            </div>
            <div className="socialmedia">
              <a href='https://www.facebook.com/HearMyRoarNow/' target="_blank" rel="noreferrer noopener"><i className="fab fa-facebook-square" aria-hidden="true"></i></a>
              <a href='https://twitter.com/HearMyRoarNow' target="_blank" rel="noreferrer noopener"><i className="fab fa-twitter" aria-hidden="true"></i></a>
              <a href='https://www.instagram.com/hearmyroarnow/' target="_blank" rel="noreferrer noopener"><i className="fab fa-instagram" aria-hidden="true"></i></a>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
