const { expect } = require('chai');
const Matrix = require('../src/matrix');

describe('R11: determinant of matrices of any order', () => {
  it('computes the determinant of a 3x3 matrix', () => {
    expect(new Matrix([[1, 2, 3], [0, 1, 4], [5, 6, 0]]).determinant()).to.equal(1);
    expect(new Matrix([[2, 0, 1], [1, 3, 2], [1, 1, 1]]).determinant()).to.equal(0);
  });

  it('computes the determinant of a diagonal matrix as the product of its diagonal', () => {
    expect(new Matrix([[2, 0, 0], [0, 3, 0], [0, 0, 4]]).determinant()).to.equal(24);
  });

  it('determinant of a singular 3x3 matrix is zero', () => {
    expect(new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]).determinant()).to.equal(0);
  });

  it('computes the determinant of a 4x4 matrix', () => {
    const m = new Matrix([[1, 0, 2, -1], [3, 0, 0, 5], [2, 1, 4, -3], [1, 0, 5, 0]]);
    expect(m.determinant()).to.equal(30);
  });

  it('determinant of an identity matrix is one for any order', () => {
    expect(Matrix.identity(3).determinant()).to.equal(1);
    expect(Matrix.identity(5).determinant()).to.equal(1);
  });

  it('determinant of the transpose equals the determinant', () => {
    const m = new Matrix([[1, 2, 3], [0, 1, 4], [5, 6, 0]]);
    expect(m.transpose().determinant()).to.equal(m.determinant());
  });

  it('swapping two rows changes the sign of the determinant', () => {
    const m = new Matrix([[1, 2, 3], [0, 1, 4], [5, 6, 0]]);
    const swapped = new Matrix([[0, 1, 4], [1, 2, 3], [5, 6, 0]]);
    expect(swapped.determinant()).to.equal(-m.determinant());
  });

  it('determinant of a product equals the product of determinants', () => {
    const a = new Matrix([[1, 2, 3], [0, 1, 4], [5, 6, 0]]);
    const b = new Matrix([[2, 0, 1], [1, 3, 2], [0, 1, 1]]);
    expect(a.multiply(b).determinant()).to.equal(a.determinant() * b.determinant());
  });

  it('scaling an n x n matrix multiplies the determinant by k^n', () => {
    const m = new Matrix([[1, 2, 3], [0, 1, 4], [5, 6, 0]]);
    expect(m.scale(2).determinant()).to.equal(8 * m.determinant());
  });

  it('throws RangeError for a non-square matrix', () => {
    expect(() => Matrix.ones(3, 4).determinant()).to.throw(RangeError);
  });
});
