const { expect } = require('chai');
const Matrix = require('../src/matrix');

describe('R5: equality', () => {
  const a = () => new Matrix([[1, 2], [3, 4]]);

  it('equal matrices are equal', () => {
    expect(a().equals(a())).to.equal(true);
  });

  it('matrices with different elements are not equal', () => {
    expect(a().equals(new Matrix([[1, 2], [3, 5]]))).to.equal(false);
  });

  it('matrices with different shapes are not equal', () => {
    expect(a().equals(new Matrix([[1, 2, 3], [4, 5, 6]]))).to.equal(false);
    expect(new Matrix([[1, 2]]).equals(new Matrix([[1], [2]]))).to.equal(false);
  });

  it('respects the epsilon tolerance', () => {
    const b = new Matrix([[1.0001, 2], [3, 3.9999]]);
    expect(a().equals(b)).to.equal(false);
    expect(a().equals(b, 0.001)).to.equal(true);
    expect(a().equals(b, 0.00001)).to.equal(false);
  });

  it('returns false for values that are not matrices', () => {
    expect(a().equals([[1, 2], [3, 4]])).to.equal(false);
    expect(a().equals(null)).to.equal(false);
    expect(a().equals(undefined)).to.equal(false);
  });
});
