const Repository = require('../../src/Repository/JetpackRepository');
const Jetpack = require('../../src/Entity/Jetpack');
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
