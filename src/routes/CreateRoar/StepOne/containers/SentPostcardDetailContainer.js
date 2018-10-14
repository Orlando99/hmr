import {connect} from 'react-redux';
import SentPostcardDetail from '../components/SentPostcardDetail';
import {
  selectRoar,
  selectRoarAndSave
} from '../modules/actions';

import {
  resetRoarFlow
} from '../../../../common/actions/postCardConfigurator';

const mapStateToProps = state => {
  return {
    selectedPastRoar: state.stepOneReducers.selectedPastRoar,
    loading: state.stepOneReducers.loading.pastRoar
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     selectRoar: (id) => {
//       dispatch(selectRoar(true, id));
//     }
//   };
// };

const mapDispatchToProps = {
  selectRoar,
  selectRoarAndSave,
  resetRoarFlow
};

const SentPostcardDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SentPostcardDetail);

export default SentPostcardDetailContainer;
