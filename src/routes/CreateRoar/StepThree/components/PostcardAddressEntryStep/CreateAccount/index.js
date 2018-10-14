import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
// import Dropzone from 'react-dropzone';
// import classNames from 'classnames';
import RenderField from '../../../../../../common/components/Form/RenderField';
// import Desktop_User from '../../../../../../assets/images/userpic/desktop.svg';
// import Mobile_User from '../../../../../../assets/images/userpic/mobile.svg';
import './index.css';
import _ from 'lodash';

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


class CreateAccount extends React.Component {

  static propTypes = {
    /** The handle submit function */
    handleSubmit: PropTypes.func.isRequired,
    /** the postCard Form */
    postCardForm: PropTypes.object.isRequired,
    uploadPhoto: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      preview: false,
      errors: { // TODO THIS SHOULD LIVE IN PROPS
        photo: false
      }
    };
  }

  handleFileUpload = (file) => {

    const {
      change,
      uploadPhoto
    } = this.props;
    const filePreview = _.get(file, '0.preview', false);
    if(filePreview) {
      this.setState({
        preview: filePreview
      });
      change('usePersonalImageForProfile', false);
      uploadPhoto({photo: file[0], uploadDestination: 'profile'});
    }
  }

  validatePasswordConfirmation = () => {
    const {password, confirmPassword} = this.props.postCardForm.values;
    return password === confirmPassword ? undefined : 'Confirmation Password doesn\'t match Password';
  }

  formatImagePreview = () => {
    const {
      personalImageUrl,
      postCardForm
    } = this.props;
    const shouldUserPersonalImage = postCardForm.values.usePersonalImageForProfile;
    if(this.state.preview) {
      return {
        background: `url(${this.state.preview}) no-repeat center center fixed`,
        backgroundSize: 'cover'
      };
    }else if (personalImageUrl && shouldUserPersonalImage) {
      return {
        background: `url(${personalImageUrl}) no-repeat center center fixed`,
        backgroundSize: 'cover'
      };
    } else {
      return {};
    }
  }

  removeImageHandler = () => {
    const {
      removeImage
    } = this.props;

    this.setState({
      preview: false
    });

    removeImage({destination: 'profile'});

    if(this.state.preview){
      window.URL.revokeObjectURL(this.state.preview);
    }
  };

  /** @inheritdoc */
  render() {
    const {
      handleSubmit,
      // postCardForm,
      // personalImageUrl
    } = this.props;
    // let dropzoneRef;
    // const shouldUserPersonalImage = postCardForm.values.usePersonalImageForProfile;
    return (
      <form onSubmit={handleSubmit} className='createAccount'>
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
      </form>
    );
  }
}

export default reduxForm({
  form: 'postcard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true
})(CreateAccount);
