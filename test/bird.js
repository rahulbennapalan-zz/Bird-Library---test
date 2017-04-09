/**
 * Created with IntelliJ IDEA.
 * User: rahul
 * Date: 09/04/17
 * Time: 11:23 PM
 * To change this template use File | Settings | File Templates.
 */

var Bird = require('../models/bird');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Birds', function() {

    var current_bird_id = null;

    beforeEach(function(done) {
        // before each test, empty the database
        Bird.remove({}, function() {
            var bird = {
                name: "Penguins",
                family: "Spheniscidae",
                continents: ["Africa"]
            };
            chai.request(server)
                .post('/birds')
                .send(bird)
                .end(function(err, res) {
                    current_bird_id = res.body._id;
                    done();
                });
        });
    });

    afterEach(function (done) {
        // clear the birds
        Bird.remove({}, function() {
            done();
        });
    });

    describe('/GET birds', function() {
        it('it should GET all the birds', function(done) {
            chai.request(server)
                .get('/birds')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST birds', function() {
        it('it should CREATE a bird', function(done) {
            var bird = {
                name: "Albatrosses",
                family: "Diomedeidae",
                continents: ["Africa"],
                visible: true
            };
            chai.request(server)
                .post('/birds')
                .send(bird)
                .end(function(err, res) {
                    res.should.have.status(201);
                    var bird = new Bird(res.body);
                    bird.validate(function(error) {
                        if (error) {
                            error.should.be.null();
                        }
                        bird.visible.should.be.equals(true);
                        done();
                    });
                });
        });
    });

    describe('/GET a valid bird', function() {
        it('it should GET the bird', function(done) {
            chai.request(server)
                .get('/birds/' + current_bird_id)
                .end(function(err, res) {
                    res.should.have.status(200);
                    var bird = new Bird(res.body);
                    bird.validate(function(error) {
                        if (error) {
                            error.should.be.null();
                        }
                        done();
                    });
                });
        });
    });

    describe('/GET a invalid bird', function() {
        it('it should say NOT FOUND', function(done) {
            chai.request(server)
                .get('/birds/invalid')
                .end(function(err, res) {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe('/DELETE a valid bird', function() {
        it('it should DELETE the bird', function(done) {
            chai.request(server)
                .delete('/birds/' + current_bird_id)
                .end(function(err, res) {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/DELETE a invalid bird', function() {
        it('it should say NOT FOUND', function(done) {
            chai.request(server)
                .get('/birds/invalid')
                .end(function(err, res) {
                    res.should.have.status(404);
                    done();
                });
        });
    });

});

