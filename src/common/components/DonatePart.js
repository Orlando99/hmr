import React from 'react';
import FedupLogo from '../../assets/images/FedupLogo.png';
import FawnLogo from '../../assets/images/FawnLogo.png';
import '../../routes/CreateRoar/style/index.css';

export default class DonatePart extends React.Component {
  render() {
    return (
      <div className="donatePart home_content">
        <div className="content_container">
          <div className="content">
            <div className="leftpart">
              <h1 className="title">Donate</h1>
              <p>Would you like to donate directly to our<br/>founding partners to further their missions?</p>
            </div>
            <div className="rightpart">
              <ul>
                <li>
                  <img src={FedupLogo} alt="FedUp" />
                  <a href='https://feduprally.org/donate/' target='_blank' rel='noreferrer noopener'><div className="yellowbutton">Donate</div></a>
                </li>
                <li>
                  <img src={FawnLogo} alt="Fawn" />
                  <a href='https://www.facingaddiction.org/donate' target='_blank' rel='noreferrer noopener'><div className="yellowbutton">Donate</div></a>
                </li>
              </ul>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </div>
    );
  }
}
