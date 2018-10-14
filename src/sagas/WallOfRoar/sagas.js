import { spawn } from 'redux-saga/effects';


import wallOfRoarFactory from '../../routes/WallOfRoar/modules/sagas';

function* wallOfRoarSagas(api) {
  const {
    watchGetWallOfRoar
  } = wallOfRoarFactory(api);
  yield spawn(watchGetWallOfRoar);
}

export default wallOfRoarSagas;