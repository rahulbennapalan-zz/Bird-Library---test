/**
 * Created with IntelliJ IDEA.
 * User: rahul
 * Date: 08/04/17
 * Time: 10:41 PM
 * To change this template use File | Settings | File Templates.
 */

var router = require('express').Router();
var mongoose = require('mongoose');
var Bird = mongoose.model('Bird');
var moment = require('moment');
var ObjectId = mongoose.mongo.ObjectId;
var config = require("../config");

// load bird object on routes with ':id'
router.param('id', function(req, res, next, bird_id) {

    Bird.findOne({ _id: bird_id}).then(function (bird) {

        if (!bird) {
            return res.sendStatus(404);
        }

        req.bird = bird;
        return next();

    }).catch(next);

});

// list of visible birds
router.get('/birds', function(req, res, next) {

    var limit = req.query.limit || config.max_fetch_limit;
    var skip = req.query.start || 0;

    Bird.find({visible: true}).sort({_id: 1}).skip(skip).limit(limit).then(function(birds) {
        return res.status(200).json(birds);
    }).catch(next);

});

// get a bird
router.get('/birds/:id', function(req, res) {

    return res.status(200).json(req.bird);

});

// create a bird
router.post('/birds', function(req, res, next) {

    var bird = new Bird(req.body);
    bird._id = ObjectId().toString();
    bird.added = moment().format(config.date_format);

    return bird.save().then(function() {
        return res.status(201).json(bird);
    }).catch(function(error) {
            if(error && error.name === "ValidationError") {
                return res.sendStatus(400);
            } else {
                return next(new Error('Internal Error'));
            }
        });

});

// delete a bird
router.delete('/birds/:id', function(req, res, next) {

    return req.bird.remove().then(function() {
            return res.sendStatus(200);
        }).catch(next);

});

module.exports = router;