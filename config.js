/**
 * Created with IntelliJ IDEA.
 * User: rahul
 * Date: 09/04/17
 * Time: 7:08 PM
 * To change this template use File | Settings | File Templates.
 */

// configurable parameters for the application

module.exports = {

    // port number at which application takes in requests
    application_port_number: 3000,

    // mongo db used for storage
    mongo_db: "mongodb://localhost/saltside",

    // date format
    date_format: "YYYY-MM-DD",

    // set max fetch limit for listing api
    max_fetch_limit: 10

};
