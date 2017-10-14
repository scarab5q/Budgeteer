const express = require('express')
const app = express()
const PORT = 3000 
require('dotenv').config()


// respond with "hello world" when a GET request is made to the homepage
app.get('/api', function (req, res) {
  res.send('hello world')
})
app.get('/budget', function(comfort,days,location) {

})
// app.get('/comfort', function())
// app.get('/days', function())
// app.get('/location', function())

app.use('/', express.static('public'))


app.listen(PORT)
console.log("Running at http://localhost:3000")
