module.exports = class {
  constructor(db) {
    this.db = db;
  }
  create(jetpack) {
    if (!jetpack) {
      throw 'Jetpack object is undefined';
    }

    if (!jetpack.id || !jetpack.name) {
      throw 'Jetpack object is missing information';
    }

    this.db
    .get('jetpacks')
    .push(jetpack.toJson())
    .write()
  }

  update(jetpack) {
    if (!jetpack) {
      throw 'Jetpack object is undefined';
    }

    if (!jetpack.id || !jetpack.name || !jetpack.image) {
      throw 'Jetpack object is missing information';
    }
    var found = this.db
    .post('jetpacks')
    .find({id : jetpack.id})
    .value()
    if(found) {
      return this.db
      .post('jetpacks')
      .find({id : jetpack.id})
      .assign({name : jetpack.name, image : jetpack.image})
      .write()
    }
    throw 'Jetpack is not found';

  }
  delete(jetpack) {
    if (!jetpack) {
      throw 'Jetpack object is undefined';
    }

    if (!jetpack.id) {
      throw 'Jetpack object is missing information';
    }

    this.db
    .get('jetpacks')
    .remove({ id: jetpack.id})
    .write()
  }

  getAll(){
    return this.db
    .get('jetpacks').value();
  }

  getById(id){
    let jetpack = this.db
    .get('jetpacks')
    .find({ id:id })
    .value();

    if(!jetpack){
      throw 'Id is missing';
    } else {
      return jetpack;
    }
  }

  getBookingJetpacks(startDate, endDate) {
    let jetpacks = this.db.get("jetpacks").value();
    let bookingsdb = this.db.get("booking").value();

    if (!jetpacks) {
      return null;
    }
    else if (!bookingsdb && (!startDate && !endDate)) {
      return jetpacks;
    }
    else if (bookingsdb && (!startDate && !endDate)) {
      return jetpacks.filter(x => !bookingsdb.find(a => a.jetpack_id === x.id));
    }
    else {
      return jetpacks.filter(x =>
        bookingsdb.find(a =>
          a.jetpack_id === x.id &&
          a.start_date <= startDate &&
          a.end_date >= endDate)
        );
      }

    }
};
