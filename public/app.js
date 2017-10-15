function encodeQs(params) {
  var query = Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&')
  return '?' + query
}

async function queryNewFlights() {
  let data = {
    origin: 'uk',
    destination: 'anywhere',
    departing: 'anytime',
    returning: 'anytime'
  }
  try {
    let response = await fetch('/api/flights' + encodeQs(data))
    return await response.json()
  } catch (e) {
    console.log(e)
    throw e
  }  
}

function findCountryCosts(flights) {
  let country = {}
  
  flights.forEach((f) => {
    console.log(f)
    if (country[f.OutboundLeg.Destination.CountryName] !== undefined) {
      let cData = country[f.OutboundLeg.Destination.CountryName]
      cData.push(f.MinPrice)
      country[f.OutboundLeg.Destination.CountryName] = cData
    } else {
      country[f.OutboundLeg.Destination.CountryName] = [f.MinPrice]
    }
  })
  return country
}

async function mergeResults() {
  let flights = await queryNewFlights()
  
  let countryCosts = findCountryCosts(flights)
  
  for(let i = 0; i <euCountries.features.length; i++ ) {
    if(countryCosts[euCountries.features[i].properties.sovereignt]) {
      let cost = countryCosts[euCountries.features[i].properties.sovereignt]
      
      if(cost < 40) {
        euCountries.features[i].properties.mapcolor7 = 0
      }
      if(cost < 100 && cost > 40) {
        euCountries.features[i].properties.mapcolor7 = 1
      }
      if(cost < 150 && cost > 100) {
        euCountries.features[i].properties.mapcolor7 = 2
      }
      if(cost < 200 && cost > 150) {
        euCountries.features[i].properties.mapcolor7 = 3
      }
      if(cost < 300 && cost > 200) {
        euCountries.features[i].properties.mapcolor7 = 4
      }
    }
  }
}
