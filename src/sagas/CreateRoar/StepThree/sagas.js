import { spawn } from 'redux-saga/effects';

import stepThreeSagaFactory from '../../../routes/CreateRoar/StepThree/modules/sagas';

function * startStepThreeSagas(api) {
  const {
    watchFetchAddresses,
  } = stepThreeSagaFactory(api);
  yield spawn(watchFetchAddresses);
}

export default startStepThreeSagas;
