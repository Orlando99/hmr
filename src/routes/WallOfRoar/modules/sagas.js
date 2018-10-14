import {
  FETCH_WALL_OF_ROAR,
} from './constants';

import {
  fetchWallOfRoarFailure,
  fetchWallOfRoarSuccess
} from './actions';


import {call, put, takeEvery} from 'redux-saga/effects';

const createWallOfRoarSagas = api => {
  function* watchGetWallOfRoar() {
    yield takeEvery(FETCH_WALL_OF_ROAR, fetchWallOfRoar);
  }

  function* fetchWallOfRoar(action) {
    const {
      offset,
      isNewSearch,
      searchTerm
    } = action.payload;
    try {
      const roars = yield call(api.allRoars, {
        offset: isNewSearch ? 0 : offset,
        searchTerm
      });
      yield put(fetchWallOfRoarSuccess({
        newOffset: isNewSearch ? 1 : offset + 1,
        roars: roars.data.roars,
        count: roars.data.count
      }));
    } catch(error) {
      yield put(fetchWallOfRoarFailure(error));
    }
  }

  return {
    watchGetWallOfRoar
  };
};


export default createWallOfRoarSagas;
