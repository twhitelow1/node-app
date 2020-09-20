var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var messages = [
  { name: "Tim", message: "Hi!" },
  { name: "Todd", message: "Howdy, Tim!" }
]

app.get('/messages', (req, res) => {
  res.send(messages)
})

app.post('/messages', (req, res) => {
  messages.push(req.body)
  io.emit('message', req.body) //event called message and passes req.body which contains the msg
  res.sendStatus(200)
})

io.on('connection', (socket) => {
  console.log('a user connected')
})

var server = http.listen(3000, () => console.log('Server is listening on port', server.address().port))