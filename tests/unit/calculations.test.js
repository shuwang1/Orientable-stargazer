import { describe, it, expect, vi } from 'vitest';
import { rotate3D, getObserverEcef, compute_dop } from '../../src/calculations.js';

describe('Calculations', () => {
  describe('rotate3D', () => {
    it('should rotate a point correctly around Y and X axes', () => {
      const point = { x: 1, y: 0, z: 0 };
      const result = rotate3D(point.x, point.y, point.z, 0, Math.PI / 2);
      // Rotated 90 deg around Z (yaw) -> x=0, y=1
      expect(result.x).toBeCloseTo(0);
      expect(result.y).toBeCloseTo(1);
      expect(result.z).toBe(0);
    });
  });

  describe('getObserverEcef', () => {
    it('should calculate ECEF coordinates from LLH', () => {
      const llh = { latitude: 0, longitude: 0, height: 0 };
      const result = getObserverEcef(llh);
      expect(result.x).toBeCloseTo(6378.1);
      expect(result.y).toBe(0);
      expect(result.z).toBe(0);
    });
  });

  describe('compute_dop', () => {
    it('should return 99.9 if less than 4 satellites', () => {
      const azs = [1, 2, 3];
      const els = [1, 2, 3];
      const result = compute_dop(azs, els, {});
      expect(result.pdop).toBe(99.9);
    });

    it('should calculate DOP correctly with mock Matrix library', () => {
      const mockMatrix = {
        Zero: vi.fn().mockReturnValue({
          elements: [[], [], [], []],
          transpose: vi.fn().mockReturnThis(),
          multiply: vi.fn().mockReturnThis(),
          inverse: vi.fn().mockReturnValue({
            elements: [
              [1, 0, 0, 0],
              [0, 1, 0, 0],
              [0, 0, 1, 0],
              [0, 0, 0, 1],
            ],
          }),
        }),
      };
      const azs = [0, 0, 0, 0];
      const els = [0, 0, 0, 0];
      const result = compute_dop(azs, els, mockMatrix);
      expect(result.hdop).toBe(Math.sqrt(2));
      expect(result.vdop).toBe(1);
      expect(result.pdop).toBe(Math.sqrt(3));
    });
  });
});
