import React from "react";
import PropTypes from "prop-types";

import NavBar from "../../NavBar";
import BreadCrumb from "../../BreadCrumb";

primaryLayout.propTypes = {
  /** The component to pass the Layout to */
  Component: PropTypes.element.isRequired
};

/**
 * This is in an incomplete state.  While copy pasting Layout Code isn't
 * what I want to do I need to get something out there.
 *
 * Finishing this component and using it will be a refactor task.
 */

/**
 * Higher Order Layout Component
 *
 * @param {*} param0
 *
 * @class primaryLayout
 */
function primaryLayout({Component}) {
  /**
   * HTML is taken from ArtworkDetailView which isn't the right layout I should grab
   */
  return (
    <div className="createRoarPage artworkDetail">
      <NavBar/>
      <div className="banner">
        <div className="content">
          <h1><p>Select postcard&nbsp;<br/>artwork</p></h1>
        </div>
        <img src={Banner} alt="Banner"/>
      </div>
      <div className="content_container">
        <BreadCrumb url={this.props.location.pathname}/>
      </div>
      <div className="postcard_detail">
        <div className="content">
          <h3>Rembrandt Harmenszoon van Rijn</h3>
          <Link to="/create/artwork"><img src={Cross_Icon} alt="Cross" className="cross"/></Link>
          <div className="imagepart"><img src={this.props.postcard.template.details.artwork.url} alt="Postcard"/></div>
          <p><b>“The Storm on the Sea of Galilee”</b> is a 1633 painting by Rembrandt. The painting was stolen from<br/>the
            Isabella Stewart Gardner Museum in Boston in 1990 and has not yet been recovered.</p>
        </div>

        <div className="content_mobile">
          <div className="rightpart">
            <div className="partcontent">
              <div className="content_flip">
                <div className="frontside"><img src={this.props.postcard.template.details.artwork.url} alt="Postcard"
                                                id="frontside_img"/></div>
                <div className="backside"></div>
              </div>
              <Link to="/create/artwork"><label className="left">CHANGE POSTCARD ARTWORK</label></Link>
              <label className="right" onClick={this.flipcard}>Flip POSTCARD</label>
            </div>
          </div>
          <div className="leftpart">
            <div className="partcontent">
              <h3>Billions<br/>not millions</h3>
              <p><i>Sent by Full Name on date sent</i></p>
              <p><b>Next Step:</b><br/>Add your name in support of this story or jump ahead to Sending.</p>
              <p className="last">Regular Size Postcard: 6” x 4.25”:<br/>1 for <b>$1.50</b><br/>3+ for <b>$2.00</b></p>
              <div className="yellowbutton">Add your name</div>
              <div className="yellowbutton">Send as is</div>
            </div>
          </div>
          <div className="clear"></div>
        </div>
      </div>
    </div>
  );
}


export default Primary;
