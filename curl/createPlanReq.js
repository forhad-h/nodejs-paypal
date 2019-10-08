module.exports = (accessToken, productId) => `
  curl -v -k -X POST https://api.sandbox.paypal.com/v1/billing/plans \
    -H "Accept: application/json" \
    -H "Authorization: Bearer ${accessToken}" \
    -H "PayPal-Request-Id: PLAN-18062019-001" \
    -H "Prefer: return=representation" \
    -H "Content-Type: application/json" \
    -d '{
        "product_id": "${productId}",
        "name": "Basic Plan",
        "description": "Basic plan",
        "billing_cycles": [
          {
            "frequency": {
              "interval_unit": "MONTH",
              "interval_count": 1
            },
            "tenure_type": "TRIAL",
            "sequence": 1,
            "total_cycles": 1
          },
          {
            "frequency": {
              "interval_unit": "MONTH",
              "interval_count": 1
            },
            "tenure_type": "REGULAR",
            "sequence": 2,
            "total_cycles": 12,
            "pricing_scheme": {
              "fixed_price": {
                "value": "10",
                "currency_code": "USD"
              }
            }
          }
        ],
        "payment_preferences": {
          "auto_bill_outstanding": true,
          "setup_fee": {
            "value": "10",
            "currency_code": "USD"
          },
          "setup_fee_failure_action": "CONTINUE",
          "payment_failure_threshold": 3
        },
        "taxes": {
          "percentage": "10",
          "inclusive": false
        }
      }'
`
