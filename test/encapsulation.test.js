const { expect } = require('chai');
const Matrix = require('../src/matrix');

describe('R3: encapsulation', () => {
  it('rows and cols cannot be reassigned', () => {
    const m = new Matrix([[1, 2, 3], [4, 5, 6]]);
    m.rows = 10;
    m.cols = 10;
    expect(m.rows).to.equal(2);
    expect(m.cols).to.equal(3);
  });

  it('does not expose the internal storage', () => {
    const m = new Matrix([[1, 2], [3, 4]]);
    expect(m.data).to.equal(undefined);
  });

  it('cannot be modified through the public interface', () => {
    const m = new Matrix([[1, 2], [3, 4]]);
    m.toArray()[0][0] = 100;
    m.add(m);
    m.scale(2);
    m.transpose();
    expect(m.toArray()).to.deep.equal([[1, 2], [3, 4]]);
  });
});
