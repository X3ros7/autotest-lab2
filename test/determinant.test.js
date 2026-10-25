const { expect } = require('chai');
const Matrix = require('../src/matrix');

describe('R11: determinant of 1x1 and 2x2 matrices', () => {
  it('determinant of a 1x1 matrix is its element', () => {
    expect(new Matrix([[7]]).determinant()).to.equal(7);
    expect(new Matrix([[-3]]).determinant()).to.equal(-3);
  });

  it('determinant of a 2x2 matrix is ad - bc', () => {
    expect(new Matrix([[1, 2], [3, 4]]).determinant()).to.equal(-2);
    expect(new Matrix([[2, 0], [0, 3]]).determinant()).to.equal(6);
  });

  it('determinant of a singular 2x2 matrix is zero', () => {
    expect(new Matrix([[1, 2], [2, 4]]).determinant()).to.equal(0);
  });

  it('determinant of the 2x2 identity matrix is one', () => {
    expect(Matrix.identity(2).determinant()).to.equal(1);
  });

  it('throws RangeError for a non-square matrix', () => {
    expect(() => new Matrix([[1, 2, 3], [4, 5, 6]]).determinant()).to.throw(RangeError);
  });
});
