const Models = require('../../database/connections/sequelize')
const {logger} = require('../../loggers/logger')
const ResponseClass = require('../../helpers/ResponseClass');
const {successStatus, failureStatus, validationError, successCode, failureCode} = require('../../helpers/');
module.exports = {
    postCategory: ('/', async (req, res)=>{
        let {name, noOfBeds, description} = req.body;
        let response
        if(name.trim() == "" || noOfBeds < 1 || description.trim() == "" || typeof(noOfBeds) !== "number"){
            response = new ResponseClass(failureStatus, validationError,failureCode, {} );
            res.status(400)
            return res.send(response)
        }
        try {
            let newCategory = await Models.RoomsCategory.create({
                name: name,
                no_of_beds: noOfBeds,
                description: description,
                createdAt: new Date(),
                updatedAt: new Date(),
            })            
            response =  new ResponseClass(successStatus, successStatus, successCode, {})
            res.status(200)
            return res.send(response)
        } catch (error) {
            logger.error(error.toString())
            response =  new ResponseClass(failureStatus, error.toString(), failureCode, {})
            res.status(200)
            return res.send(response)
        }

    }),

    getAllCategories: ('/', async (req, res)=>{
        try {
            let getAllCategories = await Models.RoomsCategory.findAll()
            response =  new ResponseClass(successStatus, successStatus, successCode, getAllCategories)
            res.status(200)
            return res.send(response)            
        } catch (error) {
            logger.error(error.toString())
            response =  new ResponseClass(failureStatus, error.toString(), failureCode, {})
            res.status(400)
            return res.send(response)            
        }
    }),

    editCategory: ('/', async (req, res)=>{
        let {id} = req.params
        let {name, noOfBeds, description} = req.body;
        let response
        if(name.trim() == "" && noOfBeds <! 1 && description.trim() == "" && typeof(noOfBeds) !== "number"){
            response = new ResponseClass(failureStatus, validationError,failureCode, {} );
            res.status(400)
            return res.send(response)
        }else if(noOfBeds && noOfBeds < 1 ){
            response = new ResponseClass(failureStatus, "No of beds can't be less than 1",failureCode, {} );
            res.status(400)
            return res.send(response)
        }
        let updateObj = {
            updatedAt: new Date()
        }
        if(name && name.trim() !== ""){
            updateObj.name = name
        }
        if(noOfBeds){
            updateObj.no_of_beds = noOfBeds
        }
        if(description && description.trim() !== ""){
            updateObj.description = description
        }
        try {
            let foundCategory = await Models.RoomsCategory.findOne({
                where: {
                    id: id
                }
            })

            if(foundCategory !== null && foundCategory !== undefined){
                await foundCategory.update(updateObj)
                response =  new ResponseClass(successStatus, successStatus, successCode, {})
                res.status(200)
                return res.send(response)
            }else{
                response = new ResponseClass(failureStatus, "Category not found",failureCode, {} );
                res.status(404)
                return res.send(response)
            }
        } catch (error) {
            logger.error(error.toString())
            response =  new ResponseClass(failureStatus, error.toString(), failureCode, {})
            res.status(200)
            return res.send(response)              
        }
    }),

    deleteCategory: ('/', async (req, res)=>{
        let {id} = req.params
        let response
        try {
            let foundCategory = await Models.RoomsCategory.findOne({
                where: {
                    id: id
                }
            })

            if(foundCategory !== null && foundCategory !== undefined){
                await foundCategory.destroy()
                response =  new ResponseClass(successStatus, successStatus, successCode, {})
                res.status(200)
                return res.send(response)
            }else{
                response = new ResponseClass(failureStatus, "Category not found",failureCode, {} );
                res.status(400)
                return res.send(response)
            }
        } catch (error) {
            logger.error(error.toString())
            response =  new ResponseClass(failureStatus, error.toString(), failureCode, {})
            res.status(400)
            return res.send(response)              
        }
    })
}