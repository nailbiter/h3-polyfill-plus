const h3 = require("h3-js");

function polyfill_plus(polygon, resolution) {
  return [
    ...new Set(h3.polyfill(polygon, resolution, true)),
    ...new Set(polygon.map(pt=>h3.geoToH3(pt[1],pt[0],resolution)))
  ];
}

module.exports = {
  polyfill_plus: polyfill_plus
};
