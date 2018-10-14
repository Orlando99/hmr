import {
  FETCH_MY_ROARS,
  FETCH_MY_ROARS_SUCCESS,
  FETCH_MY_ROARS_FAILURE
} from './constants';

export const fetchMyRoars = ({offset}) => {
  return {
    type: FETCH_MY_ROARS,
    payload: {offset}
  };
};

export const fetchMyRoarsSuccess = ({offset, roars, count}) => {
  return {
    type: FETCH_MY_ROARS_SUCCESS,
    payload: { offset, roars, count }
  }
};

export const fetchMyRoarsFailure = (error) => ({
  type: FETCH_MY_ROARS_FAILURE,
  payload: { error }
});
