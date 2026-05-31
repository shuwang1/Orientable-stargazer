import { describe, it, expect } from 'vitest';
import { parse_tle } from '../../src/tle-parser.js';

describe('TLE Parser', () => {
  it('should correctly parse a valid TLE string', () => {
    const tleData = `
GPS BIIR-2  (PRN 13)    
1 24876U 97035A   26151.45833333  .00000049  00000-0  00000-0 0  9993
2 24876  55.5135  44.7570 0216124 246.5416 112.1246  2.00565863211516
        `.trim();

    const result = parse_tle(tleData);
    expect(result).toHaveProperty('24876U');
    expect(result['24876U']).toContain('GPS BIIR-2  (PRN 13)');
    expect(result['24876U']).toContain('1 24876U');
    expect(result['24876U']).toContain('2 24876');
  });

  it('should return an empty object for invalid or empty input', () => {
    expect(parse_tle('')).toEqual({});
    expect(parse_tle('invalid data')).toEqual({});
  });

  it('should handle multiple satellites', () => {
    const tleData = `
SAT 1
1 00001U 20001A   20001.00000000  .00000000  00000-0  00000-0 0  0001
2 00001   0.0000   0.0000 0000000   0.0000   0.0000  1.00000000    01
SAT 2
1 00002U 20001B   20001.00000000  .00000000  00000-0  00000-0 0  0002
2 00002   0.0000   0.0000 0000000   0.0000   0.0000  1.00000000    02
        `.trim();

    const result = parse_tle(tleData);
    expect(Object.keys(result)).toHaveLength(2);
    expect(result).toHaveProperty('00001U');
    expect(result).toHaveProperty('00002U');
  });
});
