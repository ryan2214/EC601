const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')
var fs = require("fs")

fs.open('record.txt', 'a+', function(err, fd) {
   if (err) {
      return console.error(err);
   }
   console.log("record file ready!");
});

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/',(req, res) => {
    res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        console.log(roomId, userId)
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId)

        fs.appendFile('record.txt', String(userId)+'\n', ['utf8','0666','a'], function(err) {
            if (err) {
               return console.error(err);
            }
            console.log("userId recorded successfully!");
         });

        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId)
        })
    })
})

server.listen(process.env.PORT || 5000)