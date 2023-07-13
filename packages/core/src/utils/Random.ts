export class Random {
  i: number;

  max: number;

  min: number;

  constructor(seed = 0, max = 1, min = 0) {
    this.i = seed;
    this.max = max;
    this.min = min;
  }

  next(max = this.max, min = this.min) {
    const r = (Math.abs(Math.sin(this.i)) * 10 ** 4) % 1;
    this.i += 1;
    return Math.floor(r * (max - min + 1)) + min;
  }
}
