import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {registerUser} from '../../../../common/actions/userManagement';
import RenderField from '../../../../common/components/Form/RenderField';

/**
 * Checks if the user password is valid
 *
 * @param {string} password
 *
 * @return {string|undefined}
 */
function validatePassword(password) {
  if (_.get(password, 'length', 0) <= 8) {
    return 'Passwords must be at least 8 characters in length';
  } else {
    return undefined;
  }
}

/**
 * Checks if the user email is valid
 * @param {string} email
 *
 * @return {string|undefined}
 */
function validateEmail(email) {
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)
    ? undefined
    : 'Please Enter A Valid Email Address';
}

/**
 * @class Register
 */
class Register extends React.Component {

  static propTypes = {
    register: PropTypes.object,
    registerUser: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired
  }

  /**
   * Validate password input fields
   */
  validatePasswordConfirmation = (value) => {
    const {password} = this.props.register;
    // console.log('updating pw validation', confirmPassword);
    return password === value ? undefined : 'Confirm Password doesn\'t match Password';
  }

  /** @inheritdoc */
  render() {
    const {registerUser, register, isError} = this.props;
    return (
      <React.Fragment>
        <Field
          name='email'
          type='text'
          component={RenderField}
          label='E-Mail'
          validate={validateEmail}
        />
        <Field
          name='password'
          type='password'
          component={RenderField}
          label="Password"
          validate={validatePassword}
        />
        <Field
          name='confirmPassword'
          type='password'
          component={RenderField}
          label='Confirm Password'
          validate={this.validatePasswordConfirmation}
        />
        <div className='yellowbutton'
          onClick={_.partial(registerUser, {user: register})}
        >
        Register User
        </div>
        {isError && <p className="error">A user with that e-mail already exists. Please log in or register with a different e-mail.</p>}
      </React.Fragment>
    );
  }
}

/** @inheritdoc */
function mapStateToProps(state /**, ownProps */) {
  return {
    register: _.get(state, 'form.register.values', ''),
    isError: _.get(state, 'multiSelector.globalErrors.registerUser', false)
  };
}

Register = connect(mapStateToProps, {registerUser})(Register); //eslint-disable-line


export default reduxForm({
  form: 'register',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true
})(Register);
