const { expect } = require('chai');
const Matrix = require('../src/matrix');

describe('R13: inverse matrix', () => {
  const EPS = 1e-9;
  const a = () => new Matrix([[1, 2, 3], [0, 1, 4], [5, 6, 0]]);
  const b = () => new Matrix([[4, 7], [2, 6]]);

  it('inverts a 1x1 matrix', () => {
    expect(new Matrix([[4]]).inverse().equals(new Matrix([[0.25]]), EPS)).to.equal(true);
  });

  it('inverts a 2x2 matrix', () => {
    const expected = new Matrix([[0.6, -0.7], [-0.2, 0.4]]);
    expect(b().inverse().equals(expected, EPS)).to.equal(true);
  });

  it('inverts a 3x3 matrix', () => {
    const expected = new Matrix([[-24, 18, 5], [20, -15, -4], [-5, 4, 1]]);
    expect(a().inverse().equals(expected, EPS)).to.equal(true);
  });

  it('A multiplied by its inverse is the identity', () => {
    expect(a().multiply(a().inverse()).equals(Matrix.identity(3), EPS)).to.equal(true);
    expect(b().multiply(b().inverse()).equals(Matrix.identity(2), EPS)).to.equal(true);
  });

  it('the inverse multiplied by A is the identity', () => {
    expect(a().inverse().multiply(a()).equals(Matrix.identity(3), EPS)).to.equal(true);
  });

  it('the inverse of the identity is the identity', () => {
    expect(Matrix.identity(4).inverse().equals(Matrix.identity(4), EPS)).to.equal(true);
  });

  it('the inverse of the inverse is the original matrix', () => {
    expect(a().inverse().inverse().equals(a(), EPS)).to.equal(true);
  });

  it('the inverse of a product is the product of inverses in reverse order', () => {
    const c = new Matrix([[2, 0, 1], [1, 3, 2], [0, 1, 1]]);
    const left = a().multiply(c).inverse();
    const right = c.inverse().multiply(a().inverse());
    expect(left.equals(right, EPS)).to.equal(true);
  });

  it('the inverse of the transpose is the transpose of the inverse', () => {
    const left = a().transpose().inverse();
    const right = a().inverse().transpose();
    expect(left.equals(right, EPS)).to.equal(true);
  });

  it('does not change the original matrix', () => {
    const m = b();
    m.inverse();
    expect(m.toArray()).to.deep.equal([[4, 7], [2, 6]]);
  });

  it('throws an error for a singular matrix', () => {
    expect(() => new Matrix([[1, 2], [2, 4]]).inverse()).to.throw(Error, 'Matrix is singular');
    expect(() => new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]).inverse()).to.throw(Error, 'Matrix is singular');
    expect(() => Matrix.zeros(2, 2).inverse()).to.throw(Error, 'Matrix is singular');
  });

  it('throws RangeError for a non-square matrix', () => {
    expect(() => Matrix.ones(2, 3).inverse()).to.throw(RangeError);
  });
});
