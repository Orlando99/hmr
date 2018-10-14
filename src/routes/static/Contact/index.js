import React from 'react';
// import PropTypes from 'prop-types';
import NavBar from '../../../common/components/NavBar';
import Banner from '../../../assets/images/slide2.png';
// import uuid from 'uuid/v4';
// import meta from './meta';

/**
 * @class Contact
 */
function Contact() {
  return (
    <div className="createRoarPage createPostcardMessage static">
      <NavBar/>
      <div className="banner">
        <div className="content">
          <h1><p>Contact&nbsp;<br/></p></h1>
        </div>
        <img src={Banner} alt="Banner"/>
      </div>
      <div className="mainpart">
        <div className="content_container">
          <div className="content">
            <h1>Contact</h1>
            <div>
              <h2>GENERAL INFORMATION AND USER SUPPORT</h2>
              <p>Please visit our FAQ's. If you can't find the information you need, email us with your postcard, general, or campaign-specific questions. Our support staff will be  happy to respond as quickly as we can! <a href="mailto:info@hearmyroar.org">info@hearmyroar.org</a> </p>
            </div>
            <div>
              <h2>ALL MEDIA INQUIRIES</h2>
              <p>Please contact us with your media, PR, and blog inquiries.
                We can't wait to spread the ROAR! <a href="mailto:media@hearmyroar.org">media@hearmyroar.org</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Contact;
