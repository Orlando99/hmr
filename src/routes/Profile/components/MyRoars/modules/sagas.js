import {
  FETCH_MY_ROARS,
} from './constants';

import {
  fetchMyRoarsFailure,
  fetchMyRoarsSuccess
} from './actions';


import {call, put, takeEvery} from 'redux-saga/effects';

const createMyRoarsSagas = api => {
  function* watchGetMyRoars() {
    yield takeEvery(FETCH_MY_ROARS, fetchMyRoars);
  }

  function* fetchMyRoars(action) {
    const {offset} = action.payload;
    try {
      const roars = yield call(api.myRoars, {offset});
      yield put(fetchMyRoarsSuccess({offset, roars: roars.data.roars, count: roars.data.count}));
    } catch(error) {
      yield put(fetchMyRoarsFailure(error));
    }
  }

  return {
    watchGetMyRoars
  };
};


export default createMyRoarsSagas;
