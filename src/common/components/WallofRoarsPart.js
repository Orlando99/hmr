import React from 'react';
import WallofRoarCarousel from '../../common/components/carousel/WallofRoarCarousel';
import {Link} from 'react-router-dom';
export default class WallofRoarsPart extends React.Component {
  render() {
    return (
      <div className="wallofroars home_content">
        <div className="content_container">
          <div className="content">
            <div className="leftpart">
              <h1 className="title">Wall of Cards</h1>
              <p>Get inspired.</p>
              <p>View cards already created by others.</p>
              <Link to="/wall-of-cards">
                <div className="yellowbutton viewAll1">
                  View all
                </div>
              </Link>
            </div>
            <div className="rightpart">
              <WallofRoarCarousel/>
              <Link to="/wall-of-cards">
                <div className="yellowbutton viewAll2">View all</div>
              </Link>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </div>
    );
  }
}
