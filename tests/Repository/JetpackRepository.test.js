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

describe('Delete Jetpack', function () {
  test('Delete Jetpack', () => {
      let dbMock = {
          get : jest.fn(),
          remove : jest.fn(),
          write : jest.fn()
      };
      const jetpack = new Jetpack();
      jetpack.id="1";
      jetpack.name = "test";
      jetpack.image ="123";
      dbMock.get.mockReturnValue(dbMock);
      dbMock.remove.mockReturnValue(dbMock);
      dbMock.write.mockReturnValue(jetpack);

      const repository = new Repository(dbMock);
      jetpacks = repository.delete(jetpack);
      expect(jetpacks).toBe(undefined);
  });

  test('Return a message that announced that the id is missing', () => {
      let dbMock = {
          get : jest.fn(),
          remove : jest.fn(),
          write : jest.fn()
      };
      const jetpack = new Jetpack();
      dbMock.get.mockReturnValue(dbMock);
      dbMock.remove.mockReturnValue(dbMock);
      dbMock.write.mockReturnValue(dbMock);

      const repository = new Repository(dbMock);
      expect(()=> (repository.delete(jetpack))).toThrow('Jetpack object is missing information');
      expect(()=> (repository.delete())).toThrow('Jetpack object is undefined');
  });
});


describe('Get All Jetpack', function () {

  test('Test getAll', () => {
      let dbMock = {
          get : jest.fn(),
          value : jest.fn()
      };
      const jetpack = new Jetpack();
      const jetpack2 = new Jetpack();
      jetpack.id="1";
      jetpack.name = "test";
      jetpack.image ="123";
      jetpack2.id="2";
      jetpack2.name = "test2";
      jetpack2.image ="124";
      dbMock.get.mockReturnValue(dbMock);
      dbMock.value.mockReturnValue([jetpack,jetpack2]);

      const repository = new Repository(dbMock);
      jetpacks = repository.getAll();
      expect(jetpacks.length).toBe(2);
      expect(jetpacks[0].name).toBe("test");
      expect(jetpacks[0].image).toBe("123");
      expect(jetpacks[1].name).toBe("test2");
      expect(jetpacks[1].image).toBe("124");
  });
});

describe('Get Jetpack by ID', function () {
  test('Test Jetpack by ID', () => {
      let dbMock = {
          get : jest.fn(),
          find : jest.fn(),
          value : jest.fn()
      };
      const jetpack = new Jetpack();
      jetpack.id="1";
      jetpack.name = "test";
      jetpack.image ="123";
      dbMock.get.mockReturnValue(dbMock);
      dbMock.find.mockReturnValue(dbMock);
      dbMock.value.mockReturnValue(jetpack);

      const repository = new Repository(dbMock);
      jetpacks = repository.getById("1");
      expect(jetpacks.name).toBe("test");
      expect(jetpacks.image).toBe("123");
  });

  test('Return a message that announced that the Jetpack is not found', () => {
      let dbMock = {
          get : jest.fn(),
          post : jest.fn(),
          find : jest.fn(),
          value : jest.fn()
      };
      const jetpack = new Jetpack();
      dbMock.get.mockReturnValue(dbMock);
      dbMock.post.mockReturnValue(dbMock);
      dbMock.find.mockReturnValue(dbMock);
      dbMock.value.mockReturnValue(dbMock);

      const repository = new Repository(dbMock);
      dbMock.value.mockReturnValue(false);
      expect(()=> (repository.getById(""))).toThrow('Id is missing');
  });
});
