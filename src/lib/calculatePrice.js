import numeral from 'numeral';
export const calculatePrice = (numRecipients = [], type) => {
  // console.log('ceiling', Math.ceil(5 / 5 - 1));
  // console.log('calculating price', numRecipients.length * 2 - (numRecipients.length >= 5 && Math.ceil(numRecipients.length / 5 - 1) * 2))
  switch(type) { // eslint-disable-line
  case 'dollar-value':
    return numeral(numRecipients.length * 2 - (numRecipients.length >= 5 && Math.ceil(numRecipients.length / 5 - 1) * 2)).format('$0.00');
  case 'dollar-value-with-tax':
    const totalPreTaxBeforeDiscount = numRecipients.length * 2; //- (numRecipients.length >= 5 && Math.ceil(numRecipients.length / 5 - 1) * 2);
    const discountCalc = (numRecipients.length >= 5 && Math.ceil(numRecipients.length / 5 - 1) * 2) ? (numRecipients.length >= 5 && Math.ceil(numRecipients.length / 5 - 1) * 2) : 0;
    const totalPreTax = totalPreTaxBeforeDiscount - discountCalc;
    return numeral(totalPreTax + (totalPreTax * .07)).format('$0,00.00');
  case 'stripe-with-tax':
    const tot = numRecipients.length * 2; // - (numRecipients.length >= 5 && Math.ceil(numRecipients.length / 5 - 1) * 2);
    const disc = (numRecipients.length >= 5 && Math.ceil(numRecipients.length / 5 - 1) * 2) ? (numRecipients.length >= 5 && Math.ceil(numRecipients.length / 5 - 1) * 2) : 0;
    const totPreTax = tot - disc;
    return totPreTax + (totPreTax * .07);
  case 'stripe':
    return numRecipients.length * 2 - (numRecipients.length >= 5 && Math.ceil(numRecipients.length / 5 - 1) * 2);
  case 'sales-tax':
    const total = numRecipients && numRecipients.length && numRecipients.length * 2;
    const discount = (numRecipients.length >= 5 && Math.ceil(numRecipients.length / 5 - 1) * 2) ? (numRecipients.length >= 5 && Math.ceil(numRecipients.length / 5 - 1) * 2) : 0;
    return numeral((total - discount) * .07).format('$0,00.00');
  // default:
  //   return numeral(numRecipients.length * 2 - (numRecipients.length >= 5 && Math.ceil(numRecipients.length % 5 - 1) * 2)).format('$0.00');
  }
};
