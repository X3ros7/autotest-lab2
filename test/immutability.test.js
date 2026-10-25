const { expect } = require('chai');
const Matrix = require('../src/matrix');

describe('R3: independence from the source data', () => {
  it('does not change when the source array is modified', () => {
    const source = [[1, 2], [3, 4]];
    const m = new Matrix(source);
    source[0][0] = 100;
    expect(m.get(0, 0)).to.equal(1);
  });

  it('toArray returns the matrix data', () => {
    const m = new Matrix([[1, 2], [3, 4]]);
    expect(m.toArray()).to.deep.equal([[1, 2], [3, 4]]);
  });

  it('toArray returns a copy that does not affect the matrix', () => {
    const m = new Matrix([[1, 2], [3, 4]]);
    const copy = m.toArray();
    copy[0][0] = 100;
    expect(m.get(0, 0)).to.equal(1);
  });
});
