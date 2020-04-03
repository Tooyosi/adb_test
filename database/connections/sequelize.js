const Sequelize = require('sequelize');

const RoomsModel = require("../models/rooms");
const RoomsCategoryModel = require("../models/room_categories");
const BookingsModel = require("../models/bookings");

const sequelize = require('./connection')

var models = {}
models.Rooms = RoomsModel(sequelize, Sequelize)
models.RoomsCategory = RoomsCategoryModel(sequelize, Sequelize)
models.Bookings = BookingsModel(sequelize, Sequelize)


models.Rooms.belongsTo(models.RoomsCategory, { foreignKey: "category_id", as: "category" })
models.RoomsCategory.hasMany(models.Rooms,  {foreignKey: "category_id", onDelete: 'cascade', hooks: true })
models.Bookings.belongsTo(models.Rooms, { foreignKey: "room_id", as: "room" })
models.Rooms.hasMany(models.Bookings,  {foreignKey: "room_id",  onDelete: 'cascade', hooks: true })

// models.Rooms.hooks('afterCreate', ()=>{
    
// })
sequelize.sync()
    .then((res) => {

        console.log("Db Connnected")
    })
    .catch((err) => {
        console.log(err)
    })

module.exports = models;