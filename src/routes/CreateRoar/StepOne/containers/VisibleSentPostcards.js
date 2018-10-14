import {connect} from 'react-redux';
import SentPostcard from '../components/SentPostcard';
import { fetchRoars } from '../modules/actions';

import {
  resetRoarFlow
} from '../../../../common/actions/postCardConfigurator';

const mapStateToProps = state => {
  return {
    pastRoars: state.stepOneReducers.pastRoars,
    offset: state.stepOneReducers.offset,
    count: state.stepOneReducers.count,
    searchTerm: state.stepOneReducers.searchTerm
  };
};

const mapDispatchToProps = {
  resetRoarFlow,
  fetchRoars
}

const VisibleSentPostcards = connect(
  mapStateToProps,
  mapDispatchToProps
)(SentPostcard);

export default VisibleSentPostcards;
