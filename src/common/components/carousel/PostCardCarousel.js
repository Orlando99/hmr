import React, {Component} from 'react';
import Carousel from 'nuka-carousel';
import Postcard from '../../../assets/images/postcard_sample.png';
import {Link} from 'react-router-dom';

export default class PostCardCarousel extends Component {
  render() {
    return (
      <div className="postCardCarousel">
        <Carousel width="300px">
          <div className="slide">
            <img src={Postcard} width="165" height="110" alt="Postcard1"/>
            <h3>customize<br/>your postcard</h3>
            <p>Select artwork from one<br/>of the campaign’s artists<br/>and enter in your personal<br/>message</p>
            <Link to="/create/artwork">
              <div className="yellowbutton">Select</div>
            </Link>
            <p className="usonly">*USA only mention.</p>
          </div>
          <div className="slide">
            <img src={Postcard} width="165" height="110" alt="Postcard2"/>
            <h3>previously created<br/>postcard </h3>
            <p>Honor someone’s story<br/>by sending their postcard<br/>in your name</p>
            <Link to="/create/sent">
              <div className="yellowbutton">Select</div>
            </Link>
            <p className="usonly">*USA only mention.</p>
          </div>
        </Carousel>
      </div>
    );
  }
}
