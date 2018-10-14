import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
// import _ from 'lodash';
import Logo from '../../assets/images/logo.svg';
import Logo_mobile from '../../assets/images/logo_mobile.png';
import Speaker_Img from '../../assets/images/speaker.png';
// import User_Icon from '../../assets/images/user_icon.svg';
// import Modal from 'react-responsive-modal';
import Login from '../../routes/Profile/components/Login';
import Forgot from '../../routes/Profile/components/Forgot';
import Register from '../../routes/Profile/components/Register';
import {connect} from 'react-redux';
import {modalClose, modalOpen} from '../actions/modal';
// import classnames from 'classnames';

class NavBar extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    modal: PropTypes.object,
    modalOpen: PropTypes.func,
    modalClose: PropTypes.func
  }

  state = {
    isLogin: true,
    modalType: 'login'
  }

  toggleModal = () => {
    const {modal, modalOpen, modalClose} = this.props;
    modal.isOpen
      ? modalClose()
      : modalOpen();
  }

  onSelectModalType = (type) => {
    this.setState({
      modalType: type
    });
  }

  handleToggleModal = (e) => {
    e.preventDefault();
    this.toggleModal();
  }

  renderModalContent = () => {
    switch (this.state.modalType) { // eslint-disable-line
    case 'login':
      return (
        <Login />
      );
    case 'register':
      return (
        <Register />
      );
    case 'forgot':
      return (
        <Forgot />
      );
    }
  }

  onClose = () => {
    this.setState({
      isModalOpen: false
    });
  }
  /** @inheritdoc */
  render() {
    return (
      <div className="navBar">
        <div className="logo">
          <NavLink to="/"><img src={Logo} alt="Logo"/></NavLink>
        </div>
        <NavLink to="/">
          <div className="logo_mobile">
            <img src={Speaker_Img} height="35" alt="Speaker"/>
            <img src={Logo_mobile} height="35" alt="Logo Mobile"/>
          </div>
        </NavLink>
        <NavLink to={'/mobileNav/'+window.location.href.substring(window.location.href.lastIndexOf('/')+1)}><div className="menu_bars">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div></NavLink>
        <div className="menu">
          <div>
            <a href="https://www.morehearmyroar.org/" target="_blank" rel="noopener noreferrer">Partners</a>
            <NavLink exact activeClassName="current" to="/select-roar-type">Create a Card</NavLink>
            <NavLink exact activeClassName="current" to="/wall-of-cards">Wall of Cards</NavLink>
          </div>
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

/** @inheritdoc */
function mapStateToProps(state /**, ownProps */) {
  const {user, modal} = state;
  return {
    user,
    modal
  };
}

export default connect(mapStateToProps, {modalClose, modalOpen})(NavBar);
