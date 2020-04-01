const express = require('express');
const app = express();
const PORT = 8080;
const Models = require('./database/connections/sequelize')
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger/index')
const categoryRoutes = require('./routes/rooms/category')
const roomRoutes = require('./routes/rooms/')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/category', categoryRoutes)
app.use('/room', roomRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
});
app.listen(PORT, async() => {

  console.log(`Server running at: http://localhost:${PORT}/`);
});