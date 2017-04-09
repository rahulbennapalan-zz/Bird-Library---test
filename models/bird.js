/**
 * Created with IntelliJ IDEA.
 * User: rahul
 * Date: 09/04/17
 * Time: 6:38 PM
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose');

// schema definition for bird
var bird_schema = new mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    family: {type: String, required: true},
    continents: {type: [String], required: true, validate: arrayLimit},
    added: {type: String, required: true},
    visible: {type: Boolean, required: true, default: false}
}, {versionKey: false});

function arrayLimit(array) {
    if(array.length < 1) {
        // check for minimum items
        return false;
    } else if(Array.from(new Set(array)).length < array.length) {
        // check for unique items
        return false;
    } else {
        return true;
    }
}

module.exports = mongoose.model('Bird', bird_schema);