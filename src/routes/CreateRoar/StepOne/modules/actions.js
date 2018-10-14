import {
  FETCH_ARTWORK,
  FETCH_ARTWORK_SUCCESS,
  FETCH_ARTWORK_FAILURE,
  FETCH_ROARS,
  FETCH_ROARS_SUCCESS,
  FETCH_ROARS_FAILURE,
  SELECT_ROAR,
  SELECT_ROAR_SUCCESS,
  SELECT_ROAR_FAILURE,
  SELECT_ARTWORK,
  SELECT_ARTWORK_SUCCESS,
  SELECT_ARTWORK_FAILURE,
  SAVE_ARTWORK_TO_ROAR,
  SELECT_ROAR_AND_SAVE,
  SELECT_ROAR_AND_SAVE_STORE_VALUES
} from './constants';

export const fetchArtwork = (senderName) => ({
  type: FETCH_ARTWORK,
  payload: { senderName }
});

export const fetchArtworkSuccess = ({artwork}) => ({
  type: FETCH_ARTWORK_SUCCESS,
  payload: { artwork }
});

export const fetchArtworkFailure = (error) => ({
  type: FETCH_ARTWORK_FAILURE,
  payload: { error }
});

export const fetchRoars = ({offset, searchTerm, isNewSearch}) => ({
  type: FETCH_ROARS,
  payload: {offset, searchTerm, isNewSearch}
});

export const fetchRoarsSuccess = ({ pastRoars, count, newOffset, newSearch }) => ({
  type: FETCH_ROARS_SUCCESS,
  payload: { pastRoars, count, newOffset, newSearch }
});

export const fetchRoarsFailure = (error) => ({
  type: FETCH_ROARS_FAILURE,
  payload: { error }
});

export const selectRoar = (roarId) => ({
  type: SELECT_ROAR,
  payload: { roarId }
});

export const selectRoarSuccess = (pastRoar) => ({
  type: SELECT_ROAR_SUCCESS,
  payload: { pastRoar }
});
export const selectRoarFailure = (error) => ({
  type: SELECT_ROAR_FAILURE,
  payload: { error }
});

export const selectArtwork = (artworkId) => ({
  type: SELECT_ARTWORK,
  payload: { artworkId }
});

export const selectArtworkSuccess = (artwork) => ({
  type: SELECT_ARTWORK_SUCCESS,
  payload: { artwork }
});

export const selectArtworkFailure = (error) => ({
  type: SELECT_ARTWORK_FAILURE,
  payload: { error }
});

export const saveArtworkToRoar = (artwork) => ({
  type: SAVE_ARTWORK_TO_ROAR,
  payload: { artwork }
});

export const selectRoarAndSave = ({roar, type}) => ({
  type: SELECT_ROAR_AND_SAVE,
  payload: { roar, type }
});

//REDUCER THAT HANDLES THIS ACTION IS IN COMMON/multiSelector
export const selectRoarAndSaveStoreValues = ({roar, type}) => ({
  type: SELECT_ROAR_AND_SAVE_STORE_VALUES,
  payload: { roar, type }
});
