const { expect } = require('chai');
const Matrix = require('../src/matrix');

describe('R8: matrix multiplication', () => {
  const a = () => new Matrix([[1, 2], [3, 4]]);
  const b = () => new Matrix([[0, 1], [1, 0]]);

  it('multiplies square matrices', () => {
    expect(a().multiply(new Matrix([[5, 6], [7, 8]])).toArray()).to.deep.equal([[19, 22], [43, 50]]);
  });

  it('multiplies a 2x3 matrix by a 3x2 matrix', () => {
    const x = new Matrix([[1, 2, 3], [4, 5, 6]]);
    const y = new Matrix([[1, 2], [3, 4], [5, 6]]);
    expect(x.multiply(y).toArray()).to.deep.equal([[22, 28], [49, 64]]);
  });

  it('multiplies a 3x2 matrix by a 2x3 matrix', () => {
    const x = new Matrix([[1, 2], [3, 4], [5, 6]]);
    const y = new Matrix([[1, 2, 3], [4, 5, 6]]);
    expect(x.multiply(y).toArray()).to.deep.equal([[9, 12, 15], [19, 26, 33], [29, 40, 51]]);
  });

  it('multiplies a row by a column and a column by a row', () => {
    const row = new Matrix([[1, 2, 3]]);
    const column = new Matrix([[4], [5], [6]]);
    expect(row.multiply(column).toArray()).to.deep.equal([[32]]);
    expect(column.multiply(row).toArray()).to.deep.equal([[4, 8, 12], [5, 10, 15], [6, 12, 18]]);
  });

  it('the identity matrix does not change the matrix', () => {
    const i = Matrix.identity(2);
    expect(a().multiply(i).equals(a())).to.equal(true);
    expect(i.multiply(a()).equals(a())).to.equal(true);
  });

  it('is not commutative', () => {
    expect(a().multiply(b()).toArray()).to.deep.equal([[2, 1], [4, 3]]);
    expect(b().multiply(a()).toArray()).to.deep.equal([[3, 4], [1, 2]]);
  });

  it('is associative', () => {
    const c = new Matrix([[2, 0], [1, 3]]);
    const left = a().multiply(b()).multiply(c);
    const right = a().multiply(b().multiply(c));
    expect(left.equals(right)).to.equal(true);
  });

  it('is distributive over addition', () => {
    const c = new Matrix([[2, 0], [1, 3]]);
    const left = a().multiply(b().add(c));
    const right = a().multiply(b()).add(a().multiply(c));
    expect(left.equals(right)).to.equal(true);
  });

  it('does not change the operands', () => {
    const x = a();
    x.multiply(b());
    expect(x.toArray()).to.deep.equal([[1, 2], [3, 4]]);
  });

  it('throws RangeError when the inner dimensions do not match', () => {
    expect(() => a().multiply(Matrix.ones(3, 2))).to.throw(RangeError);
    expect(() => new Matrix([[1, 2, 3]]).multiply(new Matrix([[1, 2, 3]]))).to.throw(RangeError);
  });

  it('throws TypeError when the argument is not a matrix', () => {
    expect(() => a().multiply([[1, 2], [3, 4]])).to.throw(TypeError);
    expect(() => a().multiply(2)).to.throw(TypeError);
  });
});
