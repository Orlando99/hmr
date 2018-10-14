import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import CreatePostCardBackground from './CreatePostCardBackground/index';
import CreatePostCardImage from './CreatePostCardImage/index';
import _ from 'lodash';

import RenderField from '../../../../../common/components/Form/RenderField';
import CreatePostcardAddName from './CreatePostCardAddName';

/**
 *
 * @param {string} input the user input to validate
 *
 * @return {boolean} if the user input meets our criteria
 */
function validatePostCardText(input) {
  if ((_.get(input, 'length', 0) > 550)) {
    return 'Message is too long';
  } else if (_.get(input, 'length', 0) <= 9) {
    return 'Message is too short';
  } else {
    return undefined;
  }
}

const upperLimit = (value) => {
  return value && value.substring(0,550);
}

class PostcardTextEntryStep extends React.Component {

  static propTypes = {
    subStep: PropTypes.object,
    subStepIndex: PropTypes.number,
    handleSubmit: PropTypes.func,
    placeholder: PropTypes.string,
    uploadPhoto: PropTypes.func
  };

  /** @inheritdoc */
  render() {
    const {
      // subStep,
      subStepIndex,
      handleSubmit,
      placeholder,
      uploadPhoto,
      // cardText,
      removeImage,
      isReSend,
      personalImageIsLoading,
      personalImageUrl
    } = this.props;

    if(isReSend) {
      return (
        <CreatePostcardAddName isReSend={isReSend}/>
      )
    } else {
      switch (subStepIndex) {
      case 0:
        /** Text area for the input field */
        return (
          <form onSubmit={handleSubmit}>
            <Field
              name='cardText'
              type='textarea'
              validate={validatePostCardText}
              component={RenderField}
              placeholder={placeholder}
              maxlength='550'
              normalize={upperLimit}
            />
          </form>
        );
      case 1:
        /** Image upload */
        return (
          <div>
            <CreatePostCardImage
              uploadPhoto={uploadPhoto}
              removeImage={removeImage}
              personalImageIsLoading={personalImageIsLoading}
              personalImageUrl={personalImageUrl}
            />
          </div>
        );
      case 2:
        /** Color Picker */
        return (
          <div>
            <CreatePostCardBackground />
          </div>
        );
      default:
        return (
          <div>
              :(
          </div>
        );
      }
    }

  }
}


export default reduxForm({
  form: 'postcard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(PostcardTextEntryStep);
