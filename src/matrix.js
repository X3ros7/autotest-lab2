class Matrix {
  #data;
  #rows;
  #cols;

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
    this.#data = data.map((row) => [...row]);
    this.#rows = data.length;
    this.#cols = cols;
  }

  get rows() {
    return this.#rows;
  }

  get cols() {
    return this.#cols;
  }

  get(i, j) {
    this.#assertIndexes(i, j);
    return this.#data[i][j];
  }

  #assertIndexes(i, j) {
    if (!Number.isInteger(i) || i < 0 || i >= this.rows) {
      throw new RangeError('Row index is out of range');
    }
    if (!Number.isInteger(j) || j < 0 || j >= this.cols) {
      throw new RangeError('Column index is out of range');
    }
  }

  toArray() {
    return this.#data.map((row) => [...row]);
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
    return this.#data.every((row, i) =>
      row.every((value, j) => Math.abs(value - other.#data[i][j]) <= epsilon)
    );
  }

  add(other) {
    return this.#combine(other, (a, b) => a + b);
  }

  subtract(other) {
    return this.#combine(other, (a, b) => a - b);
  }

  #combine(other, operation) {
    Matrix.#assertMatrix(other);
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new RangeError('Matrices must have the same shape');
    }
    return new Matrix(
      this.#data.map((row, i) => row.map((value, j) => operation(value, other.#data[i][j])))
    );
  }

  static #assertMatrix(value) {
    if (!(value instanceof Matrix)) {
      throw new TypeError('Argument must be a Matrix');
    }
  }

  scale(factor) {
    if (typeof factor !== 'number' || !Number.isFinite(factor)) {
      throw new TypeError('Factor must be a finite number');
    }
    return new Matrix(this.#data.map((row) => row.map((value) => value * factor)));
  }

  multiply(other) {
    Matrix.#assertMatrix(other);
    if (this.cols !== other.rows) {
      throw new RangeError('Number of columns must equal the number of rows of the other matrix');
    }
    const data = [];
    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < other.cols; j++) {
        let sum = 0;
        for (let k = 0; k < this.cols; k++) {
          sum += this.#data[i][k] * other.#data[k][j];
        }
        row.push(sum);
      }
      data.push(row);
    }
    return new Matrix(data);
  }

  transpose() {
    const data = [];
    for (let j = 0; j < this.cols; j++) {
      data.push(this.#data.map((row) => row[j]));
    }
    return new Matrix(data);
  }

  isSquare() {
    return this.rows === this.cols;
  }

  trace() {
    this.#assertSquare();
    return this.#data.reduce((sum, row, i) => sum + row[i], 0);
  }

  #assertSquare() {
    if (!this.isSquare()) {
      throw new RangeError('Matrix must be square');
    }
  }

  determinant() {
    this.#assertSquare();
    if (this.rows === 1) {
      return this.#data[0][0];
    }
    let sum = 0;
    for (let j = 0; j < this.cols; j++) {
      sum += this.#data[0][j] * this.cofactor(0, j);
    }
    return sum;
  }

  minor(i, j) {
    this.#assertIndexes(i, j);
    if (this.rows === 1 || this.cols === 1) {
      throw new RangeError('Minor of a matrix with a single row or column is empty');
    }
    return new Matrix(
      this.#data.filter((_, r) => r !== i).map((row) => row.filter((_, c) => c !== j))
    );
  }

  cofactor(i, j) {
    const sign = (i + j) % 2 === 0 ? 1 : -1;
    return sign * this.minor(i, j).determinant();
  }

  inverse() {
    this.#assertSquare();
    const det = this.determinant();
    if (det === 0) {
      throw new Error('Matrix is singular');
    }
    if (this.rows === 1) {
      return new Matrix([[1 / det]]);
    }
    const cofactors = this.#data.map((row, i) => row.map((_, j) => this.cofactor(i, j)));
    return new Matrix(cofactors).transpose().scale(1 / det);
  }
}

module.exports = Matrix;
