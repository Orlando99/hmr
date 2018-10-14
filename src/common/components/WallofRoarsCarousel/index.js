import React from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import FlipButton from '../FlipButton';
// import Icon from '../Icon';
import uuid from 'uuid/v4';

// function onPageDown(page) {
//   const minPage = Math.max(0, page);
//   return minPage;
// }
//
// function onPageUp(page) {
//
// }

/**
 * @class WallofRoarsCarousel
 */
class WallofRoarsCarousel extends React.Component {

  static propTypes = {
    /** The roars to render */
    roars: PropTypes.array.isRequired,
    /** Error object */
    error: PropTypes.object,
    /** get next page func */
    getMoreRoars: PropTypes.func.isRequired,
    /** The current page */
    page: PropTypes.number.isRequired,
    /** Items to paginate */
    count: PropTypes.number.isRequired,
    /** Amount of items per page */
    offset: PropTypes.number.isRequired,
    /** Size of the page */
    limit: PropTypes.number.isRequired,
  };

  state = {
    page: 0
  }

  /** @inheritdoc */
  componentWillUnmount() {
    // When the user leaves the page, set the scroll of the page back to zero
    this.setState({
      page: 0
    });
  }

  render() {
    const {
      pastRoars,
      error,
    } = this.props;

    if (!_.isEmpty(error)){
      return (
        <div>
          This is an error :(
        </div>
      );
    }

    return (
      <div className="wallofRoarsCarousel stacked-cards stacked-cards-slide">
        <ul className="slider">
          {
            pastRoars.map((roar, i) => {
              return (
                <li key={uuid()}>
                  <div className="content_flip">
                    <div className="frontside"><img src={roar.template.details.artwork.url} alt='front side' /></div>
                    <div className="backside">{_.get(roar, 'artifacts.png.front', false) && <img src={roar.artifacts.png.front} alt='front side' />}</div>
                  </div>
                  <Link to={`/create/sent/${i}`}>
                    <div className="preview button">Click to Preview</div>
                  </Link>
                  <FlipButton roar={roar}/>
                  <h3>Sent By: {roar.mailingInfo.sender.name}</h3>
                  {i < 9 && <h3 className="number">{'0'+(i+1)}</h3>}
                  {i >= 9 && <h3 className="number">{i+1}</h3>}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}
export default WallofRoarsCarousel;
