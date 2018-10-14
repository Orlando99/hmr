import FlipButton from '../../../../common/components/FlipButton';
import React from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

class SentPostcardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }

  static propTypes = {
    pastRoars: PropTypes.array.isRequired,
    error: PropTypes.object,
    getMoreRoars: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    staticRoars: PropTypes.array,
  };

  componentWillUnmount() {
    // When the user leaves the page, set the scroll of the page back to zero
    this.setState({
      page: 0
    });
  }

  hasMore = () => {
    const {pastRoars, count} = this.props;
    return pastRoars.length - 4 < count;
  };

  getMoreRoars = () => {
    const {getMoreRoars} = this.props;
    getMoreRoars();
    // const debounceGetMoreRoars = _.debounce(getMoreRoars, 500);
    // debounceGetMoreRoars({offset: offset + 1});
  };

  render() {
    const {
      pastRoars,
      error,
    } = this.props;

    if (!_.isEmpty(error)){
      return (
        <div>
          Something went wrong when we tried to fetch the past roars :(
        </div>
      );
    }

    return (
      <div className="sentpostcards">
        <ul>
          {
            pastRoars && pastRoars.length > 0 && pastRoars.map((roar, i) => {
              return (
                <li key={uuid()} className='flip'>
                  <div className="content_flip">
                    <div className="frontside"> <img src={roar.template.details.artwork.url} alt='roar back' /></div>
                    <div className="backside">{_.get(roar, 'artifacts.png.front', false) && <img src={roar.artifacts.png.front} alt='roar front' />}</div>
                  </div>
                  <Link to={`/create/sent/${roar._id}`}>
                    <div className="preview button">Adopt Card</div>
                  </Link>
                  <FlipButton roar={roar}/>
                  <h3>Sent By: {roar.mailingInfo.sender.name}</h3>
                  <Link to={`/create/sent/${roar._id}`} className="select">
                    <div className="yellowbutton">Select</div>
                  </Link>
                </li>
              );
            })
          }
        </ul>
        {this.hasMore() && <div className='hmr-load-more-container'><a onClick={this.getMoreRoars}><div className="yellowbutton">Load More</div></a></div>}
      </div>
    );
  }
}
export default SentPostcardList;
