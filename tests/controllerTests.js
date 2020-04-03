const should = require('should')
const sinon = require('sinon')
const roomController = require('../controllers/rooms/index')
const bookingsController = require('../controllers/bookings/index')
const categoriesController = require('../controllers/rooms/category')
const res = {
    status: sinon.stub().returns({ end: sinon.spy() }),
    send: sinon.spy(),
    json: sinon.spy()
}

describe('Controllers Test: ', () => {
    describe('Get Rooms', () => {
        it('should fetch the whole room lists', async() => {
            let req = {
                headers: {
                    host: 'localhost:8080'
                }
            }

            await roomController.getAllRooms(req, res)
            // res.status.calledWith(200).should.equal(true)
            // res.send.calledWith({})
            sinon.assert.calledWith(res.status, 200)

        })
    }),

    describe('POST Room', () => {
        it('should save a new room to the db', async () => {
            let req = {
                body:{
                    categoryId: 2
                  }
            }

            await roomController.postRoom(req, res)
            // res.status.calledWith(200).should.equal(true)
            // res.send.calledWith({})

            sinon.assert.calledWith(res.status, 200)
            // sinon.assert.calledWith(res.status, 400)
        })
    }),

    describe('Get Single Room', () => {
        it('should return a single room', async() => {
            let req = {
                params: {
                    id: 1
                }
            }

             await roomController.getOneRooms(req, res)
            sinon.assert.calledWith(res.status, 200)
            
        }).timeout(210000)
    }),

    describe('Edit Room', () => {
        it('should Edit room', async() => {
            let req = {
                params: {
                    id: 1
                },
                body: {
                    "categoryId": 0,
                    "isBooked": true
                  }
            }

            await roomController.editRoom(req, res)
            sinon.assert.calledWith(res.status, 200)
        })
    }),

    describe('Delete Room', () => {
        it('should Delete room', async() => {
            let req = {
                params: {
                    id: 1
                },
            }

            await roomController.deleteRoom(req, res)
            sinon.assert.calledWith(res.status, 200)
        })
    }),

    describe('Book Room', () => {
        it('should book a room', async() => {
            let req = {
                params: {
                    id: 2
                },
                body:{
                    "checkInDate": "2020-3-13",
                    "checkOutDate": "2020-3-13"
                  }
            }

            await roomController.bookRoom(req, res)
            sinon.assert.calledWith(res.status, 200)
        })
    }),


    describe('Get all bookings ', () => {
        it('should get all bookings', async() => {
            let req = {}

            await bookingsController.getAllBookings(req, res)
            sinon.assert.calledWith(res.status, 200)
        })
    }),

    describe('Edit room booking ', () => {
        it('should edit single booking', async() => {
            let req = {
                params: {
                    id: 2,
                    bookingId: 1
                },
                body:{
                    "isBooked": true,
                    "checkInDate": "2020-3-13",
                    "checkOutDate": "2020-3-13"
                  }
            }

            await roomController.editBookedRoom(req, res)
            sinon.assert.calledWith(res.status, 200)
        })
    }),
    
    describe('Delete room booking ', () => {
        it('should delete single booking', async() => {
            let req = {
                params: {
                    id: 2,
                    bookingId: 2
                },
            }

            await roomController.deleteBookedRoom(req, res)
            sinon.assert.calledWith(res.status, 200)
        })
    }),

    describe('Get All Room Categories ', () => {
        it('should get all categories', async() => {
            let req = {}

            await categoriesController.getAllCategories(req, res)
            sinon.assert.calledWith(res.status, 200)
        })
    }),

    describe('Save Room Categories ', () => {
        it('should save new categories', async() => {
            let req = {
                body:{
                    "name": "Unit test",
                    "noOfBeds": 18,
                    "description": "Unit test description"
                  }
            }

            await categoriesController.postCategory(req, res)
            sinon.assert.calledWith(res.status, 200)
        })
    }),

    describe('Edit Room Category', () => {
        it('should edit room category', async() => {
            let req = {
                params: {
                    id: 4
                },
                body:{
                    "name": "Unit test edited",
                    "noOfBeds": 18,
                    "description": "Unit test description edited"
                  }
            }

            await categoriesController.editCategory(req, res)
            sinon.assert.calledWith(res.status, 200)
        })
    }),

    describe('Delete Room Category', () => {
        it('Delete edit room category', async() => {
            let req = {
                params: {
                    id: 4
                }
            }

            await categoriesController.deleteCategory(req, res)
            sinon.assert.calledWith(res.status, 200)
        })
    })
})