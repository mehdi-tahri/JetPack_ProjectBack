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
