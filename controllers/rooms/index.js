const Models = require('../../database/connections/sequelize')
const {logger} = require('../../loggers/logger')
const ResponseClass = require('../../helpers/ResponseClass');
const {successStatus, failureStatus, validationError, successCode, failureCode} = require('../../helpers/');
module.exports = {
    postRoom: ('/', async (req, res)=>{
        let {categoryId, checkinDate, checkOutDate} = req.body;
        let response
        if(checkinDate.trim() == "" || categoryId < 1 || checkOutDate.trim() == "" || typeof(categoryId) !== "number"){
            response = new ResponseClass(failureStatus, validationError,failureCode, {} );
            return res.status(400).send(response)
        }

        let category = await Models.RoomsCategory.findOne({
            where: {
                id: categoryId
            }
        })
        if(category == null || category == undefined ){
            response = new ResponseClass(failureStatus, "Category doesnt exist",failureCode, {} );
            return res.status(400).send(response)
        }        
        try {
            let newRoom = await Models.Rooms.create({
                category_id: categoryId,
                checkin_date: new Date(checkinDate),
                checkout_date: new Date(checkOutDate),
                createdAt: new Date(),
                updatedAt: new Date(),
            })     
              
            response =  new ResponseClass(successStatus, successStatus, successCode, {})
            return res.status(200).send(response)
        } catch (error) {
            logger.error(error.toString())
            response =  new ResponseClass(failureStatus, error.toString(), failureCode, {})
            return res.status(200).send(response)
        }

    }),

    getAllRooms: ('/', async (req, res)=>{

        try {
            let getAllRooms = await Models.Rooms.findAll({
                include: {
                    model: Models.RoomsCategory,
                    as: "category"
                }
            })
            response =  new ResponseClass(successStatus, successStatus, successCode, getAllRooms)
            return res.status(200).send(response)            
        } catch (error) {
            logger.error(error.toString())
            response =  new ResponseClass(failureStatus, error.toString(), failureCode, {})
            return res.status(200).send(response)            
        }
    }),

    editRoom: ('/', async (req, res)=>{
        let {id} = req.params
        let {categoryId, checkinDate, checkOutDate} = req.body;
        let response
        console.log(noOfBeds < 1 )
        if(checkinDate.trim() == "" || categoryId < 1 || checkOutDate.trim() == "" || typeof(categoryId) !== "number"){
            response = new ResponseClass(failureStatus, validationError,failureCode, {} );
            return res.status(400).send(response)
        }else if(categoryId && categoryId < 1 ){
            response = new ResponseClass(failureStatus, "Category doesnt exist",failureCode, {} );
            return res.status(400).send(response)
        }
        let category = await Models.RoomsCategory.findOne({
            where: {
                id: categoryId
            }
        })
        if(category == null || category == undefined ){
            response = new ResponseClass(failureStatus, "Category doesnt exist",failureCode, {} );
            return res.status(400).send(response)
        }
        let updateObj = {
            updatedAt: new Date()
        }
        if(checkinDate && checkinDate.trim() !== ""){
            updateObj.checkin_date = checkinDate
        }
        if(categoryId){
            updateObj.category_id = categoryId
        }
        if(checkOutDate && checkOutDate.trim() !== ""){
            updateObj.checkout_date = checkOutDate
        }
        try {
            let foundRoom = await Models.Rooms.findOne({
                where: {
                    id: id
                }
            })

            if(foundRoom !== null && foundRoom !== undefined){
                await foundRoom.update(updateObj)
                response =  new ResponseClass(successStatus, successStatus, successCode, {})
                return res.status(200).send(response)
            }else{
                response = new ResponseClass(failureStatus, "Category not found",failureCode, {} );
                return res.status(400).send(response)
            }
        } catch (error) {
            logger.error(error.toString())
            response =  new ResponseClass(failureStatus, error.toString(), failureCode, {})
            return res.status(200).send(response)              
        }
    }),

    deleteRoom: ('/', async (req, res)=>{
        let {id} = req.params
        let response
        try {
            let foundRoom = await Models.Rooms.findOne({
                where: {
                    id: id
                }
            })

            if(foundRoom !== null && foundRoom !== undefined){
                await foundRoom.destroy()
                response =  new ResponseClass(successStatus, successStatus, successCode, {})
                return res.status(200).send(response)
            }else{
                response = new ResponseClass(failureStatus, "Room not found",failureCode, {} );
                return res.status(400).send(response)
            }
        } catch (error) {
            logger.error(error.toString())
            response =  new ResponseClass(failureStatus, error.toString(), failureCode, {})
            return res.status(200).send(response)              
        }
    })
}