import {
  FETCH_WALL_OF_ROAR,
  FETCH_WALL_OF_ROAR_FAILURE,
  FETCH_WALL_OF_ROAR_SUCCESS
} from '../modules/constants';
import update from 'immutability-helper/index';
import _ from 'lodash';

const defaultState = {
  roars: [],
  searchTerm: '',
  offset: 0,
  limit: 9,
  isLoading: false,
  error: null,
  page: 0
};

/**
 * The Wall Of Roar Reducer
 */
export default (state=defaultState, action) => {
  switch(action.type) {
  case FETCH_WALL_OF_ROAR:
    const {
      searchTerm,
      isNewSearch,
      offset
    } = action.payload
    return update(state,{
      isLoading: {
        $set: true
      },
      searchTerm: {
        $set: searchTerm
      },
      offset: {
        $set: isNewSearch ? 0 : offset
      }
    });
  case FETCH_WALL_OF_ROAR_SUCCESS:
    const {
      roars,
      newOffset,
      count
    } = action.payload;
    let mergedRoars, roarsDeduped;
    if(state.offset !== 0) {
      mergedRoars = state.roars.concat(roars);
      roarsDeduped = _.uniqBy(mergedRoars, '_id');
    } else {
      roarsDeduped = roars;
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
      roars: {
        $set: roarsDeduped
      },
      loading: {
        $set: false
      }
    });
  case FETCH_WALL_OF_ROAR_FAILURE:
    return {
      ...state,
      isLoading: false,
      roars: [],
      page: action.payload.page,
      error: action.payload.error
    };
  default:
    return {...state};
  }
};
