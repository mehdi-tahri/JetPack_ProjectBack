module.exports = class {
    constructor(db) {
        this.db = db;
    }

    get(){
      return this.db
                 .get('booking');
    }

    create(booking) {
        if (!booking) {
            throw 'Booking object is undefined';
        }

        if (!booking.id || !booking.jetpack_id || !booking.start_date || !booking.end_date) {
            throw 'Booking object is missing information';
        }

        this.db
            .get('booking')
            .push(booking.toJson())
            .write()
    }

};
