var express = require('express')
var app = express()

app.use(express.static(__dirname))

app.get('/messages', (req, res) => {
  res.send('hello')
})

var server = app.listen(3000, () => console.log('Server is listening on port', server.address().port))