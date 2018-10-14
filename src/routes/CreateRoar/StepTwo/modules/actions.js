import {UPDATE_POSTCARD_SUBSTEP} from '../../../../common/constants';
import {SELECT_POSTCARD_BACKGROUND} from './constants';

export const postCardConfigureStep = (stepIndex, subStepIndex) => ({
  type: UPDATE_POSTCARD_SUBSTEP,
  payload: {stepIndex, subStepIndex}
});

export const postCardConfigureBackground = (selectedBackground) => ({
  type: SELECT_POSTCARD_BACKGROUND,
  payload: {selectedBackground}
});
