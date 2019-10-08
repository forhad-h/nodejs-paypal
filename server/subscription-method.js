require('dotenv').config()
const { exec } = require('child_process')
const {
  accessTokenReq,
  createProductReq,
  createPlanReq,
  createSubscription
} = require('../curl/')

/*
  'request' module is best for following types of operation in real app
  use command line 'curl' for testing purpose only

  the actual 'exec' function is -
  exec(command, (err, stdout, stderr) => {
    // do something
  })
  -> here 'stderr' yields request status here, so ignore it for now

*/

/*
  Get access token
*/
let access_token = ''

exec(accessTokenReq, (err, stdout) => {
  if (err) return
  access_token = JSON.parse(stdout).access_token
  console.log(access_token)
  /*
    Create Product
  */

  exec(createProductReq(access_token), (err, stdout) => {
    if (err) return

    productId = JSON.parse(stdout).id
    console.log(productId)

    /*
      Create Plan
    */
    exec(createPlanReq(access_token, productId), (err, stdout) => {
      if (err) return
      planId = JSON.parse(stdout).id
      console.log(planId)

      /*
        Create Subscription
      */
      exec(createSubscription(access_token, planId), (err, stdout) => {
        if(err) return
        console.log(JSON.parse(stdout))
      })
    })
  })
})
