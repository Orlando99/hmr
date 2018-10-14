import { spawn } from 'redux-saga/effects';


import profileFactory from '../../routes/Profile/components/MyRoars/modules/sagas';

function* profileSagas(api) {
  const {
    watchGetMyRoars
  } = profileFactory(api);
  yield spawn(watchGetMyRoars);
}

export default profileSagas;