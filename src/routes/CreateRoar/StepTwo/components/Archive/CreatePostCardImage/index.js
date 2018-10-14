import React from 'react';
import NavBar from '../../../../../../common/components/NavBar';
import Banner from '../../../../../../assets/images/userpic/desktop.svg';
import BreadCrumb from '../../../../../../common/components/BreadCrumb';
import avatar_url from '../../../../../../assets/images/Bitmap.png';
import logo1 from '../../../../../../assets/images/logo1.png';
import logo2 from '../../../../../../assets/images/logo2.png';
import logo3 from '../../../../../../assets/images/logo3.png';
import Desktop_User from '../../../../../../assets/images/userpic/desktop.svg';
import Mobile_User from '../../../../../../assets/images/userpic/mobile.svg';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import './index.css';

export default class CreatePostCardImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: false
    };
  }

  handleFileUpload = (file) => {
    const filePreview = _.get(file, '0.preview', false);
    if(filePreview) {
      this.setState({
        preview: filePreview
      });

    }
  }

  formatImagePreview = () => {
    if(this.state.preview) {
      return {
        background: `url(${this.state.preview}) no-repeat center center fixed`,
        backgroundSize: 'cover'
      };
    }else {
      return {};
    }
  }

  render(){
    let dropzoneRef;
    return(
      <div className = "createRoarPage createPostcardMessage CreatePostcardImage">
        <NavBar />
        <div className = "banner">
          <div className = "content">
            <h1><p>Select sent&nbsp;<br/>Postcard</p></h1>
          </div>
          <img src = {Banner} alt = "Banner" />
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
                  <li>01 Write message</li>
                  <li className = "selected">02 Choose personal image</li>
                  <li>03 choose background color</li>
                </ul>
                <Link to = "/create/background"><div className = "yellowbutton desktop">Next step</div></Link>
                <Link to = "/create/background"><div className = "yellowbutton white desktop">Skip step</div></Link>
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
                <div className = "imagepart">
                  <div
                    className = "avatarpart"
                    style={this.formatImagePreview()}
                  >
                    {!this.state.preview &&
                      <React.Fragment>
                        <img src={Desktop_User} alt='User Avatar' className='desktop'/>
                        <img src={Mobile_User} alt='User Avatar' className='mobile'/>
                      </React.Fragment>
                    }

                  </div>
                  <div className = "buttons">
                    <button
                      onClick={() => { dropzoneRef.open(); }}
                      type='button'
                    >Choose image…</button>
                    <button>Remove image</button>
                  </div>
                  <div className='hide'>
                    <Dropzone
                      ref={(node) => { dropzoneRef = node; }}
                      onDrop={(accepted, rejected) => { this.handleFileUpload(accepted); }}
                      accept="image/jpeg, image/png"
                    />
                  </div>
                  <div className = "clear"></div>
                </div>
                <div className = "instruction">
                  <h3>This step is optional</h3>
                  <p>The image dimensions must be in a square aspect ratio (the height must be equal to the width). Minimum acceptable dimensions are 600 x 600 pixels. Maximum acceptable dimensions are 1200 x 1200 pixels. Please review photo requirements for specific dimensions.</p>
                </div>
              </div>
              <Link to = "/create/background"><div className = "yellowbutton mobile">Next step</div></Link>
              <Link to = "/create/message"><div className = "yellowbutton nobg mobile">Prev step</div></Link>
            </div>
            <div className = "clear"></div>
          </div>
        </div>
      </div>
    );
  }
}
