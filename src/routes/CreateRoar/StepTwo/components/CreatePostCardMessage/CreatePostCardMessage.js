import React from 'react';
import NavBar from '../../../../../common/components/NavBar';
import Banner from '../../../../../assets/images/slide2.png';
import BreadCrumb from '../../../../../common/components/BreadCrumb';
import avatar_url from '../../../../../assets/images/Bitmap.png';
import logo1 from '../../../../../assets/images/logo1.png';
import logo2 from '../../../../../assets/images/logo2.png';
import logo3 from '../../../../../assets/images/logo3.png';
import { Link } from 'react-router-dom';

export default class CreatePostCardMessage extends React.Component {

  render() {
    return (
      <div className="createRoarPage createPostcardMessage">
        <NavBar/>
        <div className="banner">
          <div className="content">
            <h1><p>Select sent&nbsp;<br/>Postcard</p></h1>
          </div>
          <img src={Banner} alt="Banner"/>
        </div>
        <div className="content_container">
          <BreadCrumb url={this.props.location.pathname} selected="1"/>
        </div>
        <div className="mainpart">
          <div className="content_container">
            <div className="content">
              <div className="leftpart">
                <h3>Billions<br/>not millions</h3>
                <p><i>By Artist Full Name</i></p>
                <ul className="steps">
                  <li className="selected">01 Write message</li>
                  <li>02 Choose personal image</li>
                  <li>03 choose background color</li>
                </ul>
                <div className="yellowbutton grey desktop">Next step</div>
              </div>
              <div className="rightpart">
                <div className="userinfo">
                  <div className="userinfo_top">
                    <div className="avatar_part">
                      <div className="avatar"></div>
                    </div>
                    <div className="userinfo1"></div>
                    <div className="userinfo2"></div>
                  </div>
                  <div className="userinfo_bottom">
                    <p><b>BIG PHARMA</b> owes our communities <b>BILLIONS</b> in reparations to fix</p>
                    <p>the tragedy they created. We need significant public-health resources</p>
                    <p>to turn the tide on the opioid crisis. Do not accept anything less!</p>
                    <h3><b>BILLIONS</b> NOT MILLIONS</h3>
                  </div>
                </div>
                <div className = "content_container">
                  <BreadCrumb url={this.props.location.pathname} selected="1" />
                </div>
                <div className = "mainpart">
                  <div className = "content_container">
                    <div className = "content">
                      <div className = "leftpart">
                        <h3>Billions<br />not millions</h3>
                        <p><i>By Artist Full Name</i></p>
                        <ul className = "steps">
                          <li className = "selected">01 Write message</li>
                          <li>02 Choose personal image</li>
                          <li>03 choose background color</li>
                        </ul>
                        <Link to = "/create/image"><div className = "yellowbutton grey desktop">Next step</div></Link>
                      </div>
                      <div className = "rightpart">
                        <div className = "userinfo">
                          <div className = "userinfo_top">
                            <div className = "avatar_part"><div className = "avatar"></div></div>
                            <div className = "userinfo1"></div>
                            <div className = "userinfo2"></div>
                          </div>
                          <div className = "userinfo_bottom">
                            <p><b>BIG PHARMA</b> owes our communities <b>BILLIONS</b> in reparations to fix</p>
                            <p>the tragedy they created. We need significant public-health resources</p>
                            <p>to turn the tide on the opioid crisis. Do not accept anything less!</p>
                            <h3><b>BILLIONS</b> NOT MILLIONS</h3>
                          </div>
                        </div>
                        <div className = "assets_container">
                          <div className = "avatar">
                            <img src = {avatar_url} alt = "Avatar" height = "44.5" />
                          </div>
                          <div className = "rectangle"></div>
                          <div className = "logos">
                            <img src = {logo1} height = "16.7" alt = "Logo1" />
                            <img src = {logo2} height = "19.3" alt = "Logo2" />
                            <img src = {logo3} height = "19.3" alt = "Logo3" />
                          </div>
                        </div>
                        <div className = "clear"></div>
                      </div>
                      <div className = "centerpart">
                        <textarea placeholder = "Click here to start writing your story or message within about 700 characters or 100 words."></textarea>
                      </div>
                      <Link to = "/create/image"><div className = "yellowbutton grey mobile">Next step</div></Link>
                    </div>
                    <div className = "clear"></div>
                  </div>
                </div>
                <div className="clear"></div>
              </div>
              <div className="centerpart">
                <textarea
                  placeholder="Click here to start writing your story or message within about 700 characters or 100 words."></textarea>
              </div>
              <div className="yellowbutton grey mobile">Next step</div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </div>
    );
  }
}
