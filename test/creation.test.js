const { expect } = require('chai');
const Matrix = require('../src/matrix');

describe('R1: creation and validation', () => {
  it('creates a matrix and exposes rows and cols', () => {
    const m = new Matrix([[1, 2, 3], [4, 5, 6]]);
    expect(m.rows).to.equal(2);
    expect(m.cols).to.equal(3);
  });

  it('creates a 1x1 matrix', () => {
    const m = new Matrix([[7]]);
    expect(m.rows).to.equal(1);
    expect(m.cols).to.equal(1);
  });

  it('throws TypeError when data is not an array', () => {
    expect(() => new Matrix()).to.throw(TypeError);
    expect(() => new Matrix('abc')).to.throw(TypeError);
    expect(() => new Matrix(5)).to.throw(TypeError);
  });

  it('throws TypeError for an empty array', () => {
    expect(() => new Matrix([])).to.throw(TypeError);
  });

  it('throws TypeError for empty rows', () => {
    expect(() => new Matrix([[]])).to.throw(TypeError);
  });

  it('throws TypeError for a one-dimensional array', () => {
    expect(() => new Matrix([1, 2, 3])).to.throw(TypeError);
  });

  it('throws TypeError for rows of different length', () => {
    expect(() => new Matrix([[1, 2], [3]])).to.throw(TypeError);
  });

  it('throws TypeError for non-numeric and non-finite elements', () => {
    expect(() => new Matrix([[1, 'a'], [3, 4]])).to.throw(TypeError);
    expect(() => new Matrix([[1, NaN], [3, 4]])).to.throw(TypeError);
    expect(() => new Matrix([[1, Infinity], [3, 4]])).to.throw(TypeError);
  });
});
