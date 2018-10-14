import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import uuid from 'uuid/v4';
import {connect} from 'react-redux';
import classNames from 'classnames';
// import domtoimage from 'dom-to-image-chrome-fix';

// import numeral from 'numeral';
// import RenderField from '../../common/components/Form/RenderField';
import {
  getPostCard,
  getBackground,
  getAddresses
} from '../../common/selectors/selectors';

import {
  postCardConfigureStep,
  navigateBack,
  resetRoarFlow,
  removeImage
} from '../../common/actions/postCardConfigurator';

import {
  registerUser,
  uploadPhoto
} from '../../common/actions/userManagement';

import {
  fetchAddress
} from './StepThree/modules/actions';

import {
  createCard
} from './StepFour/modules/actions';
import NavBar from '../../common/components/NavBar';
import PaypalButton from '../../common/components/PaypalButton';
import Icon from '../../common/components/Icon';
import BreadCrumb from '../../common/components/BreadCrumb';
import Banner from '../../assets/images/slide2.png';
import PreviewCard from '../../common/components/PreviewCard/index';
import SocialPart from '../../common/components/SocialPart';
import DonatePart from '../../common/components/DonatePart';
import OptIns from '../../common/components/OptIns/OptIns';
import WallofRoarsPart from '../../common/components/WallofRoarsPart';
import SadFace from '../../assets/images/sadface.svg';
import {calculatePrice} from '../../lib/calculatePrice';
// import {Field, reduxForm} from 'redux-form';
import PostcardTextEntryStep from './StepTwo/components/PostcardTextEntryStep';
import PostcardAddressEntryStep from './StepThree/components/PostcardAddressEntryStep';
import { grabSelectedRecipientKeys} from '../../lib/grabSelectedRecipientKeys';

import './style/index.css';
let stripeHandler;
const stripeToken = process.env && process.env.REACT_APP_STRIPE_TOKEN ? process.env.REACT_APP_STRIPE_TOKEN : 'pk_test_uwYP26BVAwXqjQ7hcujSiUOs';
const PAYPAL_CLIENT = process.env && process.env.REACT_APP_PAYPAL_CLIENT ? process.env.REACT_APP_PAYPAL_CLIENT : 'AY4_NDODBkNYVmYzntbNKHZKCQ9IEHBUMXRmVvs_3nCpKC6JS7DkAoGBDx9RJdBlpsBIqvLTe_yjgd0K';
const PAYPAL_ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';
const PAYPAL_CLIENT_OBJ = {
  sandbox: 'AY4_NDODBkNYVmYzntbNKHZKCQ9IEHBUMXRmVvs_3nCpKC6JS7DkAoGBDx9RJdBlpsBIqvLTe_yjgd0K',
  production: process.env.REACT_APP_PAYPAL_CLIENT
}

// const filterCardForImg = (node) => {
//   if(node.className && node.tagName === 'P' && typeof node.className === 'string') {
//     return !node.className.includes('senderAddress');
//   } else {
//     return true;
//   }
// };

class CreateRoarContainer extends React.Component {

