import {FETCH_ADDRESS} from './constants';
import {call, put, takeLatest} from 'redux-saga/effects';

import {
  fetchAddressSuccess,
  fetchAddressFailure
} from './actions';

const createStepThreeSagas = (api) => {

  function * fetchAddresses(action) {
    const { address } = action.payload;
    const senderAddress = {
      addressStreet: address.addressStreet,
      city: address.city,
      state: address.state,
      zip: address.zip
    };
    try {
      const response = yield call(api.addressLookup, senderAddress);
      console.log('response is', response);
      const addresses = response.data;
      yield put(fetchAddressSuccess({addresses, senderAddress}));
    } catch (error) {
      console.log('error resp', error.response); // error.response.status - 400
      const senderAddressFailed = senderAddress;
      yield put(fetchAddressFailure({error, senderAddressFailed}));
    }

  }

  function * watchFetchAddresses() {
    yield takeLatest(FETCH_ADDRESS, fetchAddresses);
  }

  return {
    watchFetchAddresses
  };
};

export default createStepThreeSagas;
