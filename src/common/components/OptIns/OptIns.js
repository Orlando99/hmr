import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import RenderField from '../../../common/components/Form/RenderField';
import './OptIns.css';
class OptIns extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    postCardForm: PropTypes.object,
    fetchAddress: PropTypes.func,
    subStep: PropTypes.object
  };
  render() {
    const {
      handleSubmit,
    } = this.props;
    return (
      <form onSubmit={handleSubmit} className='hmr-recipient-address-container optins'>
        <div className='row'>
          <Field
            type='checkbox'
            name='acceptedTAC'
            component={RenderField}
          />
          <div className='paragraph'>
            <h3>Terms of Agreement</h3>
            <p>By placing your order, you agree to Hear My Roar's <a href='/tcs' target='_blank'><span>Terms & Conditions</span></a> (required)</p>
          </div>
        </div>
        <div className='row'>
          <Field
            type='checkbox'
            name='isPublic'
            component={RenderField}
          />
          <div className='paragraph'>
            <h3>Share on wall of cards</h3>
            <p>Yes! Please make my postcard viewable and shareable (except for my mailing address) online and in other public spaces...to help spread the message. <b className='hmr-bold'>Only applicable to original cards, not "adopted" cards.</b></p>
          </div>
        </div>
        <div className='row'>
          <Field
            type='checkbox'
            name='fedUpNewsletter'
            component={RenderField}
          />
          <div className='paragraph'>
            <h3>Share email with FED UP!</h3>
            <p>Yes! Please share my email in order to receive updates & information from FED UP!</p>
          </div>
        </div>
        <div className='row'>
          <Field
            type='checkbox'
            name='facingAddictionNewsletter'
            component={RenderField}
          />
          <div className='paragraph'>
            <h3>Share email with Facing Addiction & NCADD</h3>
            <p>Yes! Please share my email in order to receive updates & information from FACING ADDICTION & NCADD</p>
          </div>
        </div>
        <div className='row'>
          <Field
            type='checkbox'
            name='hmrNewsletter'
            component={RenderField}
          />
          <div className='paragraph'>
            <h3>Share email with Hear My Roar</h3>
            <p>Yes! Please share my email in order to receive updates & information from HEAR MY ROAR!</p>
          </div>
        </div>
      </form>
    );
  }
}
export default reduxForm({
  form: 'postcard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true
})(OptIns);
