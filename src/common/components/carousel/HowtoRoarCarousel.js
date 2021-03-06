import React, {Component} from 'react';
import Carousel from 'nuka-carousel';
import PostCard_Img from '../../../assets/images/postcard.png';
import Story_Img from '../../../assets/images/story.png';
import SendtoRoar_Img from '../../../assets/images/sendtoroar.png';
import HowtoRoar_Path1 from '../../../assets/images/howtoroar_path1.png';
import HowtoRoar_Path2 from '../../../assets/images/howtoroar_path2.png';

export default class HowtoRoarCarousel extends Component {
  render() {
    return (
      <div className="howtoRoarCarousel">
        <Carousel>
          <div className="slide">
            <div className="image_container">
              <img src={PostCard_Img} alt="postcard"/>
            </div>
            <h3>Begin your roar</h3>
            <p>Click the CREATE CARD<br/>
              button above; decide whether <br/>
              to build your own card,<br/>
              or adopt someone else’s</p>
            <img src={HowtoRoar_Path1} className="howtoroarPath1" alt="HowtoRoar Path1"/>
          </div>
          <div className="slide">
            <div className="image_container">
              <img src={Story_Img} alt="story"/>
            </div>
            <h3>Share your story</h3>
            <p>To create your own card select<br />
              front art from our gallery,<br />
              type your personal story,<br />
              and upload an optional photo</p>
            <img src={HowtoRoar_Path2} className="howtoroarPath2" alt="HowtoRoar Path2"/>
          </div>
          <div className="slide">
            <div className="image_container">
              <img src={SendtoRoar_Img} alt="sendtoroar"/>
            </div>
            <h3>Send your Card</h3>
            <p>Click to send your card to specific<br />
              elected officials ($2.00 for one,<br />
              complete set of six for $10.00).<br />
              Share it with your peers, and set the<br />
              ROAR in motion</p>
          </div>
        </Carousel>
      </div>
    );
  }
}
