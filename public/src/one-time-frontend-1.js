import { CLIENT_ID } from './config'

paypal.Button.render(
  {
    // configure environment
    env: 'sandbox',
    client: {
      sandbox: CLIENT_ID
    },

    // Customize button - optional
    locale: 'en_US',
    style: {
      size: 'small',
      color: 'gold',
      shape: 'pill'
    },

    // Enable Pay Now checkout flow - optional
    commit: true,

    // Set up a payment
    payment: (data, actions) => {
      return actions.payment.create({
        transactions: [
          {
            amount: {
              total: '30.11',
              currency: 'USD',
              details: {
                subtotal: '30.00',
                tax: '0.07',
                shipping: '0.03',
                handling_fee: '1.00',
                shipping_discount: '-1.00',
                insurance: '0.01'
              }
            },
            description: 'The payment transaction description.',
            custom: 'The note to the payer in this transaction.',
            invoice_number: `invoice-${Math.random() *
              1000000}`, // NOTE: must be unique
            payment_options: {
              allowed_payment_method: 'INSTANT_FUNDING_SOURCE'
            },
            item_list: {
              items: [
                {
                  name: 'hat',
                  description: 'Brown hat.',
                  quantity: '5',
                  price: '3',
                  tax: '0.01',
                  sku: '1',
                  currency: 'USD'
                },
                {
                  name: 'handbag',
                  description: 'Black handbag.',
                  quantity: '1',
                  price: '15',
                  tax: '0.02',
                  sku: 'product34',
                  currency: 'USD'
                }
              ],
              shipping_address: {
                recipient_name: 'Brian Robinson',
                line1: '4th Floor',
                line2: 'Unit #34',
                city: 'San Jose',
                country_code: 'US',
                postal_code: '95131',
                phone: '011862212345678',
                state: 'CA'
              }
            }
          }
        ]
      })
    },

    // execute the payment
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then(res => {
        console.log(res)
        window.alert('Thank you for you purchase!')
      })
    }
  },
  '#paypal-button'
)
