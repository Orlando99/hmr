import { spawn } from 'redux-saga/effects';

import stepFourSagaFactory from '../../../routes/CreateRoar/StepFour/modules/sagas';

function * startStepFourSagas(api) {
  const {
    watchCreateCard,
  } = stepFourSagaFactory(api);
  yield spawn(watchCreateCard);
}

export default startStepFourSagas;
