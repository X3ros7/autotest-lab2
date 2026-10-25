class Matrix {
  constructor(data) {
    if (!Array.isArray(data) || data.length === 0) {
      throw new TypeError('Matrix data must be a non-empty two-dimensional array');
    }
    const cols = Array.isArray(data[0]) ? data[0].length : 0;
    if (cols === 0) {
      throw new TypeError('Matrix rows must be non-empty arrays');
    }
    for (const row of data) {
      if (!Array.isArray(row) || row.length !== cols) {
        throw new TypeError('All matrix rows must have the same length');
      }
      for (const value of row) {
        if (typeof value !== 'number' || !Number.isFinite(value)) {
          throw new TypeError('Matrix elements must be finite numbers');
        }
      }
    }
    this.data = data;
    this.rows = data.length;
    this.cols = cols;
  }

  get(i, j) {
    if (!Number.isInteger(i) || i < 0 || i >= this.rows) {
      throw new RangeError('Row index is out of range');
    }
    if (!Number.isInteger(j) || j < 0 || j >= this.cols) {
      throw new RangeError('Column index is out of range');
    }
    return this.data[i][j];
  }
}

module.exports = Matrix;
