import {combineReducers} from 'redux';
import multiSelector from '../common/reducers/multiSelector';
import stepOneReducers from '../routes/CreateRoar/StepOne/modules/reducers';
import wallOfRoars from '../routes/WallOfRoar/modules/reducers';
import myRoars from '../routes/Profile/components/MyRoars/modules/reducers';
import user from '../routes/Profile/modules/reducer';
import modal from '../common/reducers/modal';
import {reducer as form} from 'redux-form';

/**
 * The Root Reducer
 */
export default combineReducers({
  multiSelector,
  stepOneReducers,
  wallOfRoars,
  myRoars,
  user,
  modal,
  form
});
