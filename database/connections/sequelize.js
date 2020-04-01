const Sequelize = require('sequelize');

// const UserModel = require("../models/user")
const RoomsModel = require("../models/rooms");
const RoomsCategoryModel = require("../models/room_categories");

const sequelize = require('./connection')

var models = {}
models.Rooms = RoomsModel(sequelize, Sequelize)
models.RoomsCategory = RoomsCategoryModel(sequelize, Sequelize)

// models.Rooms.hasMany(models.RoomsCategory, {
//         onDelete: 'CASCADE',
//         foreignKey: 'category_id',
//         as: 'category'
//       })

models.Rooms.belongsTo(models.RoomsCategory, { foreignKey: "category_id", as: "category", })

sequelize.sync()
    .then((res) => {

        console.log("Db Connnected")
    })
    .catch((err) => {
        console.log(err)
    })

module.exports = models;