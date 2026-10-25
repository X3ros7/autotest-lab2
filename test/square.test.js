const { expect } = require('chai');
const Matrix = require('../src/matrix');

describe('R10: square matrices and trace', () => {
  it('isSquare is true for a square matrix', () => {
    expect(new Matrix([[1, 2], [3, 4]]).isSquare()).to.equal(true);
    expect(new Matrix([[1]]).isSquare()).to.equal(true);
  });

  it('isSquare is false for a rectangular matrix', () => {
    expect(new Matrix([[1, 2, 3], [4, 5, 6]]).isSquare()).to.equal(false);
    expect(new Matrix([[1], [2]]).isSquare()).to.equal(false);
  });

  it('trace is the sum of the diagonal elements', () => {
    expect(new Matrix([[1, 2], [3, 4]]).trace()).to.equal(5);
    expect(new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]).trace()).to.equal(15);
    expect(new Matrix([[7]]).trace()).to.equal(7);
  });

  it('trace of the identity matrix equals its size', () => {
    expect(Matrix.identity(4).trace()).to.equal(4);
  });

  it('trace of a sum equals the sum of traces', () => {
    const a = new Matrix([[1, 2], [3, 4]]);
    const b = new Matrix([[5, 6], [7, 8]]);
    expect(a.add(b).trace()).to.equal(a.trace() + b.trace());
  });

  it('trace throws RangeError for a non-square matrix', () => {
    expect(() => new Matrix([[1, 2, 3], [4, 5, 6]]).trace()).to.throw(RangeError);
  });
});
