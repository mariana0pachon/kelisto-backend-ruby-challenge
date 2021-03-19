const Checkout = require('./checkout.js');
const pricingRules = require('./pricing_rules.js');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

let question = '';
Object.keys(pricingRules).forEach((code) => {
  let pr = pricingRules[code]
  question += `${code}: ${pr.name}, £${pr.price}`;
  question += pr.buyOneGetOne ? ', buy one get one free' : '';
  question += pr.discount ? `, £${pr.discount.price} when ${pr.discount.minCount} or more` : '';
  question += '\n'
});

const checkout = new Checkout();

readline.question(
  'Add as many of these to the basket (comma separated codes):\n\n' + question + '\n\n',
  (userInput) => {
    let items = userInput.replace(/\s/g, '').split(',');
    items.forEach(i => checkout.scan(i));
    console.log(`\n\nYour total is £${checkout.total}`);
    readline.close()
  }
);
