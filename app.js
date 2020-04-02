const WebSocketServer = require("websocket").server;
let connection
const express = require('express');
const http = require("http");
const app = express();
const PORT = 8080;
const Models = require('./database/connections/sequelize')
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger/index')
const categoryRoutes = require('./routes/rooms/category')
const roomRoutes = require('./routes/rooms/')
const bookingsRoutes = require('./routes/bookings/index')

const models = require('./database/connections/sequelize')

const adminRoutes = require('./routes/admin/')

let server = http.createServer(app)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const webSocket = new WebSocketServer({
  "httpServer": server
})

webSocket.on("request", (request) => {

  connection = request.accept(null, request.origin)
  connection.on("open", () => console.log("Opennnn"))
  connection.on("close", () => console.log("CLOSED"))
  connection.on("message", (message) => {
    console.log(`Received message ${message.utf8Data}`)
  })

  connection.send("Hello client")

  sendEvery5seconds()
})

async function sendEvery5seconds() {

  let rooms = await Models.Rooms.findAll()
  connection.send(JSON.stringify(rooms))

  setTimeout(sendEvery5seconds, 500)

}


app.use('/category', categoryRoutes)
app.use('/room', roomRoutes)
app.use('/booking', bookingsRoutes)


app.get("/admin", (req, res) => {
 

})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});
server.listen(PORT, async () => {

  console.log(`Server running at: http://localhost:${PORT}/`);
});

module.exports = server

