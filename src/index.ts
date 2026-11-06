export interface RGBA {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a: number;
}
export function compositeOver(foreground: RGBA, background: RGBA): RGBA {
  for (const color of [foreground, background])
    for (const key of ['r', 'g', 'b', 'a'] as const) {
      const value = color[key];
      if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 1)
        throw new RangeError('RGBA channels must be finite values in [0,1]');
    }
  const a = foreground.a + background.a * (1 - foreground.a);
  if (a === 0) return { r: 0, g: 0, b: 0, a: 0 };
  const channel = (key: 'r' | 'g' | 'b') =>
    (foreground[key] * foreground.a + background[key] * background.a * (1 - foreground.a)) / a;
  return { r: channel('r'), g: channel('g'), b: channel('b'), a };
}
