const express = require('express')
const app = express()
const PORT = 3000 
require('dotenv').config()
var jsonObj = require('./nomad')
console.log(jsonObj.return[0].short_term_cost_in_usd/30)

// respond with "hello world" when a GET request is made to the homepage
app.get('/api', function (req, res) {
  res.send('hello world')
})
app.get('/search', function (req, res) {
  console.log(jsonObj.short_term_cost_in_usd[1])
})
app.use('/', express.static('public'))

// app.listen(PORT)
// console.log("Running at http://localhost:3000")
// app.close()