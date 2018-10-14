import React from 'react';
// import PropTypes from 'prop-types';
import NavBar from '../../../common/components/NavBar';
import Banner from '../../../assets/images/slide2.png';
import uuid from 'uuid/v4';
import meta from './meta';
About.propTypes = {
};
/**
 * @class About
 */
function About() {
  return (
    <div className="createRoarPage createPostcardMessage static">
      <NavBar/>
      <div className="banner">
        <div className="content">
          <h1><p>About&nbsp;<br/></p></h1>
        </div>
        <img src={Banner} alt="Banner"/>
      </div>
      <div className="mainpart">
        <div className="content_container">
          <div className="content">
            <h1>What is <b>#Billions</b>NotMillions</h1>
            <div>
              <p>Since the year 2000, deaths from prescription opioids have more than quadrupled; more than 500,000 American lives have been cut short. With this staggering death toll, President Trump declared the opioid crisis a “national public health emergency.”</p>
              <p>But, now, the real work begins. And we need your help.</p>
              <p>Many states have introduced “opioid stewardship fee” bills and more than 400 cities, towns, states, hospitals, labor unions, and Native American tribes have filed lawsuits against opioid manufacturers and distributors for their roles in creating this crisis. These measures are a direct way to hold accountable opioid profiteers for deceptively pouring enormous volumes of narcotics into America, and direct desperately-needed funds to communities to address the problem.</p>
              <p>The path to ending our nation’s opioid crisis requires significant financial resources communities and governments do not have available. Opioid manufacturers and distributors can never fully repay the losses in your community, but they must provide substantial financial relief.</p>
              <p>If you believe big pharma owes billions — not millions — in reparations, stand with us today.</p>
            </div>
            <h1>Hear My Roar</h1>
            {
              meta.map(metaItem => {
                return (
                  <div key={uuid()}>
                    <h2>{metaItem.header}</h2>
                    <p>{metaItem.content}</p>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
export default About;
