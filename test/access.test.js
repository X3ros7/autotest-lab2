const { expect } = require('chai');
const Matrix = require('../src/matrix');

describe('R2: element access', () => {
  const m = new Matrix([[1, 2, 3], [4, 5, 6]]);

  it('returns the element at the given row and column', () => {
    expect(m.get(0, 0)).to.equal(1);
    expect(m.get(0, 2)).to.equal(3);
    expect(m.get(1, 1)).to.equal(5);
  });

  it('throws RangeError for a row outside the matrix', () => {
    expect(() => m.get(2, 0)).to.throw(RangeError);
    expect(() => m.get(-1, 0)).to.throw(RangeError);
  });

  it('throws RangeError for a column outside the matrix', () => {
    expect(() => m.get(0, 3)).to.throw(RangeError);
    expect(() => m.get(0, -1)).to.throw(RangeError);
  });

  it('throws RangeError for non-integer indexes', () => {
    expect(() => m.get(0.5, 0)).to.throw(RangeError);
    expect(() => m.get(0, 'a')).to.throw(RangeError);
  });
});
