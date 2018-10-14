import {
  FETCH_ARTWORK,
  FETCH_ARTWORK_SUCCESS,
  FETCH_ARTWORK_FAILURE,
  FETCH_ROARS,
  FETCH_ROARS_SUCCESS,
  FETCH_ROARS_FAILURE,
  SELECT_ROAR_SUCCESS,
  // SELECT_ROAR_FAILURE,
  SELECT_ARTWORK_SUCCESS,
  // SELECT_ARTWORK_FAILURE
} from './constants';
// import _ from 'lodash';
import update from 'immutability-helper';
import _ from 'lodash';

const defaultState = {
  pastRoars: [],
  artwork: [],
  selectedPastRoar: null,
  selectedArtwork: null,
  searchTerm: '',
  count: 0,
  offset: 0,
  errors: {
    pastRoarsList: false,
    artworkList: false,
    pastRoar: false,
    artwork: false
  },
  loading: {
    pastRoarsList: false,
    artworkList: false,
    pastRoar: false,
    artwork: false
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
  case FETCH_ARTWORK:
    return update(state,{
      loading: {
        artworkList: {
          $set: true
        }
      }
    });
  case FETCH_ARTWORK_SUCCESS:
    const { artwork } = action.payload;
    console.log('artwork is', artwork);
    return update(state,{
      artwork: {
        $set: artwork
      },
      loading: {
        artworkList: {
          $set: false
        }
      },
      errors: {
        artworkList: {
          $set: false
        }
      }
    });
  case FETCH_ARTWORK_FAILURE:
    return update(state,{
      loading: {
        artworkList: {
          $set: false
        }
      },
      errors: {
        artworkList: {
          $set: true
        }
      }
    });
  case SELECT_ARTWORK_SUCCESS:
    const { selectedArtwork } = action.payload.artwork;
    return {
      ...state,
      selectedArtwork: selectedArtwork
    };
  case FETCH_ROARS:
    const {
      searchTerm,
      isNewSearch,
      offset
    } = action.payload;
    return update(state,{
      loading: {
        pastRoarsList: {
          $set: true
        }
      },
      searchTerm: {
        $set: searchTerm
      },
      offset: {
        $set: isNewSearch ? 0 : offset
      }
    });
  case FETCH_ROARS_SUCCESS:
    const { pastRoars, newOffset, count, newSearch } = action.payload; // eslint-disable-line
    let mergedRoars, pastRoarsDeduped;
    if(state.offset !== 0 && !newSearch) {
      mergedRoars = state.pastRoars.concat(pastRoars);
      pastRoarsDeduped = _.uniqBy(mergedRoars, '_id');
    } else {
      pastRoarsDeduped = pastRoars;
    }

    return update(state, {
      offset: {
        $set: newOffset
      },
      page: {
        $set: newOffset
      },
      count: {
        $set: count
      },
      error: {
        $set: false
      },
      pastRoars: {
        $set: pastRoarsDeduped
      },
      loading: {
        pastRoarsList: {
          $set: false
        }
      },
      errors: {
        pastRoarsList: {
          $set: false
        }
      }
    });
  case FETCH_ROARS_FAILURE:
    return update(state, {
      loading: {
        $set: false
      },
      errors: {
        pastRoarsList: {
          $set: true
        }
      }
    });
  case SELECT_ROAR_SUCCESS:
    console.log('payload', action.payload)
    const { pastRoar } = action.payload;
    console.log('past roar', pastRoar);
    return {
      ...state,
      selectedPastRoar: pastRoar.pastRoar
    };
  default:
    return state;
  }
};
