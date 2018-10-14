import React, {Component} from 'react';
import Slide1 from '../../../assets/images/slide1.png';
import Arrow_down from '../../../assets/images/arrow_down.svg';
import Carousel from 'nuka-carousel';
import {Link} from 'react-router-dom';

export default class HomeCarousel extends Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    var element = document.getElementById('footerAnchor');
    element.scrollIntoView();
  }

  render() {
    return (
      <div className="homeCarousel">
        <Carousel>
          <div className="slide">
            <img src={Slide1} alt="slide1"/>
            <div className="content">
              <h1>
                <p>Help wage a
                #BILLIONSNOTMILLIONS ROAR
                against big pharma to save lives.</p>
                <div className="clear"></div>
              </h1>
              <Link to="/select-roar-type">
                <div className="yellowbutton">Create Card</div>
              </Link>
            </div>
          </div>
          <div className="slide">
            <img src={Slide1} alt="slide1"/>
            <div className="content">
              <h1><p>One voice, a whisper.
                Thousands of voices joined together...
                a ROAR.</p>
                <div className="clear"></div>
              </h1>
              <h3><p>Be heard. Be counted. Be a part of change.</p><p>Protest postcards straight to the seats of
                power.</p></h3>
              <Link to="/select-roar-type">
                <div className="yellowbutton">Create Card</div>
              </Link>
            </div>
          </div>
          <div className="slide">
            <img src={Slide1} alt="slide1"/>
            <div className="content">
              <h1><p>Time to hold opioid
                manufacturers & distributors
                accountable for their greed.</p>
                <div className="clear"></div>
              </h1>
              <h3><p>Be heard. Be counted. Be a part of change.</p><p>Protest postcards straight to the seats of
                power.</p></h3>
              <Link to="/select-roar-type">
                <div className="yellowbutton">Create Card</div>
              </Link>
            </div>
          </div>
        </Carousel>
        <p className="learnmore_mobile" onClick={this.handleScroll}>Learn More About Our Campaign</p>
        <p className="learnmore" onClick={this.handleScroll}>Learn More About Our Campaign<br/><img src={Arrow_down} alt="Arrow Down"/></p>
      </div>
    );
  }
}
