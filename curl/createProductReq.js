module.exports = accessToken => `
  curl -v -X POST https://api.sandbox.paypal.com/v1/catalogs/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${accessToken}" \
  -H "PayPal-Request-Id: merchant-generated-ID" \
  -d '{
  "name": "Test service",
  "description": "Test service as a product",
  "type": "SERVICE",
  "category": "SOFTWARE"
  }'
`
