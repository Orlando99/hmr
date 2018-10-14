import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
// import User_Icon from '../../assets/images/static.png';
import Close_Icon from '../../assets/images/cross_white.svg';
import {connect} from 'react-redux';
import './style/index.css';
// import _ from 'lodash';
import {modalClose, modalOpen} from '../actions/modal';

class MobileMenu extends React.Component {

  /** @inheritdoc */
  static propTypes = {
    user: PropTypes.object,
    modal: PropTypes.object,
    modalOpen: PropTypes.func,
    modalClose: PropTypes.func
  };

  state = {
    isLogin: true
  }

  componentDidMount(){
    document.getElementsByClassName('bottom_part')[0].parentElement.style.display = "none";
  }

  componentWillUnmount(){
    document.getElementsByClassName('bottom_part')[0].parentElement.style.display = "block";
  }

  toggleModal = () => {
    const {modal, modalOpen, modalClose} = this.props;
    modal.isOpen
      ? modalClose()
      : modalOpen();
  };

  handleToggleModal = (e) => {
    e.preventDefault();
    this.toggleModal();
  };

  render() {
    // const {user} = this.props;
    return (
      <div className='mobileMenu'>
        {this.props.match.params.url !== undefined &&
        <NavLink to={'/' + this.props.match.params.url}><img src={Close_Icon} alt="Close" className="close_icon" onClick={this.hideMenu} /></NavLink>
        }
        {this.props.match.params.url === undefined &&
        <NavLink to='/'><img src={Close_Icon} alt="Close" className="close_icon" onClick={this.hideMenu} /></NavLink>
        }
        <ul>
          <li><NavLink exact activeClassName="current" to="/partners">Partners</NavLink></li>
          <li><NavLink exact activeClassName="current" to="/select-roar-type">Create a Roar</NavLink></li>
          <li><NavLink exact activeClassName="current" to="/wall-of-cards">Wall of Cards</NavLink></li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state /**, ownProps */) {
  const {user, modal} = state;
  return {
    user,
    modal
  };
}

export default connect(mapStateToProps, {modalClose, modalOpen})(MobileMenu);
