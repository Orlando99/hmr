import React from 'react';
import NavBar from '../../../../common/components/NavBar';
import Banner from '../../../../assets/images/slide2.png';
import BreadCrumb from '../../../../common/components/BreadCrumb';
import SentPostcardCarousel from '../../StepOne/components/SentPostcardCarousel';
import SentPostcardList from '../../StepOne/components/SentPostcardList';
import SearchBar from '../../../../common/components/SearchBar';
import { staticRoars } from '../../../../lib/fixtures/staticRoars';
import _ from 'lodash';

export default class SentPostcard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      searchTerm: ''
    };
    this.searchPostcards = this.searchPostcards.bind(this);
    this.getMoreRoars = this.getMoreRoars.bind(this);
  }

  componentDidMount() {
    this.props.fetchRoars({
      offset: 0
    });
  }

  searchPostcards(event) {
    const {offset, searchTerm} = this.props;
    if (event.target.value.length >= 3 || event.keyCode === 13 || event.target.value === '') {
      this.props.fetchRoars({
        searchTerm: event.target.value,
        offset: offset,
        isNewSearch: event.target.value !== searchTerm
      });
    }
  }

  getMoreRoars() {
    const { offset, searchTerm } = this.props;
    this.props.fetchRoars({
      offset,
      searchTerm
    });
  }

  handleBackBtn = () => {
    window.location.href = '/select-roar-type';
  };

  render() {
    const {
      location,
      pastRoars,
      offset,
      count,
      resetRoarFlow,
      searchTerm
    } = this.props;
    const allRoars = searchTerm &&  searchTerm.length > 0 ? pastRoars : _.uniqBy(staticRoars.concat(pastRoars));
    return (
      <div className="createRoarPage sentPostcard">
        <NavBar/>
        <div className="banner">
          <div className="content">
            <h1><p>SEARCH FOR A FRIEND’S CARD OR LOOK THROUGH RECENTLY WRITTEN CARDS<br/> TO FIND ONE YOU WOULD LIKE TO “ADOPT” AND SEND ON YOUR OWN</p></h1>
          </div>
          <img src={Banner} alt="Banner"/>
        </div>
        <div className="content_container">
          <BreadCrumb
            url={location.pathname}
            step={0}
            resetRoarFlow={resetRoarFlow}
            navigateBack={this.handleBackBtn}
            stepOneCopy='Select Card'
          />
          <div className="content">
            <SearchBar
              placeholder="Search by sender's name"
              searchFn={this.searchPostcards}
            />
            <SentPostcardCarousel
              getMoreRoars={this.getMoreRoars}
              pastRoars={allRoars}
              offset={offset}
              count={count}
            />
            <SentPostcardList
              getMoreRoars={this.getMoreRoars}
              pastRoars={allRoars}
              offset={offset}
              count={count}
            />
          </div>
        </div>
      </div>
    );
  }
}
