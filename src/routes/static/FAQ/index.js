import React from 'react';
// import PropTypes from 'prop-types';
import NavBar from '../../../common/components/NavBar';
import Banner from '../../../assets/images/slide2.png';
import uuid from 'uuid/v4';
import meta from './meta';
FAQ.propTypes = {
};
/**
 * @class FAQ
 */
function FAQ() {
  return (
    <div className="createRoarPage createPostcardMessage static">
      <NavBar/>
      <div className="banner">
        <div className="content">
          <h1><p>Frequently Asked Questions&nbsp;<br/></p></h1>
        </div>
        <img src={Banner} alt="Banner"/>
      </div>
      <div className="mainpart">
        <div className="content_container">
          <div className="content">
            {
              meta.map(metaItem => {
                return (
                  <div key={uuid()}>
                    <h2>{metaItem.header}</h2>
                    <p>{metaItem.content}</p>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
export default FAQ;
