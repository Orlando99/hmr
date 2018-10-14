import {CREATE_CARD} from './constants';
import {call, put, takeLatest} from 'redux-saga/effects';
import { cardTransformer } from '../../../../services/cardConstructor';
import _ from 'lodash';
import {
  createCardSuccess,
  createCardFailure
} from './actions';

function processImage(cardFront) {
  return new Promise(function(resolve, reject) {
    window.loadImage(cardFront, (canvas) => {
      resolve(canvas);
    }, {
      canvas: true
    });
  });
}

function turnToBlob(canvas) {
  return new Promise(function(resolve, reject) {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/jpeg');
  });
}

const createStepFourSagas = (api) => {

  function * createCard(action) {
    const { card, cardFront } = action.payload;
    const formattedCard = cardTransformer(card);
    try {
      if(cardFront) {
        const canvas = yield processImage(cardFront);
        const blob = yield turnToBlob(canvas);
        // const url = URL.createObjectURL(blob);
        const cardFrontUrl = yield call(api.uploadFile, {photo: blob});
        formattedCard.artifacts.png.front = _.get(cardFrontUrl, 'data.s3Url', null);
        const response = yield call(api.createCard, { card: formattedCard });
        console.log('response with artifact');
        if(response.data) {
          const createdCard = response.data.roar;
          yield put(createCardSuccess({ createdCard }));
        } else {
          yield put(createCardFailure({ response }));
        }
        // (canvas) => {
        //   canvas.toBlob((blob) => {
        //       console.log('blob result', blob);
        //       const url = URL.createObjectURL(blob);
        //       console.log('obj url is', url);
        //     },
        //     'image/jpeg');
        // }, { canvas: true }
        // processImage(cardFront).next().value.then((blob) => {
        //   const cardFrontUrl = yield call(api.uploadFile, {photo: blob});
        //   console.log('card front URL is', cardFrontUrl);
        // }).catch((e) => { console.error(e)});
      } else {
        const response = yield call(api.createCard, { card: formattedCard });
        if(response.data) {
          const createdCard = response.data.roar;
          yield put(createCardSuccess({ createdCard }));
        } else {
          yield put(createCardFailure({ response }));
        }
      }


    } catch (e) {
      yield put(createCardFailure({ e }));
    }
  }

  function * watchCreateCard() {
    yield takeLatest(CREATE_CARD, createCard);
  }

  return {
    watchCreateCard
  };
};

export default createStepFourSagas;
