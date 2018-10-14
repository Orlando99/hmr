import React from 'react';
// import PropTypes from 'prop-types';
import _ from 'lodash';
import NavBar from '../../../common/components/NavBar';
import Banner from '../../../assets/images/slide2.png';
import uuid from 'uuid/v4';
import meta from './meta';

/**
 * @class TCS
 */
function TCS() {
  return (
    <div className="createRoarPage createPostcardMessage static">
      <NavBar/>
      <div className="banner">
        <div className="content">
          <h1><p>Terms and Conditions&nbsp;<br/></p></h1>
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
                    {
                      _.get(metaItem, 'list', false)
                        ? (
                          <ul>
                            {
                              metaItem.list.map(listItem => {
                                return (
                                  <li key={uuid()}>{listItem}</li>
                                );
                              })
                            }
                          </ul>
                        )
                        : null
                    }
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
export default TCS;
