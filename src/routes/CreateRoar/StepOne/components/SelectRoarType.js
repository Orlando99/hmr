import React from 'react';
import NavBar from '../../../../common/components/NavBar';
// import Banner from '../../../../assets/images/fedup1.jpg';
import Slide1 from '../../../../assets/images/slide2.png';
import Postcard from '../../../../assets/images/postcard_sample.png';
import PostCardCarousel from '../../../../common/components/carousel/PostCardCarousel';
import {Link} from 'react-router-dom';

export default class CreateRoar extends React.Component {
  render() {
    return (
      <div className="createRoarPage selectPostcard">
        <NavBar/>
        <div className="banner">
          <div className="content">
            <h1><p>Your #billionsnotmillions roar</p><p><span>start by selecting one of the options below</span></p></h1>
          </div>
          <img src={Slide1} alt="Banner"/>
        </div>
        <div className="content_container">
          <div className="desktop_content">
            <ul className="postcards">
              <li>
                <img src={Postcard} width="165" height="110" alt="Postcard1"/>
                <h3>create a<br/>customized postcard<br/> all your own</h3>
                <p>Select artwork for the front of<br/> your card and share your<br/>personal story honoring<br/>someone lost or in recovery<br/> plus an optional photo</p>
                <Link to="/create/artwork">
                  <div className="yellowbutton">Select</div>
                </Link>
              </li>
              <label>OR</label>
              <li className='adopt-card-selection'>
                <img src={Postcard} width="165" height="110" alt="Postcard2"/>
                <h3>"adopt" a<br/>postcard from our<br/>wall of cards</h3>
                <p>Honor someone’s story<br/>by sending their postcard<br/>in your name</p>
                <Link to="/create/sent">
                  <div className="yellowbutton">Select</div>
                </Link>
              </li>
            </ul>
            <p className="usonly">*Please note, for this campaign, postcards can only be sent by residents of the USA.</p>
          </div>
          <PostCardCarousel/>
        </div>
      </div>
    );
  }
}
