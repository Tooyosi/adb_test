const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('../app');
const { successCode, successStatus, failureCode, failureStatus } = require("../helpers/index")

chai.use(chaiHttp);
describe('Route Tests', () => {
    describe('GET /room', function () {
        it('should print all rooms', function (done) {
            chai.request(app)
                .get('/room')
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res).to.have.property('body')
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('status').eql(successStatus)
                    expect(res.body).to.have.property('code').eql(successCode)
                    expect(res.body).to.have.property('data')
                    expect(res.body.data).to.be.a('array')
                    if (err) return done(err)
                })
            done();
        })
    }),
        describe('POST /room', function () {
            it('it should add new room', (done) => {
                chai.request(app)
                    .post('/room')
                    .send({ categoryId: 1 })
                    .end((err, res) => {
                        expect(res).to.have.status(200)
                        expect(res).to.have.property('body')
                        expect(res.body).to.be.a('object')
                        expect(res.body).to.have.property('status').eql(successStatus)
                        expect(res.body).to.have.property('code').eql(successCode)
                        expect(res.body).to.have.property('data')
                        expect(res.body.data).to.be.a('object')
                        if (err) return done(err)
                    })
                done();
            })
        }),
        describe('Get /room/{id}', function () {

            it('it should get a single room', (done) => {
                chai.request(app)
                    .get('/room/2')
                    .end((err, res) => {
                        expect(res).to.have.status(200)
                        expect(res).to.have.property('body')
                        expect(res.body).to.be.a('object')
                        expect(res.body).to.have.property('status').eql(successStatus)
                        expect(res.body).to.have.property('code').eql(successCode)
                        expect(res.body).to.have.property('data')
                        expect(res.body.data).to.be.a('object')
                        if (err) return done(err)
                    })
                done();
            })
        }),
        describe('Put /room/{id}', function () {

            it('it should edit a single room', (done) => {
                chai.request(app)
                    .put('/room/2')
                    .send({
                        "categoryId": 3,
                        "isBooked": true
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(200)
                        expect(res).to.have.property('body')
                        expect(res.body).to.be.a('object')
                        expect(res.body).to.have.property('status').eql(successStatus)
                        expect(res.body).to.have.property('code').eql(successCode)
                        expect(res.body).to.have.property('data')
                        expect(res.body.data).to.be.a('object')
                        if (err) return done(err)
                    })
                done();
            })
        }),
        // describe('Delete /room/{id}', function () {

        //     it('it should edit a delete room', (done) => {
        //         chai.request(app)
        //             .put('/room/3')
        //             .end((err, res) => {
        //                 expect(res).to.have.status(200)
        //                 expect(res).to.have.property('body')
        //                 expect(res.body).to.be.a('object')
        //                 expect(res.body).to.have.property('status').eql(successStatus)
        //                 expect(res.body).to.have.property('code').eql(successCode)
        //                 expect(res.body).to.have.property('data')
        //                 expect(res.body.data).to.be.a('object')
        //                 if (err) return done(err)
        //             })
        //         done();
        //     })
        // }),

        // describe('Post /room/{id}/book', function () {

        //     it('it should book room', (done) => {
        //         chai.request(app)
        //             .post('/room/3/book')
        //             .send({
        //                 "checkInDate": "2020-3-11",
        //                 "checkOutDate": "2020-3-13"
        //               })
        //             .end((err, res) => {
        //                 expect(res).to.have.status(200)
        //                 expect(res).to.have.property('body')
        //                 expect(res.body).to.be.a('object')
        //                 expect(res.body).to.have.property('status').eql(successStatus)
        //                 expect(res.body).to.have.property('code').eql(successCode)
        //                 expect(res.body).to.have.property('data')
        //                 expect(res.body.data).to.be.a('object')
        //                 if (err) return done(err)
        //             })
        //         done();
        //     })
        // }),
        describe('Put /room/{id}/book/{bookingId}', function () {

            it('it should edit a rooms booking', (done) => {
                chai.request(app)
                    .put('/room/3/book/4')
                    .send({
                        "isBooked": false,
                        "checkInDate": "2020-3-11",
                        "checkOutDate": "2020-3-13"
                      })
                    .end((err, res) => {
                        expect(res).to.have.status(200)
                        expect(res).to.have.property('body')
                        expect(res.body).to.be.a('object')
                        expect(res.body).to.have.property('status').eql(successStatus)
                        expect(res.body).to.have.property('code').eql(successCode)
                        expect(res.body).to.have.property('data')
                        expect(res.body.data).to.be.a('object')
                        if (err) return done(err)
                    })
                done();
            })
        }),

        // describe('Delete /room/{id}/book/{bookingId}', function () {

        //     it('it should delete a rooms booking', (done) => {
        //         chai.request(app)
        //             .delete('/room/3/book/5')
        //             .end((err, res) => {
        //                 expect(res).to.have.status(200)
        //                 expect(res).to.have.property('body')
        //                 expect(res.body).to.be.a('object')
        //                 expect(res.body).to.have.property('status').eql(successStatus)
        //                 expect(res.body).to.have.property('code').eql(successCode)
        //                 expect(res.body).to.have.property('data')
        //                 expect(res.body.data).to.be.a('object')
        //                 if (err) return done(err)
        //             })
        //         done();
        //     })
        // }),

        describe('Get /booking', function () {

            it('it should get all bookings', (done) => {
                chai.request(app)
                    .get('/booking')
                    .end((err, res) => {
                        expect(res).to.have.status(200)
                        expect(res).to.have.property('body')
                        expect(res.body).to.be.a('object')
                        expect(res.body).to.have.property('status').eql(successStatus)
                        expect(res.body).to.have.property('code').eql(successCode)
                        expect(res.body).to.have.property('data')
                        expect(res.body.data).to.be.a('array')
                        if (err) return done(err)
                    })
                done();
            })
        }),

        describe('Get /category', function () {

            it('it should get all room categories', (done) => {
                chai.request(app)
                    .get('/category')
                    .end((err, res) => {
                        expect(res).to.have.status(200)
                        expect(res).to.have.property('body')
                        expect(res.body).to.be.a('object')
                        expect(res.body).to.have.property('status').eql(successStatus)
                        expect(res.body).to.have.property('code').eql(successCode)
                        expect(res.body).to.have.property('data')
                        expect(res.body.data).to.be.a('array')
                        if (err) return done(err)
                    })
                done();
            })
        }),

        describe('Post /category', function () {

            it('it should post new category', (done) => {
                chai.request(app)
                    .post('/category')
                    .send({
                        "name": "e2e test",
                        "noOfBeds": 2,
                        "description": "e2e description"
                      })
                    .end((err, res) => {
                        expect(res).to.have.status(200)
                        expect(res).to.have.property('body')
                        expect(res.body).to.be.a('object')
                        expect(res.body).to.have.property('status').eql(successStatus)
                        expect(res.body).to.have.property('code').eql(successCode)
                        expect(res.body).to.have.property('data')
                        expect(res.body.data).to.be.a('object')
                        if (err) return done(err)
                    })
                done();
            })
        }),

        describe('Edit /category/{id}', function () {

            it('it should edit category', (done) => {
                chai.request(app)
                    .put('/category/9')
                    .send({
                        "name": "e2e test",
                        "noOfBeds": 4,
                        "description": "e2e description"
                      })
                    .end((err, res) => {
                        expect(res).to.have.status(200)
                        expect(res).to.have.property('body')
                        expect(res.body).to.be.a('object')
                        expect(res.body).to.have.property('status').eql(successStatus)
                        expect(res.body).to.have.property('code').eql(successCode)
                        expect(res.body).to.have.property('data')
                        expect(res.body.data).to.be.a('object')
                        if (err) return done(err)
                    })
                done();
            })
        }),

        describe('Delete /category/{id}', function () {

            it('it should delete a category', (done) => {
                chai.request(app)
                    .delete('/category/10')
                    .end((err, res) => {
                        expect(res).to.have.status(200)
                        expect(res).to.have.property('body')
                        expect(res.body).to.be.a('object')
                        expect(res.body).to.have.property('status').eql(successStatus)
                        expect(res.body).to.have.property('code').eql(successCode)
                        expect(res.body).to.have.property('data')
                        expect(res.body.data).to.be.a('object')
                        if (err) return done(err)
                    })
                done();
            })
        })

        
})