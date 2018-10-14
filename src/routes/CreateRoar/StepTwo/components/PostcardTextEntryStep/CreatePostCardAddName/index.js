import React from 'react';
import _ from 'lodash';
import './index.css';
import RenderField from '../../../../../../common/components/Form/RenderField';
import {Field, reduxForm} from 'redux-form';

function validatePostCardAddName(input) {
  if ((_.get(input, 'length', 0) >= 75)) {
    return 'Message is too long';
  } else {
    return undefined;
  }
}

const upperLimit = (value) => {
  return value && value.substring(0,75);
}

/**
 * @class CreatePostCardBackground
 */
class CreatePostCardAddName extends React.Component {
  render(){
    return(
      <form initialValues={{addName: ''}} className='isReSend'>
        <Field
          name='addName'
          type='textarea'
          validate={validatePostCardAddName}
          component={RenderField}
          placeholder='Add a brief personal note (up to 75 characters, or approximately 15 words.).  For example: I’m sending this card in honor of John who I knew since he was a child.'
          maxlength='75'
          normalize={upperLimit}
        />
      </form>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    initialValues: {
      addName: ownProps.addName || ''
    }
  };
}

export default reduxForm({
  form: 'postcard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true
}, mapStateToProps)(CreatePostCardAddName);
