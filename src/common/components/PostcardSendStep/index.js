import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import _ from 'lodash';

import RenderField from '../Form/RenderField';

/**
 *
 * @param {string} input the user input to validate
 *
 * @return {boolean} if the user input meets our criteria
 */
function validatePostCardText(input) {
  if ((_.get(input, 'length', 0) >= 700)) {
    return 'Message is too long';
  } else if (_.get(input, 'length', 0) <= 100) {
    return 'Message is too short';
  } else {
    return undefined;
  }
}

class PostcardSendStep extends React.Component {

  static propTypes = {
    step: PropTypes.object,
    /** The function fired onSubmit */
    handleSubmit: PropTypes.func,
    /** The Textarea placeholder text */
    placeholder: PropTypes.string
  };

  /** @inheritdoc */
  render() {
    const {
      step,
      handleSubmit,
      placeholder
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name='cardText'
          type='textarea'
          validate={validatePostCardText}
          component={RenderField}
          placeholder={placeholder}
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
})(PostcardSendStep);
