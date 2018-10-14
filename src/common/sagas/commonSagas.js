import _ from 'lodash';
import {
  modalClose
} from '../actions/modal';

import {
  REGISTER_USER,
  UPLOAD_PHOTO,
  LOGIN_USER,
  RESET_ROAR_FLOW
} from '../constants';
import {call, put, takeLatest} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { reset } from 'redux-form';
import {
  registerUserSuccess,
  uploadPhotoSuccess,
  uploadPhotoFailure,
  loginUserSuccess,
  loginUserFailure,
  registerUserFailure,
} from '../actions/userManagement';


const createCommonSagas = (api) => {

  function * registerUser(action) {

    try {
      const { user } = action.payload;
      const response = yield call(api.registerUser, {
        email: user.email,
        password: user.password,
        profileImageUrl: _.get(user, 'profileImageUrl', '')
      });

      const newUser = response.data.user;
      yield put(modalClose());
      yield put(registerUserSuccess({newUser}));
    } catch (error) {
      yield put(registerUserFailure(error));
    }
  }

  function * watchRegisterUser() {
    yield takeLatest(REGISTER_USER, registerUser);
  }

  function * uploadPhoto(action) {
    const { photo, uploadDestination, pixelCrop } = action.payload;
    try {
      const response = yield call(api.uploadFile, {photo, pixelCrop});
      if(response.data && response.data.s3Url){
        const s3Url = response.data.s3Url;
        yield put(uploadPhotoSuccess({s3Url, uploadDestination}));
      }
    } catch(error) {
      yield put(uploadPhotoFailure({error}));
    }
  }

  function * watchUploadPhoto() {
    yield takeLatest(UPLOAD_PHOTO, uploadPhoto);
  }

  function* watchLoginUser() {
    yield takeLatest(LOGIN_USER, loginUser);
  }

  function* loginUser(action) {
    const {email, password} = action.payload;
    try {
      const response = yield call(api.loginUser, {email, password});
      const {user} = response.data;
      yield put(modalClose());
      yield put(loginUserSuccess({user}));
    } catch(error) {
      yield put(loginUserFailure({error}));
    }
  }

  function * resetRoarFlow(action) {
    const {dataOnly} = action.payload;
    yield put(reset('postcard'));
    if(!dataOnly) {
      yield put(push('/select-roar-type'));
    }
  }

  function * watchResetRoarFlow() {
    yield takeLatest(RESET_ROAR_FLOW, resetRoarFlow);
  }

  return {
    watchRegisterUser,
    watchUploadPhoto,
    watchResetRoarFlow,
    watchLoginUser
  };
};

export default createCommonSagas;