  static propTypes = {
    postCardConfigureStep: PropTypes.func,
    location: PropTypes.object,
    step: PropTypes.number,
    subStep: PropTypes.number,
    artwork: PropTypes.object,
    steps: PropTypes.array,
    postCardForm: PropTypes.object,
    fetchAddress: PropTypes.func,
    currentStep: PropTypes.object,
    createCard: PropTypes.func,
    uploadPhoto: PropTypes.func,
    navigateBack: PropTypes.func,
    isLoading: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      cardFrontUrl: ''
    };
    this.tokenHandler = this.tokenHandler.bind(this);
    this.reviewAndPayButton = this.reviewAndPayButton.bind(this);
    this.onPaypalSuccess = this.onPaypalSuccess.bind(this);
  }

  componentDidMount() {
    stripeHandler = window.StripeCheckout.configure({
      key: stripeToken,
      image: 'https://s3.amazonaws.com/hmr-web-prod/icons/apple-touch-icon.png',
      locale: 'auto',
      allowRememberMe: false,
      token: this.tokenHandler
    });
  }

  componentDidUpdate() {
    if(this.props.step === 3 && (this.props.globalErrors.cardCreatedError || this.props.cardCreated.isCreated)){
      window.stackedCardinit();
    }
  }

  componentWillUnmount() {
    stripeHandler.close();
  }

  loadStripeCheckout = (e) => {
    const {postCardForm} = this.props;
    const recipients = _.get(postCardForm, 'values.recipients');
    const selectedRecipients = grabSelectedRecipientKeys(recipients); //_.keys(_.pickBy(recipients, _.identity));
    const senderState = _.get(postCardForm, 'values.state', false);
    const needsSalesTax = senderState === 'OH';
    const totalPrice = needsSalesTax ? calculatePrice(selectedRecipients, 'stripe-with-tax') : calculatePrice(selectedRecipients, 'stripe');
    stripeHandler.open({
      name: 'Hear My Roar',
      description: ` ${selectedRecipients.length} Roar${selectedRecipients.length > 1 ? 's' : ''} ${needsSalesTax ? '+ OH Sales Tax' : ''}`,
      amount: totalPrice * 100
    });
    e.preventDefault();
  };

  tokenHandler(token) {
    const {
      postCardForm,
      addresses,
      backgroundColor,
      steps,
      isReSend
    } = this.props;
    const roarValues = postCardForm.values;
    const card = {
      ...roarValues,
      addresses,
      backgroundColor,
      token,
      isReSend,
      steps
    };
    this.props.createCard({card});
  }

  onPaypalSuccess = (payment) => {
    const {
      postCardForm,
      addresses,
      backgroundColor,
      steps,
      isReSend
    } = this.props;
    const roarValues = postCardForm.values;
    const card = {
      ...roarValues,
      addresses,
      backgroundColor,
      isPaypal: true,
      isReSend,
      steps
    };
    this.props.createCard({card});
  };



  onPaypalError = (error) => {
    window.alert('Your PayPal payment was unsuccessful. Please complete your payment by clicking the Submit & Pay button.');
  };

  onPaypalCancel = (data) =>
    console.log('Cancelled payment!', data);

  isCardTextAreaValid = () => {
    return !_.get(this.props, 'postCardForm.syncErrors.cardText.length', false);
  };

  roarAgain = () => {
    const {
      resetRoarFlow
    } = this.props;
    resetRoarFlow();
  };
  isNextStepEnabled = (step, subStep) => {
    const {
      postCardForm,
      isReSend
    } = this.props;
    if (step === 1) {
      if (subStep === 0 && !isReSend) {
        return this.isCardTextAreaValid();
      } else if(subStep === 0 && isReSend){
        const addNameVal = _.get(postCardForm, 'values.addName', '');
        return addNameVal.length > 0;
      } else {
        return true;
      }
    } else if (step === 2) {
      if (subStep === 0) {
        return _.get(postCardForm, 'values.firstName', false)
          && _.get(postCardForm, 'values.lastName', false)
          && _.get(postCardForm, 'values.senderEmail', false)
          && _.get(postCardForm, 'values.streetAddress', false)
          && _.get(postCardForm, 'values.city', false)
          && _.get(postCardForm, 'values.state', false)
          && _.get(postCardForm, 'values.zip', false);
      } else if (subStep === 1) {
        const selectedRecipients = _.keys(_.pickBy(postCardForm.values.recipients, _.identity));
        return selectedRecipients.length > 0;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  requiredNextButton = (category) => {
    const {steps, step, subStep} = this.props;
    const currentStep = steps[step];
    const nextStepCopy = step === 2 && subStep === 1 ? 'Final review' : 'Next step';
    return (
      this.isNextStepEnabled(step, subStep)
        ?
        <div onClick={_.partial(this.nextStep, steps, currentStep, step, subStep)}
          className={classNames('yellowbutton', category)}>
          {nextStepCopy}
        </div>
        : <div onClick={_.noop} className={classNames('yellowbutton', 'grey', category)}>
          {nextStepCopy}
        </div>
    );
  };

  nextAndSkipButton = (category) => {
    const {steps, step, subStep} = this.props;
    const currentStep = steps[step];
    const nextStepCopy = step === 2 && subStep === 1 ? 'Final review' : 'Next step';
    return (
      <React.Fragment>
        {
          this.isNextStepEnabled(step, subStep)
            ?
            <div onClick={_.partial(this.nextStep, steps, currentStep, step, subStep)}
              className={classNames('yellowbutton', category)}>
              {nextStepCopy}
            </div>
            : <div onClick={_.noop} className={classNames('yellowbutton', 'grey', category)}>
              {nextStepCopy}
            </div>
        }
        {/*<div onClick={_.partial(this.nextStep, steps, currentStep, step, subStep)}*/}
          {/*className={classNames('yellowbutton', 'grey', category)}>*/}
          {/*Skip Step*/}
        {/*</div>*/}
      </React.Fragment>
    );
  };

  reviewAndPayButton = (category) => {
    const {
      postCardForm
    } = this.props;

    const recipients = _.get(postCardForm, 'values.recipients');
    const selectedRecipients = grabSelectedRecipientKeys(recipients);
    const senderState = _.get(postCardForm, 'values.state', false);
    const needsSalesTax = senderState === 'OH';
    const totalPrice = needsSalesTax ? calculatePrice(selectedRecipients, 'stripe-with-tax') : calculatePrice(selectedRecipients, 'stripe');
    console.log('paypal client', PAYPAL_CLIENT);
    return (
      <React.Fragment>
        {
          postCardForm.values.acceptedTAC
            ?
            <React.Fragment>
              <div onClick={this.loadStripeCheckout} className={classNames('yellowbutton', category)}>
            Submit & Pay
              </div>
              <PaypalButton
                client={PAYPAL_CLIENT_OBJ}
                env={PAYPAL_ENV}
                commit={true}
                currency={'USD'}
                total={totalPrice}
                onSuccess={this.onPaypalSuccess}
                onError={this.onPaypalError}
                onCancel={this.onPaypalCancel}
              />
            </React.Fragment>
            :
            <div className={classNames('yellowbutton', 'grey', category)} onClick={()=> window.alert('You must accept the terms and conditions to proceed')}>
            Submit & Pay
            </div>
        }
      </React.Fragment>
    );
  };

  roarAgainButton = (category) => {
    return (
      <div onClick={this.roarAgain} className={classNames('yellowbutton', category)}>
        Roar Again
      </div>
    );
  };

  renderSubNavButton = (step, currentSubStep, category) => {
    const {
      cardCreated
    } = this.props;
    if (step !== 3 && currentSubStep && currentSubStep.isRequired) {
      return this.requiredNextButton(category);
    } else if (step !== 3 && currentSubStep && !currentSubStep.isRequired) {
      return this.nextAndSkipButton(category);
    } else if (step === 3 && !cardCreated.isCreated) {
      return this.reviewAndPayButton(category);
    } else if (step === 3 && cardCreated.isCreated) {
      return this.roarAgainButton(category);
    }
  };

  userHasEnteredRegistrationInfo = () => {
    const {postCardForm} = this.props;
    return postCardForm.values.email && postCardForm.values.password && postCardForm.values.confirmPassword;
  };

  nextStep = (steps, currentStep, step, subStep) => {
    const {
      // postCardForm,
      isReSend
    } = this.props;

    if(step === 1 && isReSend) {
      this.props.postCardConfigureStep(2, 0);
      return;
    }

    // if (step === 2 && subStep === 1 && this.userHasEnteredRegistrationInfo()) {
    //   const user = {
    //     email: postCardForm.values.email,
    //     password: postCardForm.values.password,
    //     profileImageUrl: _.get(steps, '2.subSteps.1.profileImageUrl', false) ? _.get(steps, '2.subSteps.1.profileImageUrl', false) : _.get(steps, '1.subSteps.1.personalImageUrl', false)
    //   };
    //   this.props.registerUser({user});
    // }

    //NEED TO HANDLE FOR STEPS WITHOUT SUBSTEPS
    if (currentStep.subSteps.length - 1 === subStep) {
      this.props.postCardConfigureStep(step + 1, 0);
    } else {
      this.props.postCardConfigureStep(step, subStep + 1);
    }
  };

  formatRecipients = (postCardForm) => {
    const {addresses, step} = this.props;
    if (step === 3 && addresses) {
      const recipientsFormatted = [];

      const recipientIndexes = _.get(postCardForm, 'values.recipients');

      recipientIndexes.forEach((value, key) => {
        if (value) {
          recipientsFormatted.push(addresses[key]);
        }
      });
      return recipientsFormatted;
    }
  };

  getFlowTitle = () => {
    const {
      step,
      subStep,
      isReSend
    } = this.props;
    if(step === 1) {
      if(subStep === 0){
        return isReSend ? 'ADD A SHORT PERSONAL NOTE HONORING THIS INDIVIDUAL’S STORY' : 'WRITE YOUR STORY...ABOUT HOW THE OPIOID EPIDEMIC TOUCHES YOU OR IMPACTS YOUR COMMUNITY';
      } else if (subStep === 1) {
        return 'ADD A PERSONAL PHOTO…IT WILL SPEAK VOLUMES';
      } else if (subStep === 2) {
        return 'PICK A COLOR TO HELP YOUR CARD STAND OUT FROM THE PACK';
      }
    } else if (step === 2) {
      if(subStep === 0) {
        return 'PLEASE ENTER YOUR MAILING ADDRESS SO THAT WE CAN IDENTIFY YOUR SPECIFIC ELECTED OFFICIALS';
      } else if (subStep === 1) {
        return 'TELL US WHICH OF YOUR ELECTED OFFICIALS YOU’D LIKE US TO SEND YOUR PRINTED POSTCARD TO';
      }
    } else if (step === 3 && !isReSend) {
      return 'Send Your Postcard';
    } else if (step === 3 && isReSend) {
      return 'Send your Postcard';
    }
  };

  getFlowSubTitle = (postCardForm) => {
    const {
      step,
      subStep,
      isReSend
    } = this.props;
    if(step === 1) {
      if(subStep === 0){
        return isReSend ? 'Say just a couple of words… why you selected this card or what the person’s story means to you.' : 'Share your voice and make it count. How has the opioid epidemic touched your life?';
      } else if (subStep === 1) {
        return 'If you’d like, you can share a photo of someone you’ve lost or someone in recovery whose story you’re sharing';
      } else if (subStep === 2) {
        return 'Give your postcard a touch of color.';
      }
    } else if (step === 2) {
      if(subStep === 0) {
        return 'Your name & address will appear on your printed postcard; this helps hold your elected officials accountable.';
      } else if (subStep === 1) {
        return 'We’re flooding the states and the federal government with a ROAR way too loud to ignore!';
      }
    } else if (step === 3 && !isReSend) {
      return 'Send Your Postcard';
    } else if (step === 3 && isReSend) {
      return 'Billions Not Millions';
    }
  };

  render() {
    const {
      location,
      step,
      subStep,
      // artwork,
      steps,
      postCardForm,
      fetchAddress,
      backgroundColor,
      uploadPhoto,
      navigateBack,
      isLoading,
      createIsLoading,
      globalErrors,
      cardCreated,
      removeImage,
      lastFetchedAddressHash,
      isReSend,
      resetRoarFlow,
      globalLoaders,
    } = this.props; // step is actually the index of the current step
    const currentStep = steps[step];
    const currentSubStep = currentStep.subSteps[subStep];
    const cardSection = _.get(currentSubStep, 'previewCard.section', false);
    const cardSize = _.get(steps, `${step}.subSteps.${subStep}.previewCard.size`, false);
    const recipients = this.formatRecipients(postCardForm);
    const personalImageUrl = _.get(steps, '[1].subSteps[1].personalImageUrl', false);
    const senderState = _.get(postCardForm, 'values.state', false);
    const needsSalesTax = senderState === 'OH';
    const createFlowIsDone = () => {
      let shouldShow = false;
      if(cardCreated.isCreated) {
        shouldShow = true;
      } else if(globalErrors.cardCreatedError) {
        shouldShow = true;
      }

      return shouldShow;
    };

    // :-(
    let leftpart_classes = 'leftpart';
    let centerpart_classes = 'centerpart';
    let rightpart_classes = 'rightpart';
    if (this.props.step === 1 && this.props.subStep === 2) {
      centerpart_classes += ' colorpicker';
      rightpart_classes += ' desktop';
    } else if (this.props.step === 2) {
      centerpart_classes += ' nobg';
      // if (this.props.subStep === 1) {
      //   rightpart_classes += ' hidden';
      //   centerpart_classes += ' stretched';
      // }
    } else if (this.props.step === 3) {
      leftpart_classes += ' step4';
      rightpart_classes += ' x-large';
    }

    if (this.props.step > 1 || this.props.subStep >= 2) {
      rightpart_classes += ' img_selected';
    }

    if (this.refs.centerpart !== undefined && this.refs.centerpart.innerHTML.indexOf('errorstr') > -1) {
      centerpart_classes += ' error';
    } else {
      centerpart_classes.replace('error', '');
    }

    // console.log(document.getElementById('termsagree').checked);

    return (
      <div className="createRoarPage createPostcardMessage">
        <NavBar/>
        <div className="banner">
          <div className="content">
            <h1>
              <p>{this.getFlowTitle()}</p>
            </h1>
          </div>
          <img src={Banner} alt="Banner"/>
        </div>
        {!createFlowIsDone() &&
          <div className="content_container">
            <BreadCrumb
              url={location.pathname}
              step={step}
              navigateBack={navigateBack}
              resetRoarFlow={resetRoarFlow}
              isReSend={isReSend}
            />
          </div>
        }
        <div className={classNames(
          'mainpart',
          {'flow-done': createFlowIsDone()},
          {'flow-error': globalErrors.cardCreatedError}
        )}>
          <div className="content_container">
            {createFlowIsDone() && cardCreated.isCreated &&
              <div className='flow-done-header'>
                <h3 className='animated rubberBand'><span className="hmr-yellow-bg">Your printed postcard is on it's way!<br/>Thank you for joining this roar!</span></h3>
              </div>
            }
            <div className={classNames('content', {'step4_content':step===3})}>
              {/* Left Side Bar */}
              <div className={leftpart_classes}>
                <h3>{this.getFlowSubTitle()}</h3>
                {step === 1 && isReSend &&
                  <ul className="steps">
                    <li
                      key={uuid()}
                      className='selected'>
                        add personal note
                    </li>
                  </ul>
                }
                {step > 1 && isReSend &&
                  <ul className="steps">
                    {
                      currentStep.subSteps.map((step, idx) => {
                        return (
                          <li
                            key={uuid()}
                            className={idx === subStep ? 'selected' : ''}>
                            {step.title}
                          </li>
                        );
                      })
                    }
                  </ul>
                }
                {step !== 3 && !isReSend &&
                  <ul className="steps">
                    {
                      currentStep.subSteps.map((step, idx) => {
                        return (
                          <li
                            key={uuid()}
                            className={idx === subStep ? 'selected' : ''}>
                            {step.title}
                          </li>
                        );
                      })
                    }
                  </ul>
                }
                {step === 3 && !createIsLoading &&
                <div className='summary-wrap'>
                  <h4>Recipients</h4>
                  {recipients && recipients.map((recipient, key) => {
                    return (<p
                      className='recipient'
                      key={key}
                    >
                      <span className='name'>{recipient.officialInfo.fullName}</span>
                    </p>);
                  })}
                  {!createFlowIsDone() && <OptIns />}
                  <div className="total">
                    {needsSalesTax && <p className="discount">OH Sales Tax<span>{calculatePrice(recipients, 'sales-tax')}</span></p>}
                    <p className="estimated">Total<span>{needsSalesTax ? calculatePrice(recipients, 'dollar-value-with-tax') : calculatePrice(recipients, 'dollar-value') }</span></p>
                  </div>
                </div>
                }
                {createIsLoading &&
                <div className="loading-container">
                  <Icon className="spin" name="spinner spin fa-2x"/>
                  <p>Creating your postcard...Don't forget to download your card after checkout!</p>
                </div>
                }
                {this.renderSubNavButton(step, currentSubStep, 'desktop')}


              </div>
              {!globalErrors.cardCreatedError &&
                <PreviewCard
                  section={cardSection}
                  size={step === 3 ? 'x-large' : cardSize}
                  backgroundColor={backgroundColor}
                  classNamesPredef={rightpart_classes}
                  steps={steps}
                  step={step}
                  subStep={subStep}
                  postCardForm={postCardForm}
                  flowdone={createFlowIsDone()}
                  goToStep={this.props.postCardConfigureStep}
                />
              }
              {(step !== 3 || globalErrors.cardCreatedError) &&
              <div className={classNames(
                centerpart_classes,
                {'x-large': globalErrors.cardCreatedError}
              )} ref="centerpart">
                {step === 1 &&
                <PostcardTextEntryStep
                  subStep={steps[step].subSteps[subStep]}
                  subStepIndex={subStep}
                  onSubmit={this.saveStepTwo}
                  placeholder="Click here to start writing your story or message within about 550 characters (including spaces) or 100 words"
                  uploadPhoto={uploadPhoto}
                  initialValues={{cardText: isReSend ? currentSubStep.cardText : ''}}
                  removeImage={removeImage}
                  isReSend={isReSend}
                  personalImageIsLoading={globalLoaders.personalImageIsLoading}
                  personalImageUrl={steps[1].subSteps[1].personalImageUrl}
                />
                }
                {step === 2 &&
                <PostcardAddressEntryStep
                  subStep={steps[step].subSteps[subStep]}
                  subStepIndex={subStep}
                  onSubmit={this.saveStepThree}
                  postCardForm={postCardForm}
                  fetchAddress={fetchAddress}
                  registerUser={registerUser}
                  isLoading={isLoading}
                  personalImageUrl={personalImageUrl}
                  uploadPhoto={uploadPhoto}
                  removeImage={removeImage}
                  lastFetchedAddressHash={lastFetchedAddressHash}
                  addressFetchError={globalErrors.addressFetchError}
                />
                }
                {globalErrors.cardCreatedError &&
                  <React.Fragment>
                    <img src={SadFace} alt="Sad Face" />
                    <h3>Something went wrong...</h3>
                    <div
                      className="yellowbutton desktop"
                      onClick={this.roarAgain}
                    >Try Again</div>
                    <div
                      className="yellowbutton mobile"
                      onClick={this.roarAgain}
                    >Try Again</div>
                    <p>or <span><a href="mailto:janice.hearmyroar@gmail.com">contact us</a></span></p>
                  </React.Fragment>
                }
              </div>
              }
              <div className="clear"></div>
              {createFlowIsDone() && cardCreated.isCreated &&
                <SocialPart cardFrontUrl={this.props.cardFrontDownloadUrl}/>
              }
            </div>
          </div>
          {step < 3 && this.renderSubNavButton(step, currentSubStep, 'mobile')}
          {createFlowIsDone() && !globalErrors.cardCreatedError &&
            <React.Fragment>
              <DonatePart />
              <WallofRoarsPart />
            </React.Fragment>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {step, subStep, steps} = state.multiSelector;
  return {
    step,
    subStep,
    artwork: _.get(steps, '0.artwork', ''),
    steps,
    postCardForm: getPostCard(state),
    backgroundColor: getBackground(state),
    addresses: getAddresses(state),
    isLoading: state.multiSelector.isLoading,
    createIsLoading: state.multiSelector.createIsLoading,
    cardCreated: state.multiSelector.cardCreated,
    globalErrors: state.multiSelector.globalErrors,
    globalLoaders: state.multiSelector.globalLoaders,
    lastFetchedAddressHash: state.multiSelector.lastFetchedAddressHash,
    isReSend: state.multiSelector.isReSend,
    cardFrontDownloadUrl: state.multiSelector.cardFrontDownloadUrl
  };
}


const mapDispatchToProps = {
  fetchAddress,
  postCardConfigureStep,
  createCard,
  registerUser,
  uploadPhoto,
  navigateBack,
  resetRoarFlow,
  removeImage
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoarContainer);
