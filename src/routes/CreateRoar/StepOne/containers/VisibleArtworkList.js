import {connect} from 'react-redux';
import ArtworkView from '../components/ArtworkView';
import {
  fetchArtwork,
  saveArtworkToRoar
} from '../modules/actions';

import {
  resetRoarFlow
} from '../../../../common/actions/postCardConfigurator';

const mapStateToProps = state => {
  return {
    artwork: state.stepOneReducers.artwork
  };
};

const mapDispatchToProps = {
  fetchArtwork,
  saveArtworkToRoar,
  resetRoarFlow
};

const VisibleArtworkList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtworkView);

export default VisibleArtworkList;
