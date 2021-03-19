class Item {
  constructor(name, price, buyOneGetOne, discount) {
    this.name = name;
    this.price = price;
    this.buyOneGetOne = buyOneGetOne; // true or false
    this.discount = discount; // {minCount: <Number>, price: <Float>}
  }
}

module.exports = Item;
