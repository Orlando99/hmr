import { spawn } from 'redux-saga/effects';

import commonSagaFactory from '../../common/sagas/commonSagas';

function * startCommonSagas(api) {
  const {
    watchRegisterUser,
    watchUploadPhoto,
    watchLoginUser,
    watchResetRoarFlow
  } = commonSagaFactory(api);
  yield spawn(watchRegisterUser);
  yield spawn(watchUploadPhoto);
  yield spawn(watchLoginUser);
  yield spawn(watchResetRoarFlow);
}

export default startCommonSagas;
