import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import RenderField from '../../../../../../common/components/Form/RenderField';
import './index.css';


/**
 * Checks if the user supplied zipcode is valid
 *
 * @param {string} zipcode the zipcode to check is valid
 *
 * @return {undefined|string}
 */
// function validateZipCode(zipcode) {
//   return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode) ? undefined : 'please enter valid Zip Code';
// }

/**
 * Check if the user supplied firstName is valid
 *
 * @param {string} firstName
 *
 * @return {undefined|string}
 */
function validateName(firstName) {
  return /^[a-z ,.'-]+$/i.test(firstName) ? undefined : 'Please Enter a Valid Name';
}

const upperLimit = (value) => {
  return value && value.substring(0,5);
};

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email)
    ? undefined
    : undefined; //'Please Enter A Valid Email Address';
}
// /**
//  * Check if the user supplied firstName is valid
//  *
//  * @param {string} streetName
//  *
//  * @return {undefined|string}
//  */
// function validateStreetName(streetName) {
//   return /^\s*\S+(?:\s+\S+){2}/.test(streetName) ? undefined : 'Please Enter a valid Street Address';
// }
//
// /**
//  * Check if the user supplied firstName is valid
//  *
//  * @param {string} cityName
//  *
//  * @return {undefined|string}
//  */
// function validateCity(cityName) {
//   return /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/g.test(cityName) ? undefined : 'Please Enter a valid City';
// }

class SenderAddress extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func
  };

  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit} className='senderAddress'>
        <Field
          name="firstName"
          type="text"
          component={RenderField}
          label="First Name"
          validate={validateName}
        />
        <Field
          name="lastName"
          type="text"
          component={RenderField}
          label="Last Name"
          validate={validateName}
        />
        <Field
          name="senderEmail"
          type="text"
          component={RenderField}
          label="E-Mail"
          validate={validateEmail}
        />
        <Field
          name="streetAddress"
          type="text"
          component={RenderField}
          label="Street Address"
        />
        <Field
          name="city"
          type="text"
          component={RenderField}
          label="City"
          className="cityField"
        />
        <Field
          name="state"
          type="select"
          component={RenderField}
          label="State"
          className="stateField"
        />
        <div className="clear"></div>
        <Field
          name="zip"
          type="text"
          component={RenderField}
          label="Zipcode"
          normalize={upperLimit}
        />
      </form>
    );
  }
}

export default reduxForm({
  form: 'postcard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true
})(SenderAddress);
