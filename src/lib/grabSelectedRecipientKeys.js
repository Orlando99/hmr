export const grabSelectedRecipientKeys = (recipients) => {
  const keys = [];
  if(recipients) {
    recipients.forEach((recipient, key) => {
      if(recipient){
        keys.push(key);
      }
    });
  }
  return keys;
};
