import {connect} from 'react-redux';
import ArtworkDetailView from '../components/ArtworkDetailView';
import {selectArtwork} from '../modules/actions';

const mapStateToProps = state => {
  return {
    selectedArtwork: state.stepOneReducers.selectedArtwork,
    loading: state.stepOneReducers.loading.artwork
  };
};

const mapDispatchToProps = {
  selectArtwork
};

const DetailArtwork = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtworkDetailView);

export default DetailArtwork;
