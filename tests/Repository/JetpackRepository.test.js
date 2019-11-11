const Repository = require('./JetpackRepository');
const Jetpack = require('../Entity/Jetpack');

describe('create jetpack', function () {

  test('Test create function', () => {
    let dbMock = {
      get : jest.fn(),
      push : jest.fn(),
      write : jest.fn()
    };
    const jetpack = new Jetpack();
    jetpack.id="1";
    jetpack.name = "test";
    jetpack.image ="123";
    dbMock.get.mockReturnValue(dbMock);
    dbMock.push.mockReturnValue(dbMock);
    dbMock.write.mockReturnValue(dbMock);

    const repository = new Repository(dbMock);
    repository.create(jetpack);
    expect(dbMock.write.mock.calls.length).toBe(1);
    expect(()=> (repository.create(new Jetpack()))).toThrow('Jetpack object is missing information');
    expect(()=> (repository.create(undefined))).toThrow('Jetpack object is undefined');
  });
});

describe('update jetpack', function () {

  test('Test update function', () => {
    let dbMock = {
      post : jest.fn(),
      find : jest.fn(),
      value : jest.fn(),
      assign : jest.fn(),
      write : jest.fn()
    };

    const jetpack = new Jetpack();
    jetpack.id="1";
    jetpack.name = "test";
    jetpack.image ="123";

    dbMock.post.mockReturnValue(dbMock);
    dbMock.find.mockReturnValue(dbMock);
    dbMock.value.mockReturnValue(dbMock);
    dbMock.assign.mockReturnValue(dbMock);
    dbMock.write.mockReturnValue(dbMock);

    const repository = new Repository(dbMock);
    let res = repository.update(jetpack);
    expect(dbMock.write.mock.calls.length).toBe(1);

    expect(()=> (repository.update(new Jetpack()))).toThrow('Jetpack object is missing information');

    expect(()=> (repository.update(undefined))).toThrow('Jetpack object is undefined');

    dbMock.value.mockReturnValue(false);
    expect(()=> (repository.update(jetpack))).toThrow('Jetpack is not found');

  });
});
