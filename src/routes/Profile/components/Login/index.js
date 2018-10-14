import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {loginUser} from '../../../../common/actions/userManagement';
import RenderField from '../../../../common/components/Form/RenderField';

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  isError: PropTypes.bool.isRequired
};


/**
 * Login for the Modal Component
 *
 * @class Login
 */
function Login({loginUser, user, isError}) {
  return (
    <div>
      <Field
        type='text'
        label='email'
        name='email'
        placeholder='you@yourdomain.com'
        component={RenderField}
      />
      <Field
        type='password'
        label='password'
        name='password'
        component={RenderField}
      />
      <div className = "yellowbutton"
        onClick={_.partial(loginUser, user)}
      >
      Sign In
      </div>
      {isError && <p className="error">There was an error submitting your login, please try again</p>}
    </div>
  );
}

/** @inheritdoc */
function mapStateToProps(state, /**, ownProps*/) {
  return {
    user: _.get(state, 'form.login.values', ''),
    isError: _.get(state, 'user.error', false)
  };
}


Login = connect(mapStateToProps, {loginUser})(Login); //eslint-disable-line

export default reduxForm({
  form: 'login',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true
})(Login);
