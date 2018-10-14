import _ from 'lodash';

const matchRecipients = (recipients, addresses) => {
  const truthyKeys = _.keys(_.pickBy(recipients, _.identity));
  const formattedAddresses = [];
  addresses.map((address, key) => { // eslint-disable-line
    // so our truthy keys come back as strings, casting the key to string as a kluge for now
    if(_.includes(truthyKeys, String(key))) {
      formattedAddresses.push({
        name: `${address.officialInfo.fullName}`,
        addressStreet: address.officialInfo.address[0].line1,
        city: address.officialInfo.address[0].city,
        state: address.officialInfo.address[0].state,
        zip:address.officialInfo.address[0].zip
      });
    }
  });
  return formattedAddresses;
};

const getUserId = () => {
  const uid = window.localStorage.getItem('hmrUserId')
  if(uid) {
    const uidFormatted = uid.replace(/"/g, '');
    return uidFormatted ? uidFormatted : null;
  } else {
    return null;
  }

};

const isOriginal = (isReSend) => {
  return !isReSend;
}

export const cardTransformer = (cardInput) => {
  return {
    userId: getUserId(), //'5b7b69f3ac503441680230cc',
    stripeToken: _.get(cardInput, 'token.id', null),
    isPublic: _.get(cardInput, 'isPublic', false),
    isOriginal: isOriginal(_.get(cardInput, 'isReSend', false)),
    fedUpNewsletter: _.get(cardInput, 'fedUpNewsletter', false),
    facingAddictionNewsletter: _.get(cardInput, 'facingAddictionNewsletter', false),
    hmrNewsletter: _.get(cardInput, 'hmrNewsletter', false),
    isPaypal: _.get(cardInput, 'isPaypal', false),
    senderEmail: _.get(cardInput, 'senderEmail', ''),
    template: {
      id: '1',
      details: {
        cardText: _.get(cardInput, 'addName', false) ? `${cardInput.addName} <br/><br/> ${cardInput.cardText}` : cardInput.cardText,
        backgroundColor: cardInput.backgroundColor,
        personalImageUrl: _.get(cardInput, 'steps[1].subSteps[1].personalImageUrl'),
        artwork: _.get(cardInput, 'steps[0].artwork')
      }
    },
    mailingInfo: {
      sender: {
        name: `${cardInput.firstName} ${cardInput.lastName}`,
        addressStreet: cardInput.streetAddress,
        city: cardInput.city,
        state: cardInput.state,
        zip: cardInput.zip
      },
      recipients: matchRecipients(cardInput.recipients, cardInput.addresses)
    },
    artifacts: {
      png: {
        front: null,
        back: null
      },
      pdf: {
        front: null,
        back: null
      }
    }
  };
};
