const { expect } = require('chai');
const Matrix = require('../src/matrix');

describe('R12: minor and cofactor', () => {
  const a = () => new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  const b = () => new Matrix([[1, 2, 3], [0, 1, 4], [5, 6, 0]]);

  describe('minor', () => {
    it('removes the given row and column', () => {
      expect(a().minor(1, 1).toArray()).to.deep.equal([[1, 3], [7, 9]]);
      expect(a().minor(0, 0).toArray()).to.deep.equal([[5, 6], [8, 9]]);
      expect(a().minor(2, 2).toArray()).to.deep.equal([[1, 2], [4, 5]]);
      expect(a().minor(0, 2).toArray()).to.deep.equal([[4, 5], [7, 8]]);
    });

    it('works for rectangular matrices', () => {
      expect(new Matrix([[1, 2, 3], [4, 5, 6]]).minor(0, 1).toArray()).to.deep.equal([[4, 6]]);
    });

    it('does not change the original matrix', () => {
      const m = a();
      m.minor(1, 1);
      expect(m.toArray()).to.deep.equal([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    });

    it('throws RangeError for indexes outside the matrix', () => {
      expect(() => a().minor(3, 0)).to.throw(RangeError);
      expect(() => a().minor(0, -1)).to.throw(RangeError);
    });

    it('throws RangeError for a matrix with a single row or column', () => {
      expect(() => new Matrix([[5]]).minor(0, 0)).to.throw(RangeError);
      expect(() => new Matrix([[1, 2, 3]]).minor(0, 0)).to.throw(RangeError);
      expect(() => new Matrix([[1], [2]]).minor(0, 0)).to.throw(RangeError);
    });
  });

  describe('cofactor', () => {
    it('is the determinant of the minor for even i + j', () => {
      expect(b().cofactor(0, 0)).to.equal(-24);
      expect(b().cofactor(1, 1)).to.equal(-15);
      expect(b().cofactor(0, 2)).to.equal(-5);
    });

    it('has the opposite sign for odd i + j', () => {
      expect(b().cofactor(0, 1)).to.equal(20);
      expect(b().cofactor(2, 1)).to.equal(-4);
    });

    it('works for a 2x2 matrix', () => {
      const m = new Matrix([[1, 2], [3, 4]]);
      expect(m.cofactor(0, 0)).to.equal(4);
      expect(m.cofactor(0, 1)).to.equal(-3);
      expect(m.cofactor(1, 0)).to.equal(-2);
      expect(m.cofactor(1, 1)).to.equal(1);
    });

    it('throws RangeError for indexes outside the matrix', () => {
      expect(() => b().cofactor(3, 3)).to.throw(RangeError);
    });
  });
});
