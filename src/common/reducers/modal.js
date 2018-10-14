import {
  CLOSE_MODAL,
  OPEN_MODAL
} from '../constants';

const defaultState = {isOpen: false};

export default (state=defaultState, action) => {
  switch (action.type) {
  case CLOSE_MODAL:
    return {
      ...state,
      isOpen: false
    };
  case OPEN_MODAL:
    return {
      ...state,
      isOpen: true
    };
  default:
    return {...state};
  }
};