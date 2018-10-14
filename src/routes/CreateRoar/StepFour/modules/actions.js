import {
  CREATE_CARD,
  CREATE_CARD_FAILURE,
  CREATE_CARD_SUCCESS
} from './constants';

export const createCard = ({card, cardFront}) => ({
  type: CREATE_CARD,
  payload: {card, cardFront}
});

export const createCardSuccess = ({createdCard}) => ({
  type: CREATE_CARD_SUCCESS,
  payload: {createdCard}
});

export const createCardFailure = (error) => ({
  type: CREATE_CARD_FAILURE,
  payload: {error}
});
