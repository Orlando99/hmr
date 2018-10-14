import {
  spawn
} from 'redux-saga/effects';

import apiFactory from '../services/api';

import startStepOneSagas from './CreateRoar/StepOne/sagas';
import startStepThreeSagas from './CreateRoar/StepThree/sagas';
import startStepFourSagas from './CreateRoar/StepFour/sagas';

import wallOfRoarSagas from './WallOfRoar/sagas';
import profileSagas from './Profile/sagas';
import startCommonSagas from './Common/sagas';

function getMainSaga(store) {
  const api = apiFactory.create(store);

  return function * startSagas() {
    yield spawn(startStepOneSagas, api);
    yield spawn(startStepThreeSagas, api);
    yield spawn(startStepFourSagas, api);
    yield spawn(startCommonSagas, api);
    yield spawn(wallOfRoarSagas, api);
    yield spawn(profileSagas, api);
  };
}

export default getMainSaga;
