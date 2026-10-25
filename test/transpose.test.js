const { expect } = require('chai');
const Matrix = require('../src/matrix');

describe('R9: transpose', () => {
  const a = () => new Matrix([[1, 2, 3], [4, 5, 6]]);

  it('transposes a rectangular matrix', () => {
    expect(a().transpose().toArray()).to.deep.equal([[1, 4], [2, 5], [3, 6]]);
  });

  it('swaps rows and cols', () => {
    const t = a().transpose();
    expect(t.rows).to.equal(3);
    expect(t.cols).to.equal(2);
  });

  it('transposes a square matrix', () => {
    const m = new Matrix([[1, 2], [3, 4]]);
    expect(m.transpose().toArray()).to.deep.equal([[1, 3], [2, 4]]);
  });

  it('transposing twice returns the original matrix', () => {
    expect(a().transpose().transpose().equals(a())).to.equal(true);
  });

  it('transpose of a product equals the product of transposes in reverse order', () => {
    const x = new Matrix([[1, 2, 3], [4, 5, 6]]);
    const y = new Matrix([[1, 2], [3, 4], [5, 6]]);
    const left = x.multiply(y).transpose();
    const right = y.transpose().multiply(x.transpose());
    expect(left.equals(right)).to.equal(true);
  });

  it('does not change the original matrix', () => {
    const m = a();
    m.transpose();
    expect(m.toArray()).to.deep.equal([[1, 2, 3], [4, 5, 6]]);
  });
});
