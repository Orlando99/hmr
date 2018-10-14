import {combineReducers} from 'redux';
import multiSelector from './multiSelector';
import wallOfRoars from '../../routes/WallOfRoar/modules/reducers';
import myRoars from '../../routes/Profile/components/MyRoars/modules/reducers';
import {reducer as form} from 'redux-form';

export default combineReducers({
  multiSelector,
  wallOfRoars,
  myRoars,
  form
});
