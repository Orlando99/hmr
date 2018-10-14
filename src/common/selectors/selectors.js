import {createSelector} from 'reselect';
import _ from 'lodash';

/**
 *
 * @param {object} state the state to reselect;
 *
 * @return {string} the Postcard text
 */
const getPostCardText = state => _.get(state, 'form.postcard');


export const getPostCard = createSelector(
  [getPostCardText],
  (postCardText) => {
    return postCardText;
  }
);

const background = state => _.get(state, 'multiSelector.steps.1.subSteps.2.backgroundColor');


export const getBackground = createSelector(
  [background],
  (backgroundColor) => {
    return backgroundColor;
  }
);

const addresses = state => _.get(state, 'multiSelector.steps.2.subSteps.1.addresses');

export const getAddresses = createSelector(
  [addresses],
  (addresses) => {
    return addresses;
  }
);
