import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';
// import classnames from 'classnames';

import NavBar from '../../../../common/components/NavBar';
import Banner from '../../../../assets/images/slide2.png';

import {Link} from 'react-router-dom';

import {fetchMyRoars} from './modules/actions';
import SendPostCardList from '../../../../common/components/SendPostCardList';
import WallofRoarsCarousel from '../../../../common/components/WallofRoarsCarousel';
import './style/index.css';

class MyRoars extends React.Component {

  static propTypes = {
    /** function to get Roars */
    fetchMyRoars: PropTypes.func.isRequired,
    /** The roars to show */
    roars: PropTypes.array.isRequired,
    /** the current page of roars */
    page: PropTypes.number,
    /** if the content is loading */
    isLoading: PropTypes.bool.isRequired,
    /** The error from the API call */
    error: PropTypes.object
  }

  static defaultProps = {
    error: null,
    page: 0,
    incrementPage: () => {}
  }

  /** @inheritdoc */
  componentDidMount() {
    this.props.fetchMyRoars({offset: 0});
  }

  componentDidUpdate(){
    const {roars} = this.props;
    if(roars && roars.length > 0) {
      window.wallofRoarsinit();
    }
  }

  /** @inheritdoc */
  render() {
    const {roars} = this.props;
    return (
      <div className="createRoarPage myRoars">
        <NavBar/>
        <div className="banner">
          <div className="content">
            <h1><p>My Cards&nbsp;<br/></p></h1>
          </div>
          <img src={Banner} alt="Banner"/>
        </div>
        <div className="content_container">
          <div className="content">
            {roars && roars.length > 0 &&
              <React.Fragment>
                <div className = "myRoarsCarousel_container">
                  <WallofRoarsCarousel
                    pastRoars={roars}
                    count={this.props.count}
                    page={this.props.page}
                    offset={this.props.offset}
                    limit={this.props.limit}
                    getMoreRoars={this.props.fetchMyRoars}
                  />
                </div>
                <div className = "myRoarslist_container">
                  <SendPostCardList
                    pastRoars={roars}
                    count={this.props.count}
                    page={this.props.page}
                    offset={this.props.offset}
                    limit={this.props.limit}
                    getMoreRoars={this.props.fetchMyRoars}
                  />
                </div>
              </React.Fragment>
            }
            {roars && roars.length === 0 &&
              <div className='no-roars'><h1>You currently have no cards in your archives. <br /><br />Want to <Link to='/select-roar-type'>JOIN THE ROAR?</Link></h1></div>
            }
          </div>
        </div>
      </div>
    );
  }
}


/** @inheritdoc */
function mapStateToProps(state) {
  return {
    roars: _.get(state, 'myRoars.roars', []),
    page: _.get(state, 'myRoars.page', 0),
    offset: _.get(state, 'myRoars.offset', 0),
    limit: _.get(state, 'myRoars.limit', 9),
    count: _.get(state, 'myRoars.count', 0)
  };
}

export default connect(mapStateToProps, {fetchMyRoars})(MyRoars);
