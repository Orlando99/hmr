import {
  FETCH_ARTWORK,
  FETCH_ROARS,
  SELECT_ROAR,
  SELECT_ARTWORK,
  SELECT_ROAR_AND_SAVE
} from './constants';

import {
  fetchArtworkSuccess,
  fetchArtworkFailure,
  fetchRoarsSuccess,
  fetchRoarsFailure,
  selectRoarSuccess,
  selectRoarFailure,
  selectArtworkSuccess,
  selectArtworkFailure,
  selectRoarAndSaveStoreValues
} from './actions';

import {
  getPastRoars,
  getArtworkSelector
} from './selectors';

import {
  call,
  put,
  select,
  takeEvery
} from 'redux-saga/effects';
import _ from 'lodash';
import { push } from 'react-router-redux';
import {get} from 'axios/index';
import { staticRoars } from '../../../../lib/fixtures/staticRoars';
const createStepOneSagas = (api) => {

  function* selectRoarAndSave(action) {
    const {
      roar,
      type
    } = action.payload;
    yield put(selectRoarAndSaveStoreValues({roar, type}));
    yield put(push('/create-roar'));

  }

  function* watchSelectRoarAndSave() {
    yield takeEvery(SELECT_ROAR_AND_SAVE, selectRoarAndSave);
  }

  const fetchArtworkAsync = () => {
    return get('/mock/artwork.json').then(function (response) {
      return response.data;
    });
  };

  function* fetchArtwork() {
    try {
      const artwork = yield fetchArtworkAsync();
      yield put(fetchArtworkSuccess({artwork}));
    } catch (error) {
      yield put(fetchArtworkFailure(error));
    }

  }

  function* watchGetArtwork() {
    yield takeEvery(FETCH_ARTWORK, fetchArtwork);
  }

  const fetchArtworkFromStore = (artwork, id) => {
    return _.find(artwork, { id: Number(id.artworkId) });
  };

  const fetchArtworkSingle = ({artworkId}) => {
    return get('/mock/artwork.json').then(function (response) {
      return _.find(response.data, {'id': Number(artworkId)});
    });
  };



  function* fetchRoar(id) {
    const {
      roarId
    } = id;
    try {
      const response = yield call(api.getRoar, roarId);
      if(response.data){
        return response.data;
      }
    } catch(error) {
      console.error('Error fetching single roar', error);
    }
    // return get('/data.json').then(function (response) {
    //   return _.find(response.data, {'id': Number(roarId)});
    // });
  };


  const fetchRoarFromStore = (pastRoars, id) => {
    return _.find(staticRoars, { _id: Number(id.roarId) });
  };

  function* fetchRoars ({offset, searchTerm}) {
    try {
      const roarResponse = yield call(api.allRoars, {
        offset: offset,
        searchTerm
      });
      if(roarResponse && roarResponse.data) {
        const roars = roarResponse.data.roars;
        const count = roarResponse.data.count;
        return {
          apiRoars: roars,
          count: count
        };
      }
    } catch(error) {
      return [];
    }
  }


  function* getRoars(action) {
    const {
      offset,
      searchTerm,
      isNewSearch
    } = action.payload;
    try {
      const pastRoars = yield fetchRoars({
        offset: isNewSearch ? 0 : offset,
        searchTerm
      });
      yield put(fetchRoarsSuccess({
        pastRoars: pastRoars.apiRoars,
        count: pastRoars.count,
        newOffset: isNewSearch ? 1 : offset + 1,
        newSearch: isNewSearch,
        loading: false
      }));
    } catch (error) {
      yield put(fetchRoarsFailure(error));
    }
  }

  function* watchGetRoars() {
    yield takeEvery(FETCH_ROARS, getRoars);
  }

  function* getRoar(action) {
    const {
      roarId
    } = action.payload;
    try {
      const pastRoarsInStore = yield select(getPastRoars);
      let pastRoar;
      if(pastRoarsInStore && Number(roarId.roarId) <= 4){ // static roars have a roar id less than 4
        //no need for api call
        pastRoar = yield fetchRoarFromStore(pastRoarsInStore, roarId);
      } else {
        //api call to fetch one
        pastRoar = yield fetchRoar(roarId)
        pastRoar = pastRoar.roar;
      }
      yield put(selectRoarSuccess({pastRoar, loading: false}));
    } catch (error) {
      yield put(selectRoarFailure(error));
    }
  }

  function* watchGetRoar() {
    yield takeEvery(SELECT_ROAR, getRoar);
  }

  function* getArtworkSingle(action) {
    const {
      artworkId
    } = action.payload;
    try {
      const pastArtworkInStore = yield select(getArtworkSelector);
      let artwork;
      if(pastArtworkInStore && pastArtworkInStore.length > 0){
        artwork = yield fetchArtworkFromStore(pastArtworkInStore, artworkId);
      } else {
        artwork = yield fetchArtworkSingle(artworkId);
      }
      yield put(selectArtworkSuccess({selectedArtwork: artwork, loading: false}));
    } catch (error) {
      yield put(selectArtworkFailure(error));
    }
  }

  function* watchGetArtworkSingle() {
    yield takeEvery(SELECT_ARTWORK, getArtworkSingle);
  }

  return {
    watchGetArtwork,
    watchGetRoars,
    watchGetRoar,
    watchGetArtworkSingle,
    watchSelectRoarAndSave
  };
};

export default createStepOneSagas;
