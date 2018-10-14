/* eslint-disable */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import uuid from 'uuid';
import _ from 'lodash';
import classNames from 'classnames';
export default class ArtworkViewCarousel extends Component {
  constructor(props) {
    super(props);
    this.postCardSlide = this.postCardSlide.bind(this);
    this.saveArtwork = this.saveArtwork.bind(this);
  }

  componentDidUpdate() {
    window.artWorkinit();
  }

  saveArtwork(artworkItem) {
    this.props.saveArtworkToRoar(artworkItem);
    this.props.history.push('/create-roar');
  }

  postCardSlide() {
    const {
      artwork
    } = this.props;
    let slides = [];
    if(artwork && artwork.length > 0) {
      artwork.forEach((artworkItem) => {
        slides.push(<li key={uuid()}>
          <div className={classNames({'portrait':artworkItem.type==='portrait'}, {'landscape':artworkItem.type==='landscape'})}><img src={artworkItem.url} alt="Postcard Artwork"/>
          <Link to={`/create/artwork/${artworkItem.id}`}>
            <div className="preview button">Click to Preview</div>
          </Link>
          </div>
          <h3>By {_.get(artworkItem, 'credit', '')} <br/>-</h3>
          <p>
            {_.get(artworkItem, 'description', '') ? `"${_.get(artworkItem, 'description', '')}"` : ''} <br/>© Copyright 2018. All rights reserved.
            <br/><a target='_blank' rel='noopener noreferrer' href={_.get(artworkItem, 'link')}>{_.get(artworkItem, 'link')}</a>
          </p>
          <a onClick={() => {this.saveArtwork(artworkItem)}}>
            <div className="yellowbutton">Select</div>
          </a>
        </li>);
      });
    }
    return slides;
  }

  render() {
    return (
      <div className="artworkViewCarousel stacked-cards stacked-cards-slide">
        <ul className="slider">
          {this.postCardSlide()}
        </ul>
        <ul className="buttons">
        </ul>
      </div>
    );
  }
}
