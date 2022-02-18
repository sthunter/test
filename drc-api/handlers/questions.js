const axios = require('axios')

module.exports = async (event, context) => {
  // aws lambda using api gateway

  const body = event.body
  const id = event.queryStringParameter.id

  try {
    const res = await axios.get(`${process.ENV.TEST_URL}/test?id=${id}`)
    return context.succed(res.body)
  } catch (error) {
    return context.fail({
      error
    })
  }
}