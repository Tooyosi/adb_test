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
const createSubscriber =  require("pg-listen")
const { Pool, Client } = require('pg')

const client = new Client("postgres://postgres: @127.0.0.1/adb_test")

let connectionfn = async ()=>{
  let cli = await client.connect()

 
}

client.connect()
const query = client.query('LISTEN addedrecord')

// connectionfn()
// client.on()
const subscriber = createSubscriber({ connectionString: "postgres://postgres: @127.0.0.1/adb_test" })

// subscriber.events.on("error", (error) => {
//   console.error("Fatal database connection error:", error)
//   process.exit(1)
// })
// subscriber.notifications.on("rooms", (payload) => {
//   // Payload as passed to subscriber.notify() (see below)
//   console.log("Received notification in 'my-channel':", payload)
// })
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
  if(request.resourceURL.pathname == "/admin"){
    connection.on("open", () => console.log("Opennnn"))
    connection.on("close", () => console.log("CLOSED"))
    connection.on("message", (message) => {
      console.log(`Received message ${message.utf8Data}`)
    })
  
    client.on('notification', async(data)=>{
      // connection.send(data.payload)
      let {id} = JSON.parse(data.payload)
      let room = await Models.Rooms.findOne({
        where:{
          id: id
        },
        include: {
          model: Models.RoomsCategory,
          as: "category"
      }
      })
      connection.send(`Room with id ${id} has just been booked. Room category is ${room.category.name}, description is ${room.category.description} and number of beds is ${room.category.no_of_beds}`)
      // console.log(data)
      // socketObj.push(data.payload)
    })
    connection.send("Hello client")
  }

  // sendEvery5seconds()
})

async function sendEvery5seconds() {

  let rooms = await Models.Rooms.findAll()
  connection.send(JSON.stringify(rooms))

  setTimeout(sendEvery5seconds, 500)

}


app.use('/category', categoryRoutes)
app.use('/room', roomRoutes)
app.use('/booking', bookingsRoutes)


app.get("/admin", async (req, res) => {
  let socketObj = []
  
  
  await client.on('notification', async(data)=>{
    // connection.send(data.payload)
    console.log(data)
    socketObj.push(data.payload)
  })

  webSocket.on("request", (request) => {

    connection = request.accept(null, request.origin)
    connection.on("open", () => console.log("Opennnn"))
    connection.on("close", () => console.log("CLOSED"))
    connection.on("message", (message) => {
      console.log(`Received message ${message.utf8Data}`)
    })
  
    // connection.send(socketObj)
  
    

  })
  
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

