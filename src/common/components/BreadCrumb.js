import React from 'react';
import uuid from 'uuid/v4';
import {Link} from 'react-router-dom';
import Start_Over from '../../assets/images/start-over.svg';
import icon_back from '../../assets/images/back.svg';
import Icon from '../components/Icon';
import PropTypes from 'prop-types';

const breadCrumbs = ['Postcard', 'Create', 'Address', 'Send'];

class BreadCrumb extends React.Component {
  static propTypes = {
    step: PropTypes.number,
    navigateBack: PropTypes.func,
    stepOneCopy: PropTypes.string
  };

  render() {
    const {
      step,
      navigateBack,
      isReSend,
      stepOneCopy
    } = this.props;
    return (
      <div className="breadcrumb content">
        <a className='breadcrumb-back-btn' onClick={navigateBack}>
          <div className="left">
            <img src={icon_back} alt="Icon Back"/>
            <span>Back</span>
          </div>
        </a>
        <div className="center">
          <ul>
            {
              breadCrumbs.map((crumb, idx) => {
                return (
                  <li
                    className={`breadcrumb_item ${step === idx ? 'selected' : ''}`}
                    key={uuid()}
                  >
                    <span>0{(idx + 1)} {idx === 0 ? (isReSend ? 'Select Card' : stepOneCopy || 'Select Art') : crumb}</span>
                    {idx < breadCrumbs.length - 1 && <Icon name="chevron-right"/> }
                  </li>
                );
              })
            }
          </ul>
        </div>
        <Link to='/select-roar-type'>
          <div className="right">
            <span>Start Over</span>
            <img src={Start_Over} alt="Start Over"/>
          </div>
        </Link>
        <div className="clear"></div>
      </div>
    );
  }
}

export default BreadCrumb;
