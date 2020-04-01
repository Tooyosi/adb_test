const express = require('express');
const router = express.Router({ mergeParams: true });
const roomController = require('../../controllers/rooms')


/**
 * @swagger
 * tags:
 *   name: Room 
 *   description: Room  Routes
 */


 /**
* @swagger
* /room:
*   get:
*     summary: Get all all rooms.
*     tags: [Room]
*     description: This Route fetches all categories.
*     consumes:
*       — application/json
*     responses: 
*       200:
*         description: Receive a success response.
*       400:
*         description: Bad Request.
*/
router.get('/', roomController.getAllRooms)
/**
* @swagger
* /room:
*   post:
*     summary: Saving room.
*     tags: [Room]
*     description: This Route saves a new room.
*     consumes:
*       — application/json  
*     parameters:
*       - in: body
*         name: body   
*         required: true
*         schema:
*            type: object
*            required:
*              -categoryId
*              -checkinDate
*              -checkOutDate
*            properties:
*              categoryId:
*                type: integer
*              checkinDate:
*                type: string
*              checkOutDate:
*                type: string
*
*     responses: 
*       200:
*         description: Receive a successful response.
*         examples:
*           status: true,
*           description: Success,
*           code: 00,
*       400:
*         description: Bad Request.
*/
router.post('/', roomController.postRoom)

/**
* @swagger
* /room/{id}:
*   put:
*     summary: Edit Room  .
*     tags: [Room]
*     description: This Route edits single room.
*     consumes:
*       — application/json
*     parameters:
*       - in: path
*         name: id   
*         required: true
*         schema:
*           type: integer
*           minimum: 1
*           description: The Room ID
*       - in: body
*         name: body   
*         required: true
*         schema:
*            type: object
*            properties:
*              categoryId:
*                type: integer
*              checkinDate:
*                type: string
*              checkOutDate:
*                type: string
*     responses: 
*       200:
*         description: Successful.
*         examples:
*           status: true,
*           description: Success,
*           code: 00
*       400:
*         description: Bad Request.
*/
router.put('/:id', roomController.editRoom)


/**
* @swagger
* /room/{id}:
*   delete:
*     summary: Delete Room  .
*     tags: [Room]
*     description: This Route deletes single room.
*     consumes:
*       — application/json
*     parameters:
*       - in: path
*         name: id   
*         required: true
*         schema:
*           type: integer
*           minimum: 1
*           description: The Room category ID
*     responses: 
*       200:
*         description: Successful.
*         examples:
*           status: true,
*           description: Success,
*           code: 00
*       400:
*         description: Bad Request.
*/
router.delete('/:id', roomController.deleteRoom)


module.exports = router;
