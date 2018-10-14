import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../constants';

/**
 * Action to Open Modal
 */
export function modalOpen() {
  return {
    type: OPEN_MODAL
  };
}


/**
 * Action to close modal
 */
export function modalClose() {
  return {
    type: CLOSE_MODAL
  };
}