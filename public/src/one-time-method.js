import paypal from 'paypal-checkout'
import client from 'braintree-web/client'
import paypalCheckout from 'braintree-web/paypal-checkout'

const serverUrl = 'http://localhost:8008'

fetch(`${serverUrl}/client_token`, {
  method: 'GET'
})
  .then(res => res.json())
  .then(data => {
    // render Paypal button
    paypal.Button.render(
      {
        env: 'sandbox',
        braintree: {
          client: client,
          paypalCheckout: paypalCheckout
        },
        client: {
          sandbox: data.clientToken
        },
        commit: true, // This will add the transaction amount to the Paypal button
        payment: (data, actions) => {
          return actions.braintree.create({
            flow: 'checkout', // required, 'checkout' for one-time payment
            amount: '1.04',
            currency: 'USD'
          })
        },
        onAuthorize: payload => {
          data = {
            nonce: payload.nonce,
            amount: '1.04'
          }
          fetch(`${serverUrl}/checkout`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
        }
      },
      '#paypal-button'
    )
  })
  .catch(err => console.log(err))
