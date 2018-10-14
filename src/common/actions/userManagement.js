import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGGED_IN_USER,
  UPLOAD_PHOTO,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_FAILURE
} from '../constants';

export const registerUser = ({user}) => {
  return {
    type: REGISTER_USER,
    payload: {user}
  };
};


export const registerUserSuccess = ({newUser}) => ({
  type: REGISTER_USER_SUCCESS,
  payload: {newUser}
});

export const registerUserFailure = ({error}) => ({
  type: REGISTER_USER_FAILURE,
  payload: {error}
});

/**
 *
 * @param {string} email the user email
 * @param {string} password the user password
 */
export const loginUser = ({email, password}) => {
  return {
    type: LOGIN_USER,
    payload: {email, password}
  };
};

/**
 * If the user has an auth token in localStorage
 * Log the user into the application
 */
export const LoggedInUser = () => {
  return {
    type: LOGGED_IN_USER
  };
};

export const loginUserSuccess = ({user}) => ({
  type: LOGIN_USER_SUCCESS,
  payload: {user}
});

export const loginUserFailure = ({error}) => ({
  type: LOGIN_USER_FAILURE,
  payload: {error}
});

export const uploadPhoto = ({photo, uploadDestination, pixelCrop}) => ({
  type: UPLOAD_PHOTO,
  payload: {photo, uploadDestination, pixelCrop}
});

export const uploadPhotoSuccess = ({s3Url, uploadDestination}) => ({
  type: UPLOAD_PHOTO_SUCCESS,
  payload: {s3Url, uploadDestination}
});

export const uploadPhotoFailure = ({error}) => ({
  type: UPLOAD_PHOTO_FAILURE,
  payload: {error}
});
