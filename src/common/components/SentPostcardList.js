import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import FlipButton from '../../common/components/FlipButton';
import _ from 'lodash';

SentPostcardList.propTypes = {
  /** The roars to render */
  roars: PropTypes.array.isRequired
};

/**
 * @class SentPostcardList
 */
function SentPostcardList({
  roars
}) {
  return (
    <div className="sentpostcards">
      <ul>
        {
          roars.map((roar, i) => {
            return (
              <li key={roar.id}>
                <div className="content_flip">
                  <div className="frontside"> <img alt='pc back' src={roar.template.details.artwork.url} /></div>
                  <div className="backside">{_.get(roar, 'artifacts.png.front', false) && <img src={roar.artifacts.png.front} alt='front side' />}</div>
                </div>
                <Link to={`/create/sent/${roar._id}`}>
                  <div className="preview button">Click to Preview</div>
                </Link>
                <FlipButton roar={roar}/>
                <h3>Sent by: {roar.mailingInfo.sender.name}</h3>
                <Link to={`/create/sent/${roar._id}`} className="select">
                  <div className="yellowbutton">Select</div>
                </Link>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default SentPostcardList;
