const express = require('express');
const router = express.Router({ mergeParams: true });
const categoryController = require('../../controllers/rooms/category')


/**
 * @swagger
 * tags:
 *   name: Room 
 *   description: Room  Routes
 */


 /**
* @swagger
* /room/category:
*   get:
*     summary: Get all all room categories.
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
router.get('/', categoryController.getAllCategories)
/**
* @swagger
* /room/category:
*   post:
*     summary: Saving room category.
*     tags: [Room]
*     description: This Route saves a new room category.
*     consumes:
*       — application/json
*     parameters:
*       - in: body
*         name: body   
*         required: true
*         schema:
*            type: object
*            required:
*              -name
*              -noOfBeds
*              -description
*            properties:
*              name:
*                type: string
*              noOfBeds:
*                type: integer
*              description:
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
router.post('/', categoryController.postCategory)

/**
* @swagger
* /room/category/{id}:
*   put:
*     summary: Edit Room category .
*     tags: [Room]
*     description: This Route edits single room category.
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
*       - in: body
*         name: body   
*         required: true
*         schema:
*            type: object
*            properties:
*              name:
*                type: string
*              noOfBeds:
*                type: integer
*              description:
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
router.put('/:id', categoryController.editCategory)


/**
* @swagger
* /room/category/{id}:
*   delete:
*     summary: Delete Room category .
*     tags: [Room]
*     description: This Route deletes single room category.
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
router.delete('/:id', categoryController.deleteCategory)


module.exports = router;
