import {
  SUB_STEP_POST_CARD,
  FETCH_ADDRESS,
  FETCH_ADDRESS_SUCCESS,
  FETCH_ADDRESS_FAILURE,
  SELECT_BACKGROUND_POST_CARD,
  UPLOAD_PHOTO,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_FAILURE,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  NAVIGATE_BACK,
  RESET_ROAR_FLOW,
  REMOVE_IMAGE
} from '../constants';

import {
  CREATE_CARD,
  CREATE_CARD_SUCCESS,
  CREATE_CARD_FAILURE
} from '../../routes/CreateRoar/StepFour/modules/constants';

import {
  SAVE_ARTWORK_TO_ROAR,
  SELECT_ROAR_AND_SAVE_STORE_VALUES
} from '../../routes/CreateRoar/StepOne/modules/constants';

import update from 'immutability-helper';
import { generateHash } from '../../lib/generateHash';
import _ from 'lodash';

const handleNav = (steps, step, subStep, type, isReSend) => {
  let stepBack;
  let subStepBack;

  if(step === 0 || subStep > 0) {
    stepBack = step;
  } else {
    if(step > 1) {
      stepBack = step - 1;
    } else {
      window.location.href = isReSend ? '/create/sent' : '/create/artwork'; // THIS IS HORRIBLE, NEED TO REFACTOR STRUCTURE TO PUT STEP 1 ALONG SIDE THE OTHER STEPS
    }

  }

  if(subStep === 0) {
    subStepBack = step > 0 && steps[step - 1].subSteps.length > 0 ? steps[step - 1].subSteps.length - 1 : 0;
  } else if (steps[step].subSteps.length > 0 ){
    subStepBack = subStep - 1;
  } else {
    subStepBack = subStep;
  }

  //KLUDGE: Carveout for 'resend' mode
  if(step === 2 && subStep === 0 && isReSend){
    stepBack = 1;
    subStepBack = subStep;
  }

  if(type === 'step') {
    return stepBack;
  } else if (type === 'subStep') {
    return subStepBack;
  }
};

const step1 = {
  stepNum: 1,
  artwork: {
    url: '',
    description: '',
    credit: ''
  },
  subSteps: []
};
const step2 = {
  stepNum: 2,
  title: 'Billions Not Millions',
  isComplete: false,
  isReSend: false,
  subSteps: [
    {
      showForResend: false,
      title: 'Write Message',
      // Will come from redux form
      input: {
        type: 'textfield',
        name: 'cardText'
      },
      cardText: '',
      previewCard: {section: 'text', size: 'normal'},
      isRequired: true,
      validationRequirement: true // todo -- figure out validation req with redux form. will probably be a function
    },
    {
      showForResend: false,
      title: 'Choose Personal Image',
      personalImageUrl: '', // from s3
      isRequired: false,
      previewCard: {section: 'personalImage', size: 'normal'}
    },
    {
      showForResend: false,
      title: 'Choose Background Color',
      isRequired: false,
      backgroundColor: '#ffffff',
      previewCard: {section: 'background', size: 'large'}
    }
  ]
};

const step3 = {
  stepNum: 3,
  title: 'Billions Not Millions',
  isComplete: false,
  subSteps: [
    // Substep 1
    {
      showForResend: false,
      title: 'Your Address',
      previewCard: {section: 'senderAddress', size: 'normal'},
      isRequired: true,
      validationRequirement: true
    },
    // Substep 3
    {
      showForResend: false,
      title: 'Recipient Address',
      isRequired: true,
      previewCard: {section: 'rectangle', size: 'normal'},
      addresses: []
    }
  ]
};

const step4 = {
  stepNum: 4,
  title: 'Billions Not Millions',
  isComplete: false,
  subSteps: []
};

const defaultState = {
  // indexed @ zero. Starting at the second step
  step: 1,
  subStep: 0,
  isReSend: false,
  isLoading: false,
  createIsLoading: false,
  lastFetchedAddressHash: false,
  cardFrontDownloadUrl: false,
  cardCreated: {
    card: false,
    isCreated: false,
    png: {
      frontUrl: false,
      backUrl: false
    }
  },
  globalErrors: {
    registerUser: false,
    cardCreatedError: false,
    addressFetchError: false
  },
  globalLoaders: {
    personalImageIsLoading: false
  },
  steps: [
    step1,
    step2,
    step3,
    step4
  ],
};

/**
 * The multiSelector reducer
 *
 * @param {object} state the slice of state
 * @param {object} action the action to update the state with
 *
 * @return {object} the new state
 */
