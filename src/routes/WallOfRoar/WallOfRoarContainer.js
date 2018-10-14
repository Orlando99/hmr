import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';
import classnames from 'classnames';

import NavBar from '../../common/components/NavBar';
import Banner from '../../assets/images/slide2.png';

import SearchBar from '../../common/components/SearchBar';
import {Link} from 'react-router-dom';

import {fetchWallOfRoar} from './modules/actions';
// import SendPostCardList from '../../common/components/SendPostCardList';
import SentPostcardList from '../../routes/CreateRoar/StepOne/components/SentPostcardList';
import WallofRoarsCarousel from '../../common/components/WallofRoarsCarousel';
import './style/index.css';
import { staticRoars } from '../../lib/fixtures/staticRoars';

class WallOfRoarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      searchTerm: ''
    };
    this.searchPostcards = this.searchPostcards.bind(this);
    this.getMoreRoars = this.getMoreRoars.bind(this);
  }
  static propTypes = {
    fetchWallOfRoar: PropTypes.func.isRequired,
    roars: PropTypes.array.isRequired,
    page: PropTypes.number,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.object
  }

  static defaultProps = {
    error: null,
    page: 0
  }

  /** @inheritdoc */
  componentDidMount() {
    this.props.fetchWallOfRoar({offset: 0});
  }

  componentDidUpdate(){
    window.wallofRoarsinit();
  }

  searchPostcards(event) {
    const {offset, searchTerm} = this.props;
    if (event.target.value.length >= 3 || event.keyCode === 13 || event.target.value === '') {
      this.props.fetchWallOfRoar({
        searchTerm: event.target.value,
        offset: offset,
        isNewSearch: event.target.value !== searchTerm
      });
    }
  }

  getMoreRoars() {
    const { offset, searchTerm } = this.props;
    this.props.fetchWallOfRoar({
      offset,
      searchTerm
    });
  }

  /** @inheritdoc */
  render() {
    const {
      roars,
      searchTerm
    } = this.props;
    const allRoars = searchTerm && searchTerm.length > 0 ? roars : _.uniqBy(staticRoars.concat(roars));
    return (
      <div className="createRoarPage wallofroar">
        <NavBar/>
        <div className="banner">
          <div className="content">
            <h1><p>Wall Of Cards</p>&nbsp;<br/></h1>
          </div>
          <img src={Banner} alt="Banner"/>
        </div>
        <div className="content_container">
          <div className="content search">
            <SearchBar
              placeholder="Search by sender's name"
              searchFn={this.searchPostcards}
            />
            <Link to='/select-roar-type'>
              <div
                className={classnames('yellowbutton', 'desktop')}>
                Create Your Own
              </div>
            </Link>
            <div className="clear"></div>
          </div>
        </div>
        <div className="content_container">
          <div className="content">
            <div className = "wallofroarscarousel_container">
              <WallofRoarsCarousel
                pastRoars={allRoars}
                count={this.props.count}
                page={this.props.page}
                offset={this.props.offset}
                limit={this.props.limit}
                getMoreRoars={this.getMoreRoars}
              />
            </div>
            <div className = "wallofroarslist_container">
              <SentPostcardList
                pastRoars={allRoars}
                count={this.props.count}
                page={this.props.page}
                offset={this.props.offset}
                limit={this.props.limit}
                getMoreRoars={this.getMoreRoars}
              />
            </div>
          </div>
        </div>
        <Link to='/select-roar-type'>
          <div
            className={classnames('yellowbutton', 'mobile')}>
            Create Your Own
          </div>
        </Link>
      </div>
    );
  }
}


/** @inheritdoc */
function mapStateToProps(state) {
  return {
    roars: _.get(state, 'wallOfRoars.roars', []),
    page: _.get(state, 'wallOfRoars.page', 0),
    offset: _.get(state, 'wallOfRoars.offset', 0),
    limit: _.get(state, 'wallOfRoars.limit', 9),
    count: _.get(state, 'wallOfRoars.count', 0),
    searchTerm: _.get(state, 'wallOfRoars.searchTerm', '')
  };
}

export default connect(mapStateToProps, {fetchWallOfRoar})(WallOfRoarContainer);
