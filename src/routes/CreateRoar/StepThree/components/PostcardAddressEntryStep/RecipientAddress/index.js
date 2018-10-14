/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import RenderField from '../../../../../../common/components/Form/RenderField';
import _ from 'lodash';
import './index.css';
// import numeral from 'numeral';
import { calculatePrice } from '../../../../../../lib/calculatePrice';
import { grabSelectedRecipientKeys } from '../../../../../../lib/grabSelectedRecipientKeys';
import { generateHash } from '../../../../../../lib/generateHash';


class RecipientAddress extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    postCardForm: PropTypes.object,
    fetchAddress: PropTypes.func,
    subStep: PropTypes.object,
    addressFetchError: PropTypes.bool,
    lastFetchedAddressHash: PropTypes.number
  };

  componentDidMount () {
    const {
      postCardForm,
      fetchAddress,
      lastFetchedAddressHash,
      addressFetchError
    } = this.props;
    const addressStreet = _.get(postCardForm, 'values.streetAddress');
    const city = _.get(postCardForm, 'values.city');
    const state = _.get(postCardForm, 'values.state');
    const zip = _.get(postCardForm, 'values.zip');
    const address = {
      addressStreet,
      city,
      state,
      zip
    };

    const singleStringAddress = `${addressStreet} ${city} ${state} ${zip}`;
    const newAddressHash = generateHash(singleStringAddress);
    if(lastFetchedAddressHash !== newAddressHash) {
      fetchAddress(address);
    }
  }

  render() {
    const {
      handleSubmit,
      subStep,
      postCardForm,
      addressFetchError
    } = this.props;
    const addresses = _.get(subStep, 'addresses', []);
    const recipientsPreProcess = _.get(postCardForm, 'values.recipients', false);
    const selectedRecipients = grabSelectedRecipientKeys(recipientsPreProcess); // .keys(_.pickBy(postCardForm, 'values.recipients', _.identity));
    return (
      <form onSubmit={handleSubmit} className='hmr-recipient-address-container'>
        <div className='address-list'>
          {!addressFetchError && <h3>Please select destinations for your card. (Each card is $2.00 or save with a full set of six cards for $10.00.) This charge covers the addressing, stamping, printing and mailing of your cards to your elected officials plus sustains our ongoing advocacy and outreach programming for this campaign.</h3>}
          {addressFetchError &&
            <h3>Whoops! Your address is invalid. Please return to enter a valid address.</h3>
          }
          {addresses && addresses.map((address, key) => (
            <div className='hmr-address-row' key={key}>
              <div className='checkbox-container'>
                <Field
                  type="price-checkbox"
                  name={`recipients.${key}`}
                  component={RenderField}
                  price={2.00}
                />
              </div>
              <div className='address'>
                <p className='address-line'>{address.officialInfo.fullName}</p>
                <p className='address-line'>{address.officialInfo.address[0].line1}</p>
                {_.get(address, 'officialInfo.address[0].line2') &&
                  <p className='address-line'>{address.officialInfo.address[0].line2}</p>
                }
                <p className='address-line'>{`${address.officialInfo.address[0].city}, ${address.officialInfo.address[0].state} ${address.officialInfo.address[0].zip}`}</p>
              </div>
            </div>
          ))}
        </div>
        {!addressFetchError &&
        <div className='postcard-summary'>
          <div className='amount'><span># Cards: </span>{`${selectedRecipients.length}`}</div>
          <div className='total-price'><span>Total Price:</span> {`${calculatePrice(selectedRecipients, 'dollar-value')}`}</div>
          <div className='clear'></div>
        </div>}
      </form>
    );
  }
}

export default reduxForm({
  form: 'postcard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true
})(RecipientAddress);
