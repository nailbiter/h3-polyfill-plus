const expect = require("expect");
const polyfill = require("../src/polyfill");
const polyfill_plus = require("../src/polyfill-plus");
const polyfill_plusplus = require("../src/polyfill-plusplus");
const fs = require("fs");

const polygon = [
  [-122.4089866999972145, 37.813318999983238],
  [-122.3544736999993603, 37.7198061999978478],
  [-122.4798767000009008, 37.8151571999998453]
];
let flag = 0;

function dump(hexagons, method, resolution) {
  if (process.env.KEPLER_DUMP_FILE !== undefined && hexagons.length>0) {
    header = ["h3_id", "geojson", "method", "resolution"].join(",")
    lines = [];
    for (const hexagon of hexagons) {
      lines.push(
        [
          hexagon,
          '"' +
            JSON.stringify({
              type: "Polygon",
              coordinates: [polygon]
            }).replace(/\"/g, '""') +
            '"',
          method,
          resolution
        ].join(",")
      );
    }
    if (flag===0) {
      flag = 1;
      fs.writeFileSync(process.env.KEPLER_DUMP_FILE, [header,...lines].join("\n"));
    } else {
      fs.appendFileSync(process.env.KEPLER_DUMP_FILE, "\n"+lines.join("\n"));
    }
  }
}

describe("test of polyfill library", () => {
  describe("polyfill", () => {
    it("should polyfill 7", () => {
      const hexagons = polyfill.polyfill(polygon, 7);
      hexagons.sort();
      dump(hexagons,"polyfill",7);
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
      dump(hexagons,"polyfill",6);
      expect(hexagons).toEqual([
        "862830827ffffff",
        "86283082fffffff",
        "862830877ffffff"
      ]);
    });
    it("should polyfill 5", () => {
      const hexagons = polyfill.polyfill(polygon, 5);
      hexagons.sort();
      dump(hexagons,"polyfill",5);
      expect(hexagons).toEqual([]);
    });
  });
  describe("polyfill_plus", () => {
    it("should polyfill_plus 7", () => {
      const hexagons = polyfill_plus.polyfill_plus(polygon, 7);
      hexagons.sort();
      dump(hexagons,"polyfill_plus",7);
      expect(hexagons).toEqual([
        "87283080dffffff",
        "872830820ffffff",
        "872830826ffffff",
        "872830828ffffff",
        "87283082affffff",
        "87283082bffffff",
        "87283082effffff",
        "872830870ffffff",
        "872830870ffffff",
        "872830876ffffff"
      ]);
    });
    it("should polyfill_plus 6", () => {
      const hexagons = polyfill_plus.polyfill_plus(polygon, 6);
      hexagons.sort();
      dump(hexagons,"polyfill_plus",6);
      expect(hexagons).toEqual([
        "86283080fffffff",
        "862830827ffffff",
        "862830827ffffff",
        "86283082fffffff",
        "862830877ffffff",
        "862830877ffffff"
      ]);
    });
    it("should polyfill_plus 5", () => {
      const hexagons = polyfill_plus.polyfill_plus(polygon, 5);
      hexagons.sort();
      dump(hexagons,"polyfill_plus",5);
      expect(hexagons).toEqual(["85283083fffffff", "85283087fffffff"]);
    });
  });
});
