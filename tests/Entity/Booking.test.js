const Booking = require("../../src/Entity/Booking");
describe("Booking toJson", function() {
  test("Booking toJson", () => {
    let booking = new Booking();
    booking.id = "1"
    booking.jetpack_id = "AOZ232";
    booking.start_date = "1570720000";
    booking.end_date = "1570720003";
    expect(booking.toJson()).toMatchObject({
      id: "1",
      jetpack_id: "AOZ232",
      start_date: "1570720000",
      end_date: "1570720003"
    });
  });
});
