const { expect } = require('chai');
const Matrix = require('../src/matrix');

describe('R6: addition and subtraction', () => {
  const a = () => new Matrix([[1, 2], [3, 4]]);
  const b = () => new Matrix([[5, 6], [7, 8]]);

  it('adds matrices element-wise', () => {
    expect(a().add(b()).toArray()).to.deep.equal([[6, 8], [10, 12]]);
  });

  it('adds rectangular matrices', () => {
    const x = new Matrix([[1, 2, 3]]);
    const y = new Matrix([[10, 20, 30]]);
    expect(x.add(y).toArray()).to.deep.equal([[11, 22, 33]]);
  });

  it('subtracts matrices element-wise', () => {
    expect(b().subtract(a()).toArray()).to.deep.equal([[4, 4], [4, 4]]);
  });

  it('adding a zero matrix does not change the matrix', () => {
    expect(a().add(Matrix.zeros(2, 2)).equals(a())).to.equal(true);
  });

  it('subtracting a matrix from itself gives a zero matrix', () => {
    expect(a().subtract(a()).equals(Matrix.zeros(2, 2))).to.equal(true);
  });

  it('returns a new matrix and does not change the operands', () => {
    const x = a();
    const y = b();
    const sum = x.add(y);
    expect(sum).to.be.instanceOf(Matrix);
    expect(sum).to.not.equal(x);
    expect(x.toArray()).to.deep.equal([[1, 2], [3, 4]]);
    expect(y.toArray()).to.deep.equal([[5, 6], [7, 8]]);
  });

  it('throws RangeError for matrices of different shapes', () => {
    expect(() => a().add(Matrix.ones(2, 3))).to.throw(RangeError);
    expect(() => a().subtract(Matrix.ones(3, 2))).to.throw(RangeError);
  });

  it('throws TypeError when the argument is not a matrix', () => {
    expect(() => a().add([[1, 2], [3, 4]])).to.throw(TypeError);
    expect(() => a().subtract(5)).to.throw(TypeError);
  });
});
