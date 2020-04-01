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
            return res.status(400).send(response)
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
            return res.status(200).send(response)
        } catch (error) {
            logger.error(error.toString())
            response =  new ResponseClass(failureStatus, error.toString(), failureCode, {})
            return res.status(200).send(response)
        }

    }),

    getAllCategories: ('/', async (req, res)=>{

        console.log("here")
        try {
            let getAllCategories = await Models.RoomsCategory.findAll()
            response =  new ResponseClass(successStatus, successStatus, successCode, getAllCategories)
            return res.status(200).send(response)            
        } catch (error) {
            logger.error(error.toString())
            response =  new ResponseClass(failureStatus, error.toString(), failureCode, {})
            return res.status(200).send(response)            
        }
    }),

    editCategory: ('/', async (req, res)=>{
        let {id} = req.params
        let {name, noOfBeds, description} = req.body;
        let response
        console.log(noOfBeds < 1 )
        if(name.trim() == "" && noOfBeds <! 1 && description.trim() == "" && typeof(noOfBeds) !== "number"){
            response = new ResponseClass(failureStatus, validationError,failureCode, {} );
            return res.status(400).send(response)
        }else if(noOfBeds && noOfBeds < 1 ){
            response = new ResponseClass(failureStatus, "No of beds can't be less than 1",failureCode, {} );
            return res.status(400).send(response)
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
    })
}