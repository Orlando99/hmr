import {
  FETCH_WALL_OF_ROAR,
  FETCH_WALL_OF_ROAR_SUCCESS,
  FETCH_WALL_OF_ROAR_FAILURE
} from './constants';

export const fetchWallOfRoar = ({offset, searchTerm, isNewSearch}) => {
  return {
    type: FETCH_WALL_OF_ROAR,
    payload: {offset, searchTerm, isNewSearch}
  };
};

export const fetchWallOfRoarSuccess = ({newOffset, roars, count}) => ({
  type: FETCH_WALL_OF_ROAR_SUCCESS,
  payload: { newOffset, roars, count }
});

export const fetchWallOfRoarFailure = (error) => ({
  type: FETCH_WALL_OF_ROAR_FAILURE,
  payload: { error }
});
