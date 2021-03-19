const pricingRules = require('./pricing_rules.js')

class Checkout {
  constructor() {
    this.rules = JSON.parse(JSON.stringify(pricingRules)); // deep copy
    this.itemList = {};
    this.total = 0.00;
  }

  scan(itemCode) {
    if (!pricingRules[itemCode]) throw new Error('Item code must be in pricing rules');
    if (this.itemList[itemCode]) this.itemList[itemCode]++;
    else this.itemList[itemCode] = 1;
    this.addToTotal(itemCode);
  }

  addToTotal(itemCode) {
    const rule = this.rules[itemCode];
    const count = this.itemList[itemCode];

    const reachedDiscountMin = rule.discount && count === rule.discount.minCount;

    if (rule.buyOneGetOne && reachedDiscountMin) {
      let buyOneGetOneItemCount = Math.ceil(count / 2);
      this.triggerDiscount(rule.price, buyOneGetOneItemCount, rule.discount.price, itemCode);
    }
    else if (rule.buyOneGetOne && count % 2 == 0) { }
    else if (reachedDiscountMin) {
      this.triggerDiscount(rule.price, count, rule.discount.price, itemCode);
    }
    else {
      this.total += rule.price;
    }
    this.total = Math.round(this.total * 100) / 100;
  };

  triggerDiscount(oldPrice, itemCount, newPrice, itemCode) {
    this.total -= oldPrice * (itemCount - 1); // subtract existing full price items only if it's the first time applying discount
    this.total += newPrice * itemCount; // add new discounted price
    this.rules[itemCode].price = newPrice;
  }

  clear() {
    this.rules = JSON.parse(JSON.stringify(pricingRules)); // deep copy
    this.itemList = {};
    this.total = 0.00;
  }
}

module.exports = Checkout;
