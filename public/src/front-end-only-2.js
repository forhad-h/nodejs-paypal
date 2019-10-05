import paypal from 'paypal-checkout'

paypal.Button.render(
  {
    // configure environment
    env: 'sandbox',
    client: {
      sandbox:
        'Abi4btry_a2v30yxEbmatjdnz_AQ-hdV6D3iN_Zf1JqftASHHMsrp2YSg2LH7khB0F82PrTsv5v9OBwB'
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
