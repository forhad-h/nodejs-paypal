module.exports = (accessToken, planId) => `
  curl -v -k -X POST https://api.sandbox.paypal.com/v1/billing/subscriptions \
    -H "Accept: application/json" \
    -H "Authorization: Bearer ${accessToken}" \
    -H "PayPal-Request-Id: SUBSCRIPTION-21092019-001" \
    -H "Prefer: return=representation" \
    -H "Content-Type: application/json" \
    -d '{
        "plan_id": "${planId}",
        "start_time": "2019-11-08T06:00:00Z",
        "subscriber": {
          "name": {
            "given_name": "John",
            "surname": "Doe"
          },
          "email_address": "customer@example.com"
        },
        "application_context": {
          "brand_name": "example",
          "locale": "en-US",
          "shipping_preference": "SET_PROVIDED_ADDRESS",
          "user_action": "SUBSCRIBE_NOW",
          "payment_method": {
            "payer_selected": "PAYPAL",
            "payee_preferred": "IMMEDIATE_PAYMENT_REQUIRED"
          },
          "return_url": "http://127.0.0.1:8080/returnUrl",
          "cancel_url": "http://127.0.0.1:8080/cancelUrl"
        }
      }'
`
