const Repository = require("../../src/Repository/BookingRepository");
const Booking = require("../../src/Entity/Booking");
const Jetpack = require("../../src/Entity/Jetpack");

describe("Create a booking for a jetpack", function() {
  test("Test create function", () => {
    let dbMock = {
      get: jest.fn(),
      push: jest.fn(),
      write: jest.fn(),
      find: jest.fn()
    };
    const book = new Booking();
    book.id = "1";
    book.jetpack_id = "1";
    book.start_date = "2019-11-01";
    book.end_date = "2019-11-07";

    dbMock.get.mockReturnValue(dbMock);
    dbMock.push.mockReturnValue(dbMock);
    dbMock.write.mockReturnValue(dbMock);

    const repository = new Repository(dbMock);
    repository.create(book);
    expect(dbMock.write.mock.calls.length).toBe(1);
    expect(() => repository.create(new Booking())).toThrow(
      "Booking object is missing information"
    );
    expect(() => repository.create(undefined)).toThrow(
      "Booking object is undefined"
    );
    book.end_date = null;
    expect(() => repository.create(book)).toThrow(
      "Booking object is missing information"
    );
    book.end_date = "2019-11-07";
    book.start_date = null;
    expect(() => repository.create(book)).toThrow(
      "Booking object is missing information"
    );
  });
});
