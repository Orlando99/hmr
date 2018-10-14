import React, {Component} from 'react';
// import CardStackImage1 from '../../../assets/images/card_stack1.png';
// import CardStackImage2 from '../../../assets/images/card_stack2.png';

export default class WallofRoarCarousel extends Component {
  render() {
    return (
      <div className="wallofRoarCarousel stacked-cards stacked-cards-slide">
        <ul className="slider">
          <li>
            <img src='https://s3.amazonaws.com/hmr-web-prod/wall-of-roars/wall-of-roars-1-front.jpg' alt="slide1"/>
          </li>
          <li>
            <img src='https://s3.amazonaws.com/hmr-web-prod/wall-of-roars/wall-of-roars-2-front.jpg' alt="slide2"/>
          </li>
          <li>
            <img src='https://s3.amazonaws.com/hmr-web-prod/wall-of-roars/wall-of-roars-3-front.jpg' alt="slide3"/>
          </li>
          <li>
            <img src='https://s3.amazonaws.com/hmr-web-prod/wall-of-roars/wall-of-roars-4-front.jpg' alt="slide4"/>
          </li>
        </ul>
        <ul className="buttons">
        </ul>
      </div>
    );
  }
}
