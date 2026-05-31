import { D2R } from './constants.js';

/**
 * Rotates a 3D point based on pitch and yaw.
 */
export function rotate3D(x, y, z, pitch, yaw) {
  // Rotate around Z axis (yaw)
  var cosY = Math.cos(yaw);
  var sinY = Math.sin(yaw);
  var x1 = x * cosY - y * sinY;
  var y1 = x * sinY + y * cosY;
  var z1 = z;

  // Rotate around X axis (pitch)
  var cosX = Math.cos(pitch);
  var sinX = Math.sin(pitch);
  var x2 = x1;
  var y2 = y1 * cosX - z1 * sinX;
  var z2 = y1 * sinX + z1 * cosX;

  return { x: x2, y: y2, z: z2 };
}

/**
 * Calculates Observer ECEF coordinates.
 */
export function getObserverEcef(orgllh) {
  var lat = orgllh.latitude;
  var lon = orgllh.longitude;
  var R_obs = 6378.1;
  return {
    x: R_obs * Math.cos(lat) * Math.cos(lon),
    y: R_obs * Math.cos(lat) * Math.sin(lon),
    z: R_obs * Math.sin(lat),
  };
}

/**
 * Computes Azimuth and Elevation for a list of satellite LLH coordinates.
 */
export function compute_satazel(orgllh, llhs, satelliteLib) {
  var azels = new Array(llhs.length);
  for (var i = 0; i < llhs.length; i++) {
    if (llhs[i]) {
      azels[i] = _compute_satazel(orgllh, llhs[i], satelliteLib);
    }
  }
  return azels;
}

export function _compute_satazel(orgllh, satllh, satelliteLib) {
  var satecf = satelliteLib.geodetic_to_ecf(satllh);
  var azel = satelliteLib.ecf_to_look_angles(orgllh, satecf);
  azel['azimuth'] = (azel['azimuth'] / Math.PI) * 180;
  azel['elevation'] = (azel['elevation'] / Math.PI) * 180;
  return azel;
}

/**
 * Computes DOP (Dilution of Precision) values.
 */
export function compute_dop(azs, els, MatrixLib) {
  var nsat = azs.length;
  if (nsat < 4) return { hdop: 99.9, vdop: 99.9, pdop: 99.9 };

  var G = MatrixLib.Zero(nsat, 4);
  for (var i = 0; i < nsat; i++) {
    G.elements[i][0] = Math.cos(els[i]) * Math.sin(azs[i]); // East
    G.elements[i][1] = Math.cos(els[i]) * Math.cos(azs[i]); // North
    G.elements[i][2] = Math.sin(els[i]); // Up
    G.elements[i][3] = 1;
  }

  var Gt = G.transpose();
  var GtG = Gt.multiply(G);
  var D = GtG.inverse();

  var out = { hdop: 99.9, vdop: 99.9, pdop: 99.9 };
  if (D && D.elements) {
    var hVal = D.elements[0][0] + D.elements[1][1];
    var vVal = D.elements[2][2];
    var pVal = D.elements[0][0] + D.elements[1][1] + D.elements[2][2];

    out['hdop'] = hVal > 0 && hVal < 10000 ? Math.sqrt(hVal) : 99.9;
    out['vdop'] = vVal > 0 && vVal < 10000 ? Math.sqrt(vVal) : 99.9;
    out['pdop'] = pVal > 0 && pVal < 10000 ? Math.sqrt(pVal) : 99.9;
  }
  return out;
}

export function check_azel(azels, azs, els, elemask) {
  for (var i = 0; i < azels.length; i++) {
    if (azels[i]) {
      if (azels[i]['elevation'] > elemask) {
        azs.push(azels[i]['azimuth'] * D2R);
        els.push(azels[i]['elevation'] * D2R);
      }
    }
  }
  return [azs, els];
}
