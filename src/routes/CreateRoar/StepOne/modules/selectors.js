import {createSelector} from 'reselect';
// import _ from 'lodash';

const getPastRoarsSelector = (state) => state.stepOneReducers.pastRoars;


export const getPastRoars = createSelector(
  getPastRoarsSelector,
  (pastRoars) => pastRoars
);

const getArtwork = (state) => state.stepOneReducers.artwork;


export const getArtworkSelector = createSelector(
  getArtwork,
  (artwork) => artwork
);
