const Booking = require("../../src/Entity/Booking");
const uuidv4 = require('uuid/v4');
const db = require('../../src/Db');
const BookingRepository = require('../../src/Repository/BookingRepository');

module.exports = (req, res) => {
console.log(req.body);
    let booking = new Booking();

    booking.id = uuidv4();
    booking.jetpack_id = req.body.jetpack_id;
    booking.start_date = req.body.start_date;
    booking.end_date = req.body.end_date;

    const repository = new BookingRepository(db);
    repository.create(booking);

    res.header("Access-Control-Allow-Origin", "*");
    res.status(201).send(booking.toJson())
};
