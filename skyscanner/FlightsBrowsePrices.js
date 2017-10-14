const rp = require('request-promise-native')

async function BrowseRoutes (country, currency, locale, originPlace, destinationPlace, outboundPartialDate, inboundPartialDate) {
  let options = {
    method: 'GET',
    uri: `http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/${country}/${currency}/${locale}/${originPlace}/${destinationPlace}/${outboundPartialDate}/${inboundPartialDate}`,
    qs: {
      apiKey: process.env.SKYSCANNER_KEY,
    },
    json: true // Automatically stringifies the body to JSON
  }
  try {
    let response = await rp(options)
    return response
  } catch (e) {
    throw e
  }
}

module.exports = {
  // browseroutes/v1.0/{country}/{currency}/{locale}/
  // {originPlace}/{destinationPlace}/{outboundPartialDate}/{inboundPartialDate}
  BrowseRoutes: BrowseRoutes
}
