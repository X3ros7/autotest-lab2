const { expect } = require('chai');
const Matrix = require('../src/matrix');

describe('R4: factory methods', () => {
  it('zeros creates a matrix filled with zeros', () => {
    expect(Matrix.zeros(2, 3).toArray()).to.deep.equal([[0, 0, 0], [0, 0, 0]]);
  });

  it('ones creates a matrix filled with ones', () => {
    expect(Matrix.ones(3, 2).toArray()).to.deep.equal([[1, 1], [1, 1], [1, 1]]);
  });

  it('identity creates an identity matrix', () => {
    expect(Matrix.identity(3).toArray()).to.deep.equal([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
  });

  it('returns Matrix instances', () => {
    expect(Matrix.zeros(1, 1)).to.be.instanceOf(Matrix);
    expect(Matrix.ones(1, 1)).to.be.instanceOf(Matrix);
    expect(Matrix.identity(1)).to.be.instanceOf(Matrix);
  });

  it('throws RangeError for sizes that are not positive integers', () => {
    expect(() => Matrix.zeros(0, 2)).to.throw(RangeError);
    expect(() => Matrix.ones(2, -1)).to.throw(RangeError);
    expect(() => Matrix.zeros(1.5, 2)).to.throw(RangeError);
    expect(() => Matrix.identity(0)).to.throw(RangeError);
    expect(() => Matrix.identity('a')).to.throw(RangeError);
  });
});
