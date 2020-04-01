const express = require('express');
const app = express();
const PORT = 8080;
const Models = require('./database/connections/sequelize')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(PORT, async() => {

  console.log(`Server running at: http://localhost:${PORT}/`);
});