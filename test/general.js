const assert = require('assert');
const Checkout = require('../src/checkout.js');

describe('Checkout adds scans without order mattering', () => {

  const checkout = new Checkout();
  let input;

  beforeEach(() => checkout.clear());

  it('should return expected total', () => {
    input = ['GR1', 'SR1', 'GR1', 'GR1', 'CF1'];
    input.forEach(i => checkout.scan(i));
    assert.equal(checkout.total, 22.45);
  });

  it('should return expected total', () => {
    input = ['SR1', 'SR1', 'GR1', 'SR1'];
    input.forEach(i => checkout.scan(i));
    assert.equal(checkout.total, 16.61);
  })

  it('should apply all the discounts on a shuffled checkout', () => {
    input = ['SR1', 'GR1', 'SG1', 'CF1', 'SR1', 'GR1', 'SG1', 'SR1', 'GR1', 'SG1', 'SR1', 'SG1', 'SR1', 'SG1', 'SR1'];
    input.forEach(i => checkout.scan(i));
    assert.equal(checkout.total, 47.75);
  })
});
