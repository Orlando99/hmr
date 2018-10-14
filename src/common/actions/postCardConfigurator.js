import {
  SUB_STEP_POST_CARD,
  SELECT_BACKGROUND_POST_CARD,
  NAVIGATE_BACK,
  RESET_ROAR_FLOW,
  REMOVE_IMAGE
} from '../constants';

/**
 * Update step and substeps of postCardConfigurator
 *
 * @param {number} stepIndex the index of step in the configuration to update
 * @param {number} subStepIndex the index of subStep in the configuration to update
 *
 * @return {object} the redux action
 */
export const postCardConfigureStep = (stepIndex, subStepIndex) => ({
  type: SUB_STEP_POST_CARD,
  payload: {stepIndex, subStepIndex}
});




/**
 * Update postCard background
 *
 * @param {string} selectedBackground the color of the postCard background
 *
 * @return {object} the redux action
 */
export const postCardConfigureBackground = (selectedBackground) => ({
  type: SELECT_BACKGROUND_POST_CARD,
  payload: {selectedBackground}
});

export const navigateBack = () => ({
  type: NAVIGATE_BACK,
  payload: {}
});

export const resetRoarFlow = (dataOnly) => ({
  type: RESET_ROAR_FLOW,
  payload: {dataOnly}
});

export const removeImage = (destination) => ({
  type: REMOVE_IMAGE,
  payload: {destination}
});

