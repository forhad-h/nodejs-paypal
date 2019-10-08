require('dotenv').config()
const express = require('express')
const braintree = require('braintree')
const bodyParse = require('body-parser')

const app = express()

app.use(express.static('public'))
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))

const gateway = braintree.connect({
  // access token generated in paypal dashboard under "My Apps & Credentials"
  accessToken: process.env.BRAINTREE_ACCESS_TOKEN
})

app.get('/client_token', (req, res) => {
  // generate the client token
  gateway.clientToken.generate({}, (err, response) => {
    res.send({ clientToken: response.clientToken })
  })
})

app.post('/checkout', (req, res) => {
  const saleRequest = {
    amount: req.body.amount,
    merchantAccountId: 'USD',
    paymentMethodNonce: req.body.nonce,
    orderId: `invoice-${Math.random() *
      1000000}`, // NOTE: must be unique,
    options: {
      paypal: {
        customField: 'PayPal custom field',
        description: 'Description for PayPal email receipt'
      },
      submitForSettlement: true
    }
  }

  // make transaction
  gateway.transaction.sale(saleRequest, (err, result) => {
    if (err) res.send({ error: err })
    else if (result.success) res.send({ transId: result.transaction.id })
    else res.send({ errMsg: result.message })
  })
})

app.listen(8008, () => {
  console.log('🚀  Server running on http://localhost:8008')
})
