var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose',)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.Promise = Promise

var dbUrl = 'mongodb+srv://ras-20:E1G2QzIRaxtQMG21@nodechat.i95u3.mongodb.net/nodechat?retryWrites=true&w=majority'

var Message = mongoose.model('Message', {
  name: String,
  message: String
})


app.get('/messages', (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages)
  })
})

app.post('/messages', async (req, res) => {
  try {
    var message = new Message(req.body)
    var savedMessage = await message.save()
    io.emit('message', req.body) //event called message and passes req.body which contains the msg
    res.sendStatus(200)

  } catch (error) {
    res.sendStatus(500)
    return console.error(err)
  }
})

io.on('connection', (socket) => {
  console.log('a user connected')
})

mongoose.connect(dbUrl, { useMongoClient: true }, (err) => {
  console.log('mongo db connection', err)
})

var server = http.listen(3000, () => console.log('Server is listening on port', server.address().port))