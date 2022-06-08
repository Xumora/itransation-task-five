const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoute")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")
const cors = require('cors')
const path = require('path')

dotenv.config()

connectDB()
const app = express()

const server = require('http').createServer(app)
app.use(cors())
app.use(express.json({ extended: true }))

app.use('/api/user', userRoutes)
app.use('/api/message', messageRoutes)

const __dirname1 = path.resolve()
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, 'frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000"
    }
})

io.on("connection", (socket) => {
    console.log('Connected to socket.io');
    socket.on('setup', (userData) => {
        console.log(`User id is ${userData.id}`);
    })

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(data);
    })

    socket.on('send_message', (data) => {
        socket.to(data.data.recipient._id).emit('recieve_message', { data: data.data })
        socket.to(data.data.sender._id).emit('recieve_sent_message', { data: data.data })
    })
})

