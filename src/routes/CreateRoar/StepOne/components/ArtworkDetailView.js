import React from 'react';
import NavBar from '../../../../common/components/NavBar';
import Banner from '../../../../assets/images/slide2.png';
import BreadCrumb from '../../../../common/components/BreadCrumb';
import Cross_Icon from '../../../../assets/images/cross_black.svg';
import {Link} from 'react-router-dom';
import _ from 'lodash';

export default class ArtworkDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.flipcard = this.flipcard.bind(this);
  }

  flipcard() {
    if (document.getElementsByClassName("partcontent")[0].classList.contains('flip'))
      document.getElementsByClassName("partcontent")[0].classList.remove('flip');
    else
      document.getElementsByClassName("partcontent")[0].classList.add('flip');
  }

  componentDidMount() {
    const {
      match,
      selectArtwork
    } = this.props;
    selectArtwork({artworkId: match.params.id});

    if (document.getElementById("frontside_img") !== null) {
      if (document.getElementsByClassName("partcontent")[0] !== undefined) {
        if (document.getElementsByClassName("backside")[0] !== undefined) {
          document.getElementById("frontside_img").style.width = document.getElementsByClassName("partcontent")[0].offsetWidth + "px";
          const img_height = document.getElementById("frontside_img").naturalHeight * document.getElementsByClassName("partcontent")[0].offsetWidth / document.getElementById("frontside_img").naturalWidth;
          document.getElementsByClassName("partcontent")[0].parentElement.style.height = img_height + "px";
          document.getElementsByClassName("backside")[0].style.width = document.getElementsByClassName("partcontent")[0].offsetWidth + "px";
          document.getElementsByClassName("backside")[0].style.height = img_height + "px";
          document.getElementsByClassName("backside")[0].parentElement.style.width = document.getElementsByClassName("partcontent")[0].offsetWidth + "px";
          document.getElementsByClassName("backside")[0].parentElement.style.height = img_height + "px";
        }
      }
    }
  }

  componentDidUpdate() {
    if (document.getElementById("frontside_img") !== null) {
      if (document.getElementsByClassName("partcontent")[0] !== undefined) {
        if (document.getElementsByClassName("backside")[0] !== undefined) {
          document.getElementById("frontside_img").style.width = document.getElementsByClassName("partcontent")[0].offsetWidth + "px";
          const img_height = document.getElementById("frontside_img").naturalHeight * document.getElementsByClassName("partcontent")[0].offsetWidth / document.getElementById("frontside_img").naturalWidth;
          document.getElementsByClassName("partcontent")[0].parentElement.style.height = img_height + "px";
          document.getElementsByClassName("backside")[0].style.width = document.getElementsByClassName("partcontent")[0].offsetWidth + "px";
          document.getElementsByClassName("backside")[0].style.height = img_height + "px";
          document.getElementsByClassName("backside")[0].parentElement.style.width = document.getElementsByClassName("partcontent")[0].offsetWidth + "px";
          document.getElementsByClassName("backside")[0].parentElement.style.height = img_height + "px";
        }
      }
    }
  }

  handleBackBtn = () => {
    window.location.href = '/create/artwork';
  };

  render() {
    const {
      selectedArtwork
    } = this.props;
    if (!selectedArtwork) {
      return (
        <div></div>
      );
    } else {
      return (
        <div className="createRoarPage artworkDetail">
          <NavBar/>
          <div className="banner">
            <div className="content">
              <h1><p>Preview Artwork</p></h1>
            </div>
            <img src={Banner} alt="Banner"/>
          </div>
          <div className="content_container">
            <BreadCrumb
              url={this.props.location.pathname}
              navigateBack={this.handleBackBtn}
            />
          </div>
          <div className="postcard_detail">
            <div className="content">
              <h3>&nbsp;</h3>
              <Link to="/create/artwork"><img src={Cross_Icon} alt="Cross" className="cross"/></Link>
              <div className="imagepart"><img src={selectedArtwork.url} alt="Postcard"/>
              </div>
              <p>
                {_.get(selectedArtwork, 'description', '') ? `"${_.get(selectedArtwork, 'description', '')}"` : ''} <br/>© Copyright 2018. All rights reserved.
                {selectedArtwork.link && <React.Fragment><br/><a href={_.get(selectedArtwork, 'link', '')}>{_.get(selectedArtwork, 'link', '')}</a></React.Fragment>}
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
}
