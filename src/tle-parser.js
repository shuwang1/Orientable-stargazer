/**
 * Parses a TLE (Two-Line Element) string into a dictionary of satellite data.
 * @param {string} tleall - The raw TLE data string.
 * @returns {Object} A dictionary where keys are satellite IDs and values are comma-separated strings of name, line 1, and line 2.
 */
export function parse_tle(tleall) {
  var tles = {};
  var tlesplit = tleall.split(/\r?\n/).map((line) => line.trim());
  tlesplit = tlesplit.filter((line) => line.length > 0);

  var ntle = Math.floor(tlesplit.length / 3);
  for (var i = 0; i < ntle; i++) {
    var nameLine = tlesplit[3 * i];
    var line1 = tlesplit[3 * i + 1];
    var line2 = tlesplit[3 * i + 2];

    if (line1 && line1.length >= 8) {
      var satId = line1.substring(2, 8).trim();
      tles[satId] = nameLine + ',' + line1 + ',' + line2;
    }
  }
  return tles;
}