export default (state = defaultState, action) => {
  switch (action.type) {
  case SUB_STEP_POST_CARD:
    let {stepIndex, subStepIndex = 0} = action.payload;
    window.scrollTo(0, 200);
    return {
      ...state,
      step: stepIndex,
      subStep: subStepIndex
    };
  case SELECT_BACKGROUND_POST_CARD:
    return update(state, {
      steps: {
        1: {
          subSteps: {
            2: {
              backgroundColor: {
                $set: action.payload.selectedBackground
              }
            }
          }
        }
      }
    });
  case FETCH_ADDRESS:
    return {
      ...state,
      isLoading: true
    };
  case FETCH_ADDRESS_SUCCESS:
    console.log('action payload is', action)
    let {addresses, senderAddress} = action.payload;
    const singleStringAddr = `${senderAddress.addressStreet} ${senderAddress.city} ${senderAddress.state} ${senderAddress.zip}`;
    return update(state, {
      isLoading: { $set: false},
      lastFetchedAddressHash: { $set: generateHash(singleStringAddr)},
      globalErrors: {
        addressFetchError: {
          $set: false
        }
      },
      steps: {
        2: {
          subSteps: {
            1: {
              addresses: {
                $set: addresses
              }
            }
          }
        }
      }
    });
  case FETCH_ADDRESS_FAILURE:
    let {
      // error,
      senderAddressFailed
    } = action.payload;
    console.log('action', action.payload);
    console.log('sender failed addr', senderAddressFailed);
    const singleStringAddrFailed = `${senderAddressFailed.addressStreet} ${senderAddressFailed.city} ${senderAddressFailed.state} ${senderAddressFailed.zip}`;
    return update(state, {
      isLoading: { $set: false},
      lastFetchedAddressHash: { $set: generateHash(singleStringAddrFailed)},
      globalErrors: {
        addressFetchError: {
          $set: true
        }
      }
    });
  case UPLOAD_PHOTO:
    return update(state, {
      globalLoaders: {
        personalImageIsLoading: {
          $set: true
        }
      }
    });
  case UPLOAD_PHOTO_FAILURE:
    return update(state, {
      globalLoaders: {
        personalImageIsLoading: {
          $set: false
        }
      }
    });
  case UPLOAD_PHOTO_SUCCESS:
    let {s3Url, uploadDestination = 'roar'} = action.payload;
    console.log('s3 ur', s3Url);
    if(uploadDestination === 'roar') {
      return update(state, {
        globalLoaders: {
          personalImageIsLoading: {
            $set: false
          }
        },
        steps: {
          1: {
            subSteps: {
              1: {
                personalImageUrl: {
                  $set: s3Url
                }
              }
            }
          }
        }
      });
    } else if(uploadDestination === 'profile') {
      return update(state, {
        steps: {
          2: {
            subSteps: {
              1: {
                profileImageUrl: {
                  $set: s3Url
                }
              }
            }
          }
        }
      });
    }
    break;

  case REMOVE_IMAGE:
    let {destination = 'roar'} = action.payload;
    const destinationDeep = destination.destination;
    if(destinationDeep === 'roar') {
      return update(state, {
        steps: {
          1: {
            subSteps: {
              1: {
                personalImageUrl: {
                  $set: ''
                }
              }
            }
          }
        }
      });
    } else if(destinationDeep === 'profile') {
      return update(state, {
        steps: {
          2: {
            subSteps: {
              1: {
                profileImageUrl: {
                  $set: ''
                }
              }
            }
          }
        }
      });
    }
    break;

  case REGISTER_USER_SUCCESS:
    let {newUser} = action.payload;
    window.localStorage.setItem('hmrUserId', newUser.id);
    window.localStorage.setItem('hmrToken', `Bearer ${newUser.token}`);
    return state;

  case REGISTER_USER_FAILURE:
    return update(state, {
      globalErrors: {
        registerUser: {
          $set: true
        }
      }
    });

  case CREATE_CARD:
    return {
      ...state,
      createIsLoading: true
    };

  case CREATE_CARD_SUCCESS:
    const {createdCard} = action.payload;
    window.scrollTo(0, 200);
    return update(state,{
      createIsLoading: {
        $set: false
      },
      cardFrontDownloadUrl: {
        $set: _.get(createdCard, 'artifacts.png.front', false)
      },
      cardCreated: {
        isCreated: {
          $set: true
        }
      },
      globalErrors: {
        cardCreatedError: {
          $set: false
        }
      }
    });

  case CREATE_CARD_FAILURE:
    return update(state, {
      createIsLoading: {
        $set: false
      },
      globalErrors: {
        cardCreatedError: {
          $set: true
        }
      }
    });

  case NAVIGATE_BACK:
    return update(state, {
      step: {
        $set: handleNav(state.steps, state.step, state.subStep, 'step', state.isReSend) //state.step === 0 || state.subStep > 0 ? state.step : state.step - 1
      },
      subStep: {
        $set: handleNav(state.steps, state.step, state.subStep, 'subStep', state.isReSend) //state.subStep === 0 ? state.steps[state.step - 1].substeps.length - 1 : state.subStep - 1
      }
    });

  case SAVE_ARTWORK_TO_ROAR:
    const {artwork} = action.payload;
    return update(state, {
      isReSend: {
        $set: false
      },
      steps: {
        0: {
          artwork: {
            $set: artwork
          }
        }
      }
    });
  case SELECT_ROAR_AND_SAVE_STORE_VALUES:
    const { roar, type } = action.payload;
    let setToStep, setToSubstep;
    console.log('roar to set', roar);
    if(type === 'add-name') {
      setToStep = 1;
      setToSubstep = 0;
    } else if (type === 'as-is') {
      setToStep = 2;
      setToSubstep = 0;
    } else {
      setToStep = defaultState.step;
      setToSubstep = defaultState.subStep;
    }

    return update(state, {
      step: {
        $set: setToStep
      },
      subStep: {
        $set: setToSubstep
      },
      isReSend: {
        $set: true
      },
      steps: {
        0: {
          artwork: {
            $set: roar.template.details.artwork
          }
        },
        1: {
          subSteps: {
            0: {
              cardText: {
                $set: roar.template.details.cardText || ''
              }
            },
            1: {
              personalImageUrl: {
                $set: roar.template.details.personalImageUrl || ''
              }
            },
            2: {
              backgroundColor: {
                $set: roar.template.details.backgroundColor
              }
            }
          }
        }
      }
    });
  case RESET_ROAR_FLOW:
    console.log('default state is', defaultState);
    return defaultState;
  default:
    return {...state};
  }
};
