import {
  FETCH_MY_ROARS,
  FETCH_MY_ROARS_FAILURE,
  FETCH_MY_ROARS_SUCCESS
} from '../modules/constants';
import _ from 'lodash';

const defaultState = {
  roars: [],
  offset: 0,
  limit: 9,
  isLoading: false,
  error: null,
  page: 0
};

const dedupeRoars = (roars) => {
  return _.uniqBy(roars, '_id');
};

export default (state=defaultState, action) => {
  // console.log(action);
  switch(action.type) {
  case FETCH_MY_ROARS:
    return {
      ...state,
      isLoading: true,
      error: false
    };
  case FETCH_MY_ROARS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      roars: state.roars.concat(dedupeRoars(action.payload.roars)),
      page: action.payload.offset,
      count: action.payload.count,
      error: false
    };
  case FETCH_MY_ROARS_FAILURE:
    return {
      ...state,
      isLoading: false,
      roars: [],
      page: action.payload.page,
      error: action.payload.error
    };
  default:
    return {...state};
  }
};
