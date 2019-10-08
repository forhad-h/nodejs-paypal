module.exports = `
  curl -v https://api.sandbox.paypal.com/v1/oauth2/token \
    -H "Accept: application/json" \
    -H "Accept-Language: en_US" \
    -u "${process.env.CLIENT_ID}:${process.env.SECRET_KEY}" \
    -d "grant_type=client_credentials"
`
