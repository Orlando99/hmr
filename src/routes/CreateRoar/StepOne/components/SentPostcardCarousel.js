import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import FlipButton from '../../../../common/components/FlipButton';
import _ from 'lodash';

export default class SentPostcardCarousel extends Component {
  componentDidUpdate() {
    window.sentPostcardinit();
  }

  componentDidMount() {
    window.sentPostcardinit();
  }

  postCardSlide() {
    let slides = [];
    const {
      pastRoars
    } = this.props;
    let i = 0;
    if(pastRoars && pastRoars.length > 0) {
      pastRoars.forEach(function (pastRoar) {
        let no = '';
        i++;
        if (i < 10)
          no = '0' + i;
        else
          no = i;

        slides.push(
          <li key={pastRoar.id} className="flip">
            <div className="content_flip">
              <div className="frontside"><img src={pastRoar.template.details.artwork.url} alt="Postcard"/></div>
              <div className="backside">{_.get(pastRoar, 'artifacts.png.front', false) && <img src={pastRoar.artifacts.png.front} alt='roar front' />}</div>
            </div>
            <Link to={`/create/sent/${pastRoar._id}`}>
              <div className="preview button">Adopt Card</div>
            </Link>
            <FlipButton postcard={pastRoar}/>
            <h3>Sent by {pastRoar.mailingInfo.sender.name}</h3>
            <h4 className="number">{no}</h4>
            <Link to={`/create/sent/${pastRoar._id}`} className="select">
              <div className="yellowbutton">Select</div>
            </Link>
          </li>
        );
      });
      return slides;
    } else {
      return <li></li>;
    }
  }

  render() {
    return (
      <div className="sentPostcardCarousel sentpostcards stacked-cards stacked-cards-slide">
        <ul className="slider">
          {this.postCardSlide()}
        </ul>
        <ul className="buttons">
        </ul>
      </div>
    );
  }
}
