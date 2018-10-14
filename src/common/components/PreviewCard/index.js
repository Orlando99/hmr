/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uuid from 'uuid/v4';
import avatar_url from '../../../assets/images/Bitmap.png';
import logo1 from '../../../assets/images/logo1.png';
import logo2 from '../../../assets/images/logo2.png';
import logo3 from '../../../assets/images/logo3.png';
import FlipButton from '../FlipButton';
import _ from 'lodash';
import { grabSelectedRecipientKeys } from '../../../lib/grabSelectedRecipientKeys';
import './index.css';

PreviewCard.propTypes = {
  /** The size of the Preview Card */
  size: PropTypes.oneOf(['normal', 'large', 'x-large']).isRequired,
  /** The section to highlight in the PreviewCard */
  section: PropTypes.string.isRequired,
  classNames: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  flowdone: PropTypes.bool,
  goToStep: PropTypes.func
};

const shouldShowAvatar = (steps, step, subStep) => {
  const hasAvatar = steps[1].subSteps[1].personalImageUrl;
  let shouldShow = false;
  if(step === 1 && subStep <= 1) {
    shouldShow = true;
  } else if (step === 1 && subStep > 1 && hasAvatar){
    shouldShow = true;
  } else if (step > 1 && hasAvatar) {
    shouldShow = true;
  }
  return shouldShow;
};

/**
 * The Preview Card Component
 *
 * @class PreviewCard
 */
function PreviewCard({steps, step, subStep, size, section = 'text', flowdone, backgroundColor, classNamesPredef, postCardForm, goToStep}) {
  const postCardFormVals = _.get(postCardForm, 'values', false);
  const cardTextFromStore = _.get(steps, '1.subSteps.0.cardText', false);
  if(postCardFormVals && !postCardFormVals.cardText && cardTextFromStore) {
    postCardFormVals.cardText = cardTextFromStore;
  }
  const hasSenderAddress = postCardFormVals // eslint-disable-line
    && postCardFormVals.firstName // eslint-disable-line
    || postCardFormVals.lastName // eslint-disable-line
    || postCardFormVals.streetAddress
    || postCardFormVals.city
    || postCardFormVals.state
    || postCardFormVals.zip;
  const hasRecipientAddress = postCardFormVals.recipients && postCardFormVals.recipients.length > 0;
  // const selectedRecipients = _.keys(_.pickBy(postCardForm, 'values.recipients', _.identity));
  const selectedRecipients = grabSelectedRecipientKeys(postCardFormVals.recipients);
  const address = hasRecipientAddress && steps[2].subSteps[1].addresses[selectedRecipients[0]];
  return (
    <div id='hmr-roar-preview'
      className={classNames(
      // classNamesPredef,
        size,
        {
          'rightpart': true,
          'preview-card-outer-wrap': true,
          // 'hidden': step === 2 && subStep === 1,
          'img_selected': step === 1 && subStep === 2,
          'desktop': step === 1 && subStep === 2
        }
      )}>
      <div className="content_flip">
        <div id='hmr-roar-preview-frontside' className="frontside">
          <div className="userinfo" style={{backgroundColor: backgroundColor}}>
            <div className="userinfo_top">
              {shouldShowAvatar(steps, step, subStep) &&
              <div className="avatar_part" style={{backgroundColor: backgroundColor}}>
                <div className={`avatar ${section === 'personalImage' ? 'highlight-background' : ''}`}>
                  {steps[1].subSteps[1].personalImageUrl &&
                  <img
                    src={`${steps[1].subSteps[1].personalImageUrl}?x-request=${uuid()}`}
                    alt='personal pic'
                  />
                  }
                </div>
              </div>
              }
              <p className={`userinfo1 senderAddress ${ section === 'senderAddress' ? 'highlight-background' : ''} ${ hasSenderAddress ? 'nobg' : ''}`}>
                {hasSenderAddress &&
                  <React.Fragment>
                    <b>{`${postCardFormVals.firstName || ''} ${postCardFormVals.lastName || ''}`}</b>,
                    {` ${postCardFormVals.streetAddress || ''} ${postCardFormVals.city || ''} ${postCardFormVals.state || ''} ${postCardFormVals.zip || ''}`}
                  </React.Fragment>
                }
              </p>
              {
                (postCardFormVals.cardText !== '' || (postCardFormVals.addName !== '' && postCardFormVals.addName)) && <p className='description'>{`${postCardFormVals.addName || ''}`} {postCardFormVals.addName ? <React.Fragment><br/><br/></React.Fragment> : ''} {`${postCardFormVals.cardText || ''}`}</p>
              }
              {
                (postCardFormVals.cardText === '' && (postCardFormVals.addName === '' || !postCardFormVals.addName)) && <p className={`userinfo2 ${ section === 'text' && !postCardFormVals.cardText && !postCardFormVals.addName ? 'highlight-background' : ''}`}></p>
              }
            </div>
            <div className="userinfo_bottom">
              <p><b>BIG PHARMA</b> owes our communities <b>BILLIONS</b> in reparations to fix</p>
              <p>the tragedy they helped create. We need significant public-health resources</p>
              <p>to turn the tide on the opioid crisis. Do not accept anything less!</p>
              <h3><b>BILLIONS</b> NOT MILLIONS</h3>
            </div>
          </div>
          <div className="assets_container">
            <div className="avatar">
              <img src={`${avatar_url}`} alt="Avatar" height="44.5"/>
            </div>
            <div className={`address_part ${ !hasRecipientAddress ? 'rectangle' : ''} ${ section === 'rectangle' && !hasRecipientAddress ? 'highlight-background' : ''}`}>
              {hasRecipientAddress &&
                <React.Fragment>
                  <br/><b>{`${_.get(address, 'officialInfo.fullName', '')}`}</b>
                  <br/>{`${_.get(address, 'officialInfo.address[0].line1','')}`}
                  {_.get(address, 'officialInfo.address[0].line2') && <React.Fragment><br/>{`${_.get(address, 'officialInfo.address[0].line2','')}`}</React.Fragment>}
                  <br/>{`${_.get(address, 'officialInfo.address[0].city', '')} ${_.get(address, 'officialInfo.address[0].state','')}, ${_.get(address, 'officialInfo.address[0].zip', '')}`}
                </React.Fragment>
              }
            </div>
            <div className="logos">
              <img src={logo1} height="16.7" alt="Logo1"/>
              <img src={logo2} height="19.3" alt="Logo2"/>
              <img src={logo3} height="19.3" alt="Logo3"/>
            </div>
          </div>
          <div className='clear'></div>
        </div>
        <div className={`backside ` + steps[0].artwork.type}><img src={steps[0].artwork.url + '?x-request=${uuid()}'} /></div>
      </div>
      { step === 3 && !flowdone && <a onClick={()=> { goToStep(1, 0)}}><div className="changemsg button">Change Message</div></a> }
      <FlipButton />
    </div>
  );
}


export default PreviewCard;
