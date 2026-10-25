const { expect } = require('chai');
const Matrix = require('../src/matrix');

describe('R7: multiplication by a scalar', () => {
  const a = () => new Matrix([[1, 2], [3, 4]]);

  it('multiplies every element by the number', () => {
    expect(a().scale(3).toArray()).to.deep.equal([[3, 6], [9, 12]]);
  });

  it('supports negative and fractional numbers', () => {
    expect(a().scale(-1).toArray()).to.deep.equal([[-1, -2], [-3, -4]]);
    expect(a().scale(0.5).toArray()).to.deep.equal([[0.5, 1], [1.5, 2]]);
  });

  it('multiplying by zero gives a zero matrix', () => {
    expect(a().scale(0).equals(Matrix.zeros(2, 2))).to.equal(true);
  });

  it('multiplying by one does not change the matrix', () => {
    expect(a().scale(1).equals(a())).to.equal(true);
  });

  it('does not change the original matrix', () => {
    const m = a();
    m.scale(10);
    expect(m.toArray()).to.deep.equal([[1, 2], [3, 4]]);
  });

  it('throws TypeError when the argument is not a finite number', () => {
    expect(() => a().scale('2')).to.throw(TypeError);
    expect(() => a().scale(null)).to.throw(TypeError);
    expect(() => a().scale(NaN)).to.throw(TypeError);
  });
});
