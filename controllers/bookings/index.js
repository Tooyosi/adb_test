const Models = require('../../database/connections/sequelize')
const { logger } = require('../../loggers/logger')
const ResponseClass = require('../../helpers/ResponseClass');
const { successStatus, failureStatus, validationError, successCode, failureCode } = require('../../helpers/');
module.exports = {
    getAllBookings: ('/', async (req, res) => {

        try {
            let getAllBookings = await Models.Bookings.findAll({
                include: {
                    model: Models.Rooms,
                    as: "room"
                }
            })
            response = new ResponseClass(successStatus, successStatus, successCode, getAllBookings)
            return res.status(200).send(response)
        } catch (error) {
            logger.error(error.toString())
            response = new ResponseClass(failureStatus, error.toString(), failureCode, {})
            return res.status(200).send(response)
        }
    }),
}