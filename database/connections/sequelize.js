const Sequelize = require('sequelize');

// const UserModel = require("../models/user")
const RoomsModel = require("../models/rooms");

const sequelize = require('./connection')

var models = {}
models.Rooms = RoomsModel(sequelize, Sequelize)


sequelize.sync()
    .then((res) => {

        console.log("Db Connnected")
    })
    .catch((err) => {
        console.log(err)
    })

module.exports = models;