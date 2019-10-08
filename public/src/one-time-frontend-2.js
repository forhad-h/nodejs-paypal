import paypal from 'paypal-checkout'
import { CLIENT_ID } from './config'

paypal.Button.render(
  {
    // configure environment
    env: 'sandbox',
    client: {
      sandbox: CLIENT_ID
    },
    locale: 'en_US',
    style: {
      size: 'small',
      color: 'gold',
      shape: 'pill'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        transactions: [
          {
            amount: {
              total: '0.1',
              currency: 'USD'
            }
          }
        ]
      })
    },
    onAuthorize: (data, actions) => {
      return actions.payment
        .execute()
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log(err))
    }
  },
  '#paypal-button'
)
