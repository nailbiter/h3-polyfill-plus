const h3 = require("h3-js");

function polyfill(polygon, resolution) {
  return h3.polyfill(polygon, resolution, true);
}

module.exports = {
  polyfill: polyfill
};
