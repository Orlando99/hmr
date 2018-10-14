import {
  FETCH_ADDRESS,
  FETCH_ADDRESS_SUCCESS,
  FETCH_ADDRESS_FAILURE
} from './constants';


export const fetchAddress = (address) => ({
  type: FETCH_ADDRESS,
  payload: { address }
});

export const fetchAddressSuccess = ({addresses, senderAddress}) => ({
  type: FETCH_ADDRESS_SUCCESS,
  payload: { addresses, senderAddress }
});

export const fetchAddressFailure = ({error, senderAddressFailed}) => ({
  type: FETCH_ADDRESS_FAILURE,
  payload: { error, senderAddressFailed }
});
