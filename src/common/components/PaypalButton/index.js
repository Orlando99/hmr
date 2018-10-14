/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButton: true,
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  render() {
    const {
      total,
      currency,
      env,
      commit,
      client,
      onSuccess,
      onError,
      onCancel,
    } = this.props;
    console.log('client in comp is', client);

    const {
      showButton,
    } = this.state;

    const payment = () =>
      window.paypal.rest.payment.create(env, client, {
        transactions: [
          {
            amount: {
              total,
              currency,
            }
          },
        ],
      });

    const onAuthorize = (data, actions) =>
      actions.payment.execute()
        .then(() => {
          const payment = {
            paid: true,
            cancelled: false,
            payerID: data.payerID,
            paymentID: data.paymentID,
            paymentToken: data.paymentToken,
            returnUrl: data.returnUrl,
          };

          onSuccess(payment);
        });
    let PayPalButton = window.paypal.Button.driver('react', {
      React: window.React,
      ReactDOM: window.ReactDOM
    });
    return (
      <div className='hmr-paypal-wrap'>
        <PayPalButton
          env={env}
          client={client}
          commit={commit}
          payment={payment}
          onAuthorize={onAuthorize}
          onCancel={onCancel}
          onError={onError}
        />
      </div>
    );
  }
}

export default PaypalButton;
