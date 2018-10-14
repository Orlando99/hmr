import React from 'react';
import PropTypes from 'prop-types';
import SenderAddress from './SenderAddress/index';
// import CreateAccount from './CreateAccount/index';
import RecipientAddress from './RecipientAddress/index';
import Icon from '../../../../../common/components/Icon';
import './index.css';

class AddressEntryStep extends React.Component {

  static propTypes = {
    subStep: PropTypes.object,
    subStepIndex: PropTypes.number,
    handleSubmit: PropTypes.func,
    postCardForm: PropTypes.object,
    fetchAddress: PropTypes.func,
    isLoading: PropTypes.bool.isRequired,
    personalImageUrl: PropTypes.string,
    registerUser: PropTypes.func,
    uploadPhoto: PropTypes.func,
    removeImage: PropTypes.func,
    addressFetchError: PropTypes.bool
  };

  render() {
    const {
      subStep,
      subStepIndex,
      handleSubmit,
      postCardForm,
      fetchAddress,
      isLoading,
      lastFetchedAddressHash,
      addressFetchError
    } = this.props;
    return (
      <div>
        {subStepIndex === 0 &&
          <SenderAddress
            subStep={subStep}
            handleSubmit={handleSubmit}
          />
        }
        {
          isLoading
            ? (
              <div className="loading-container">
                <Icon className="spin" name="spinner spin fa-2x"/>
              </div>

            )
            : (
              subStepIndex === 1 &&
                <RecipientAddress
                  postCardForm={postCardForm}
                  subStep={subStep}
                  handleSubmit={handleSubmit}
                  fetchAddress={fetchAddress}
                  lastFetchedAddressHash={lastFetchedAddressHash}
                  addressFetchError={addressFetchError}
                />

            )
        }
      </div>
    );
  }
}

export default AddressEntryStep;
