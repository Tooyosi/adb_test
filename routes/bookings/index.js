const express = require('express');
const router = express.Router({ mergeParams: true });
const bookingsController = require('../../controllers/bookings/index')


/**
 * @swagger
 * tags:
 *   name: Bookings 
 *   description: Bookings Routes
 */


 /**
* @swagger
* /booking:
*   get:
*     summary: Get all all Bookings.
*     tags: [Bookings]
*     description: This Route fetches all Bookings.
*     consumes:
*       — application/json
*     responses: 
*       200:
*         description: Receive a success response.
*       400:
*         description: Bad Request.
*/
router.get('/', bookingsController.getAllBookings)

module.exports = router;
