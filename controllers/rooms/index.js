const Models = require('../../database/connections/sequelize')
const { logger } = require('../../loggers/logger')
const ResponseClass = require('../../helpers/ResponseClass');
const { successStatus, failureStatus, validationError, successCode, failureCode } = require('../../helpers/');
module.exports = {
    postRoom: ('/', async (req, res) => {
        let { categoryId, } = req.body;
        let response
        if (categoryId < 1 || typeof (categoryId) !== "number") {
            response = new ResponseClass(failureStatus, validationError, failureCode, {});
            return res.status(400).send(response)
        }

        let category = await Models.RoomsCategory.findOne({
            where: {
                id: categoryId
            }
        })
        if (category == null || category == undefined) {
            response = new ResponseClass(failureStatus, "Category doesnt exist", failureCode, {});
            return res.status(400).send(response)
        }
        try {
            let newRoom = await Models.Rooms.create({
                category_id: categoryId,
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            response = new ResponseClass(successStatus, successStatus, successCode, {})
            return res.status(200).send(response)
        } catch (error) {
            logger.error(error.toString())
            response = new ResponseClass(failureStatus, error.toString(), failureCode, {})
            return res.status(200).send(response)
        }

    }),

    getOneRooms: ('/', async (req, res) => {
        let { id } = req.params
        try {
            let getRoom = await Models.Rooms.findOne({
                where: {
                    id: id
                },
                include: {
                    model: Models.RoomsCategory,
                    as: "category"
                }
            })
            if (getRoom == null || getRoom == undefined) {
                response = new ResponseClass(failureStatus, "Room not found", failureCode, {});
                return res.status(404).send(response)
            } else {
                response = new ResponseClass(successStatus, successStatus, successCode, getRoom)
                return res.status(200).send(response)
            }
        } catch (error) {
            logger.error(error.toString())
            response = new ResponseClass(failureStatus, error.toString(), failureCode, {})
            return res.status(200).send(response)
        }
    }),
    getAllRooms: ('/', async (req, res) => {

        try {
            let getAllRooms = await Models.Rooms.findAll({
                include: {
                    model: Models.RoomsCategory,
                    as: "category"
                }
            })
            response = new ResponseClass(successStatus, successStatus, successCode, getAllRooms)
            return res.status(200).send(response)
        } catch (error) {
            logger.error(error.toString())
            response = new ResponseClass(failureStatus, error.toString(), failureCode, {})
            return res.status(200).send(response)
        }
    }),

    editRoom: ('/', async (req, res) => {
        let { id } = req.params
        let { categoryId, isBooked } = req.body;
        let response, category
        // if (checkinDate.trim() == "" && categoryId < 1 && checkOutDate.trim() == "" && typeof (categoryId) !== "number") {
        //     response = new ResponseClass(failureStatus, validationError, failureCode, {});
        //     return res.status(400).send(response)
        // } else
        if (categoryId && categoryId < 1) {
            response = new ResponseClass(failureStatus, "Category doesnt exist", failureCode, {});
            return res.status(400).send(response)
        }
        if (categoryId !== undefined) {
            category = await Models.RoomsCategory.findOne({
                where: {
                    id: categoryId
                }
            })
            if (category == null || category == undefined) {
                response = new ResponseClass(failureStatus, "Category doesnt exist", failureCode, {});
                return res.status(400).send(response)
            }
        }
        let updateObj = {
            updatedAt: new Date(),
            isBooked: isBooked
        }
        if (categoryId) {
            updateObj.category_id = categoryId
        }
        try {
            let foundRoom = await Models.Rooms.findOne({
                where: {
                    id: id
                }
            })

            if (foundRoom !== null && foundRoom !== undefined) {
                await foundRoom.update(updateObj)
                response = new ResponseClass(successStatus, successStatus, successCode, {})
                return res.status(200).send(response)
            } else {
                response = new ResponseClass(failureStatus, "Room not found", failureCode, {});
                return res.status(404).send(response)
            }
        } catch (error) {
            logger.error(error.toString())
            response = new ResponseClass(failureStatus, error.toString(), failureCode, {})
            return res.status(200).send(response)
        }
    }),

    deleteRoom: ('/', async (req, res) => {
        let { id } = req.params
        let response
        try {
            let foundRoom = await Models.Rooms.findOne({
                where: {
                    id: id
                }
            })

            if (foundRoom !== null && foundRoom !== undefined) {
                await foundRoom.destroy()
                response = new ResponseClass(successStatus, successStatus, successCode, {})
                return res.status(200).send(response)
            } else {
                response = new ResponseClass(failureStatus, "Room not found", failureCode, {});
                return res.status(404).send(response)
            }
        } catch (error) {
            logger.error(error.toString())
            response = new ResponseClass(failureStatus, error.toString(), failureCode, {})
            return res.status(200).send(response)
        }
    }),

    bookRoom: ('/', async (req, res) => {
        let { id } = req.params
        let { checkInDate, checkOutDate } = req.body
        if (checkInDate.trim() == "" || checkOutDate.trim() == "") {
            response = new ResponseClass(failureStatus, validationError, failureCode, {});
            return res.status(400).send(response)
        }
        let response
        try {
            let room = await Models.Rooms.findOne({
                where: { id: id }
            })

            if (room == null || room == undefined) {
                response = new ResponseClass(failureStatus, "Room not found", failureCode, {});
                return res.status(404).send(response)
            }
            if (room.isBooked == true) {
                response = new ResponseClass(failureStatus, "Room is currently booked", failureCode, {});
                return res.status(400).send(response)
            }
            let newBooking = await Models.Bookings.create({
                room_id: id,
                checkin_date: new Date(checkInDate),
                checkout_date: new Date(checkOutDate),
                createdAt: new Date(),
                updatedAt: new Date()
            })

            await room.update({
                isBooked: true,
                updatedAt: new Date()
            })
            response = new ResponseClass(successStatus, successStatus, successCode, {})
            return res.status(200).send(response)
        } catch (error) {
            logger.error(error.toString())
            response = new ResponseClass(failureStatus, error.toString(), failureCode, {})
            return res.status(200).send(response)
        }
    }),

    editBookedRoom: ('/', async (req, res) => {
        let { id, bookingId } = req.params
        let { checkInDate, checkOutDate, isBooked } = req.body
        if (checkInDate.trim() == "" && checkOutDate.trim() == "" && typeof (isBooked) !== "boolean") {
            response = new ResponseClass(failureStatus, validationError, failureCode, {});
            return res.status(400).send(response)
        }
        let response
        try {
            let room = await Models.Rooms.findOne({
                where: { id: id }
            })

            if (room == null || room == undefined) {
                response = new ResponseClass(failureStatus, "Room not found", failureCode, {});
                return res.status(404).send(response)
            }
            let updateObj = {
                updatedAt: new Date()
            }
            if (checkInDate && checkInDate.trim() !== "") {
                updateObj.checkin_date = new Date(checkInDate)
            }

            if (checkOutDate && checkOutDate.trim() !== "") {
                updateObj.checkout_date = new Date(checkOutDate)
            }
            let foundBooking = await Models.Bookings.findOne({
                where: {
                    id: bookingId,
                    room_id: id
                }
            })

            if (foundBooking == null || room == foundBooking) {
                response = new ResponseClass(failureStatus, "Booking not found", failureCode, {});
                return res.status(404).send(response)
            }
            await foundBooking.update(updateObj)
            await room.update({
                isBooked: isBooked,
                updatedAt: new Date()
            })
            response = new ResponseClass(successStatus, successStatus, successCode, {})
            return res.status(200).send(response)
        } catch (error) {
            logger.error(error.toString())
            response = new ResponseClass(failureStatus, error.toString(), failureCode, {})
            return res.status(200).send(response)
        }
    }),

    deleteBookedRoom: ('/', async (req, res) => {
        let { id, bookingId } = req.params
        try {
            let room = await Models.Rooms.findOne({
                where: { id: id }
            })

            if (room == null || room == undefined) {
                response = new ResponseClass(failureStatus, "Room not found", failureCode, {});
                return res.status(404).send(response)
            }

            let foundBooking = await Models.Bookings.findOne({
                where: {
                    id: bookingId,
                    room_id: id
                }
            })

            if (foundBooking == null || room == foundBooking) {
                response = new ResponseClass(failureStatus, "Booking not found", failureCode, {});
                return res.status(404).send(response)
            }else{
                await foundBooking.destroy()
            response = new ResponseClass(successStatus, successStatus, successCode, {})
            return res.status(200).send(response)
            }

        } catch (error) {
            logger.error(error.toString())
            response = new ResponseClass(failureStatus, error.toString(), failureCode, {})
            return res.status(200).send(response)
        }
    })
}