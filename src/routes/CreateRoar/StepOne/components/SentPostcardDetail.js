import React from 'react';
import NavBar from '../../../../common/components/NavBar';
import Banner from '../../../../assets/images/slide2.png';
import BreadCrumb from '../../../../common/components/BreadCrumb';
import {Link} from 'react-router-dom';
import _ from 'lodash';

export default class SendPostCardDetail extends React.Component {
  constructor(props) {
    super(props);
    this.flipcard = this.flipcard.bind(this);
  }

  flipcard() {
    if (document.getElementsByClassName("partcontent")[0].classList.contains('flip'))
      document.getElementsByClassName("partcontent")[0].classList.remove('flip');
    else
      document.getElementsByClassName("partcontent")[0].classList.add('flip');
  }

  componentDidMount() {
    const {
      match,
      selectRoar
    } = this.props;

    selectRoar({roarId: match.params.id});
  }

  componentDidUpdate() {
    if (document.getElementById("frontside_img") !== null) {
      if (document.getElementsByClassName("partcontent")[0] !== undefined) {
        if (document.getElementsByClassName("backside")[0] !== undefined) {
          document.getElementById("frontside_img").style.width = document.getElementsByClassName("partcontent")[0].offsetWidth + "px";
          const img_height = document.getElementById("frontside_img").naturalHeight * document.getElementsByClassName("partcontent")[0].offsetWidth / document.getElementById("frontside_img").naturalWidth;
          document.getElementsByClassName("partcontent")[0].parentElement.style.height = img_height + "px";
          document.getElementsByClassName("backside")[0].style.width = document.getElementsByClassName("partcontent")[0].offsetWidth + "px";
          document.getElementsByClassName("backside")[0].style.height = img_height + "px";
          document.getElementsByClassName("backside")[0].parentElement.style.width = document.getElementsByClassName("partcontent")[0].offsetWidth + "px";
          document.getElementsByClassName("backside")[0].parentElement.style.height = img_height + "px";
        }
      }
    }
  }

  handleBackBtn = () => {
    window.location.href = '/create/sent';
  };

  render() {
    const {
      selectedPastRoar,
      selectRoarAndSave,
      location,
      resetRoarFlow
    } = this.props;
    if (!selectedPastRoar) {
      return (
        <div className="createRoarPage sentPostcardDetail">
          <NavBar/>
          <div className="banner">
            <div className="content">
              <h1><p>Select sent&nbsp;<br/>Postcard</p></h1>
            </div>
            <img src={Banner} alt="Banner"/>
          </div>
          <div className="content_container">
            <BreadCrumb
              url={location.pathname}
              step={0}
              resetRoarFlow={resetRoarFlow}
              navigateBack={this.handleBackBtn}
            />
          </div>
          <div className="postcard_detail">
            <div className='past-roar-error'>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="createRoarPage sentPostcardDetail">
          <NavBar/>
          <div className="banner">
            <div className="content">
              <h1><p>Select sent&nbsp;<br/>Postcard</p></h1>
            </div>
            <img src={Banner} alt="Banner"/>
          </div>
          <div className="content_container">
            <BreadCrumb
              url={location.pathname}
              step={0}
              resetRoarFlow={resetRoarFlow}
              stepOneCopy='Select Card'
              navigateBack={this.handleBackBtn}
            />
          </div>
          <div className="postcard_detail">
            <div className="content">
              <div className="rightpart">
                <div className="partcontent flip">
                  <div className="content_flip">
                    <div className="frontside">
                      <img src={selectedPastRoar.template.details.artwork.url} alt="Postcard" id="frontside_img"/>
                    </div>
                    <div className="backside">{_.get(selectedPastRoar, 'artifacts.png.front', false) && <img src={selectedPastRoar.artifacts.png.front} alt='roar front' />}</div>
                  </div>
                  <Link to="/create/sent"><label className="left_mobile">Adopt different postcard</label></Link>
                  {/* <label className = "left">CHANGE POSTCARD ARTWORK</label> */}
                  <label className="right" onClick={this.flipcard}>Flip POSTCARD</label>
                </div>
              </div>
              <div className="leftpart">
                <div className="partcontent">
                  <h3>Thanks for joining our #BILLIONSNOTMILLIONS roar!</h3>
                  <p><i>Sent by {selectedPastRoar.mailingInfo.sender.name}</i></p>
                  <p><b>Next Step:</b><br/>Add your name in support of this story or jump ahead to sending.</p>

                  <div onClick={() => {selectRoarAndSave({roar: selectedPastRoar, type: 'add-name'})}} className="yellowbutton">Add personal note</div>
                  <div onClick={() => {selectRoarAndSave({roar: selectedPastRoar, type: 'as-is'})}}className="yellowbutton">Send as is</div>
                </div>
              </div>
              <div className="clear"></div>
            </div>
          </div>
        </div>
      );
    }
  }
}
