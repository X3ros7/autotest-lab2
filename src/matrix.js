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
    this.data = data.map((row) => [...row]);
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

  toArray() {
    return this.data.map((row) => [...row]);
  }

  static zeros(rows, cols) {
    return Matrix.#filled(rows, cols, () => 0);
  }

  static ones(rows, cols) {
    return Matrix.#filled(rows, cols, () => 1);
  }

  static identity(size) {
    return Matrix.#filled(size, size, (i, j) => (i === j ? 1 : 0));
  }

  static #filled(rows, cols, valueAt) {
    if (!Number.isInteger(rows) || rows < 1 || !Number.isInteger(cols) || cols < 1) {
      throw new RangeError('Matrix size must be made of positive integers');
    }
    const data = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push(valueAt(i, j));
      }
      data.push(row);
    }
    return new Matrix(data);
  }

  equals(other, epsilon = 0) {
    if (!(other instanceof Matrix)) {
      return false;
    }
    if (this.rows !== other.rows || this.cols !== other.cols) {
      return false;
    }
    return this.data.every((row, i) =>
      row.every((value, j) => Math.abs(value - other.data[i][j]) <= epsilon)
    );
  }

  add(other) {
    if (!(other instanceof Matrix)) {
      throw new TypeError('Argument must be a Matrix');
    }
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new RangeError('Matrices must have the same shape');
    }
    return new Matrix(this.data.map((row, i) => row.map((value, j) => value + other.data[i][j])));
  }

  subtract(other) {
    if (!(other instanceof Matrix)) {
      throw new TypeError('Argument must be a Matrix');
    }
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new RangeError('Matrices must have the same shape');
    }
    return new Matrix(this.data.map((row, i) => row.map((value, j) => value - other.data[i][j])));
  }
}

module.exports = Matrix;
