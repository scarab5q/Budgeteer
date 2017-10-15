function encodeQs (params) {
  var query = Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&')
  return '?' + query
}

async function queryNewFlights () {
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

function findCountryCosts (flights) {
  let country = {}
  
  flights.forEach((f) => {
    // console.log(f)
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

async function mergeResults () {
  let flights = await queryNewFlights()
  
  let countryCosts = findCountryCosts(flights)
  console.log(euCountries.features.length)
  for (let i = 0; i < euCountries.features.length; i++) {
    if (countryCosts[euCountries.features[i].properties.sovereignt]) {
      let cost = countryCosts[euCountries.features[i].properties.sovereignt][0]
      console.log(cost)
      if (cost < 40) {
        console.log(0)
        euCountries.features[i].properties.bdgColor = 4
        continue
      }
      if (cost < 90) {
        euCountries.features[i].properties.bdgColor = 3
        continue
      }
      if (cost < 130) {
        euCountries.features[i].properties.bdgColor = 2
        continue
      }
      if (cost < 200) {
        euCountries.features[i].properties.bdgColor = 1
        continue
      }
        euCountries.features[i].properties.bdgColor = 0
    }
  }
  
  var vectorGrid = L.vectorGrid.slicer(euCountries, {
    rendererFactory: L.svg.tile,
    vectorTileLayerStyles: {
      sliced: function (properties, zoom) {
        var p = properties.bdgColor
        return {
          fillColor: p === 0 ? '#000000'
            : p === 1 ? '#f60c00'
              : p === 2 ? '#f66300'
                : p === 3 ? '#f6ec00' : p === 4 ? '#6cf600' : '',
          fillOpacity: 0.5,
          // 					fillOpacity: 1,
          stroke: true,
          fill: true,
          color: 'black',
          // 							opacity: 0.2,
          weight: 0,
        }
      }
    },
    interactive: true,
    getFeatureId: function (f) {
      return f.properties.wb_a3
    }
  })
    .on('mouseover', function (e) {
      var properties = e.layer.properties
      L.popup()
        .setContent(properties.name || properties.type)
        .setLatLng(e.latlng)
        .openOn(map)

      clearHighlight()
      highlight = properties.wb_a3
      var p = properties.bdgColor % 5
      var style = {
        fillColor: p === 0 ? '#ED7273'
          : p === 1 ? '#E31A1C'
            : p === 2 ? '#FEB24C'
              : p === 3 ? '#B2FE4C' : '#FFEDA0',
        fillOpacity: 0.5,
        fillOpacity: 1,
        stroke: true,
        fill: true,
        color: 'red',
        opacity: 1,
        weight: 2,
      }

      vectorGrid.setFeatureStyle(properties.wb_a3, style)
    })
    .addTo(map)
  
  var highlight
  var clearHighlight = function () {
    if (highlight) {
      vectorGrid.resetFeatureStyle(highlight)
    }
    highlight = null
  }

  map.on('click', clearHighlight)
}
