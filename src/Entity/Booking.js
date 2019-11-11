module.exports = class {
    constructor() {
        this._id = null;
        this._jetpack_id = null;
        this._start_date = null;
        this._end_date = null;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get jetpack_id() {
        return this._jetpack_id;
    }

    set jetpack_id(value) {
        this._jetpack_id = value;
    }

    get start_date() {
        return this._start_date;
    }

    set start_date(value) {
        this._start_date = value;
    }

    get end_date() {
        return this._end_date;
    }

    set end_date(value) {
        this._end_date = value;
    }

    toJson() {
        return {
            id : this.id,
            jetpack_id: this.jetpack_id,
            start_date: this.start_date,
            end_date: this.end_date
        }
    }
};
