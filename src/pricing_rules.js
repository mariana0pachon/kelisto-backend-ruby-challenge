const Item = require('./item.js');

module.exports = {
  'SR1': new Item('strawberry', 5.00, false, { minCount: 3, price: 4.50 }),
  'GR1': new Item('green tea', 3.11, true),
  'CF1': new Item('coffee', 11.23),
  'SG1': new Item('sugar', 3.00, true, { minCount: 5, price: 1.10 }),
  'KW1': new Item('kiwi', 8.73, true, { minCount: 4, price: 6.96 })
}
