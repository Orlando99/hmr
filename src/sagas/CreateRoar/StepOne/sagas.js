import { spawn } from 'redux-saga/effects';

import stepOneSagaFactory from '../../../routes/CreateRoar/StepOne/modules/sagas';

function * startStepOneSagas(api) {
  const {
    watchGetArtwork,
    watchGetRoars,
    watchGetRoar,
    watchGetArtworkSingle,
    watchSelectRoarAndSave
  } = stepOneSagaFactory(api);
  yield spawn(watchGetArtwork);
  yield spawn(watchGetRoars);
  yield spawn(watchGetRoar);
  yield spawn(watchGetArtworkSingle);
  yield spawn(watchSelectRoarAndSave);
}

export default startStepOneSagas;
