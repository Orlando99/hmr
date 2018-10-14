import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import classNames from 'classnames';
import uuid from 'uuid';
import _ from 'lodash'

export default class ArtworkList extends React.Component {
  constructor(props) {
    super(props);
    this.postCardSlide = this.postCardSlide.bind(this);
    this.saveArtwork = this.saveArtwork.bind(this);
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
            <br/><a target='_blank' rel='noopener noreferrer' href={`http://${_.get(artworkItem, 'link')}`}>{_.get(artworkItem, 'link')}</a>
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
      <div className="artworkview_content">
        <ul>
          {this.postCardSlide()}
        </ul>
      </div>
    );
  }
}

ArtworkList.propTypes = {
  artwork: PropTypes.array.isRequired
};
