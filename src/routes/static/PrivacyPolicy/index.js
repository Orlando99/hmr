import React from 'react';
// import PropTypes from 'prop-types';
import NavBar from '../../../common/components/NavBar';
import Banner from '../../../assets/images/slide2.png';

/**
 * @class Privacy Policy
 */
function PrivacyPolicy() {
  return (
    <div className="createRoarPage createPostcardMessage static">
      <NavBar/>
      <div className="banner">
        <div className="content">
          <h1><p>Privacy Policy&nbsp;<br/></p></h1>
        </div>
        <img src={Banner} alt="Banner"/>
      </div>
      <div className="mainpart">
        <div className="content_container">
          <div className="content">
            <h1>Privacy Policy</h1>
            <h2>Can I send a card to an address other than those listed?</h2>
            <time>August 7, 2018</time>
            <p>

              Hear My Roar collects certain pieces of information from every user of our Service, including full name, email address, personal address (used to look up elected officials), campaigns (ROARs) visited on our site, number of cards sent, stories, and images uploaded for use with your cards. All credit card and payment information is store off-site with trusted third-party vendors such as Stripe and PayPal.
              We will never share, sell, or provide any of your personal information to any individual or organization unless you explicitly give us permission through an opt-in process except as outlined below.  By opting in you give us permission to share your name and email address with our trusted partners, Fed UP and Facing Addiction and NCADD. You will also have the opportunity to opt-in for the public display of your postcard in which case your full postcard (with your address blocked out) will be shown.
              Unless you opt in, no information will be shared with any other firm, service, or entity except as follows:
              Your information can be changed, updated, or deleted from Hear My Roar’s database by writing us (using the email address you originally registered with) and submitting either the changes you wish to make or requesting a full deletion of your records. To do so please contact us at:  help@hearmyroar.org
              Hear My Roar reserves the right to change our Privacy Policy at any time with changes posted in a reasonable
              time period.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PrivacyPolicy;
