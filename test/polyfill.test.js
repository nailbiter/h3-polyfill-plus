const expect = require("expect");
const polyfill = require("../src/polyfill");

const polygon = [
  [-122.4089866999972145, 37.813318999983238],
  [-122.3544736999993603, 37.7198061999978478],
  [-122.4798767000009008, 37.8151571999998453]
];

describe("test of polyfill", () => {
  describe("polyfill", () => {
    it("should polyfill 7", () => {
      const hexagons = polyfill.polyfill(polygon, 7);
      hexagons.sort();
      expect(hexagons).toEqual([
        "872830820ffffff",
        "872830828ffffff",
        "87283082affffff",
        "87283082bffffff",
        "87283082effffff",
        "872830870ffffff",
        "872830876ffffff"
      ]);
    });
    it("should polyfill 6", () => {
      const hexagons = polyfill.polyfill(polygon, 6);
      hexagons.sort();
      expect(hexagons).toEqual([
        "862830827ffffff",
        "86283082fffffff",
        "862830877ffffff"
      ]);
    });
    it("should polyfill 5", () => {
      const hexagons = polyfill.polyfill(polygon, 5);
      hexagons.sort();
      expect(hexagons).toEqual([]);
    });
  });
});
