import {Endpoint} from './skyscanner'
const rp = require('request-promise-native')

export class BrowseRoutes {
  // browseroutes/v1.0/{country}/{currency}/{locale}/
  // {originPlace}/{destinationPlace}/{outboundPartialDate}/{inboundPartialDate}
  constructor (country, currency, localte, originPlace, destinationPlace, outboundPartialDate, inboundPartialDate) {
    let options = {
      method: 'GET',
      uri: `${Endpoint}/browsequotes/v1.0/`,
      body: {
        some: 'payload'
      },
      json: true // Automatically stringifies the body to JSON
    }
  }
}
