
import {
  RETURNING_USER,
} from './constants';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER_SUCCESS
} from '../../../common/constants';

import {saveLocalStorage} from '../../../lib/localStorage';

const defaultState = {
  loggedIn: false,
  isLoading: false,
  error: false
};

export default (state=defaultState, action) => {
  switch(action.type) {
  case RETURNING_USER:
    return {
      ...state,
      loggedIn: true
    };
  case LOGIN_USER:
    return {
      ...state,
      isLoading: true,
      error: false
    };
  case LOGIN_USER_SUCCESS:
    saveLocalStorage('hmrToken', action.payload.user.token);
    saveLocalStorage('hmrUserId', action.payload.user.id);
    return {
      ...state,
      isLoading: false,
      loggedIn: true,
      error: false
    };

  case LOGIN_USER_FAILURE:
    return {
      ...state,
      error: action.payload.error,
      isLoading: false
    };
  case REGISTER_USER_SUCCESS:
    saveLocalStorage('hmrToken', action.payload.newUser.token);
    saveLocalStorage('hmrUserId', action.payload.newUser.id);
    return {
      ...state,
      isLoading: false,
      loggedIn: true,
      error: false
    };
  default:
    return {...state};
  }
};
