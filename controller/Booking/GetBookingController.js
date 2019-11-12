const db = require('../../src/Db');
const BookingRepository = require('../../src/Repository/BookingRepository');

module.exports = (req, res) => {

    const repository = new BookingRepository(db);

    let bookinglist = repository.get();

    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send(bookinglist)
};
