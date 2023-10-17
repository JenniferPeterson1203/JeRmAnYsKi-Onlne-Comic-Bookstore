//the action functions goes in the Controller file

//import the readJSONFile function
const { readJSONFile } = require("./helpers");
const cart = readJSONFile("./data", "bookStoreCart.json");
//addToCart function
const addToCart = (cart, inventory, input) => {
  for (let item of inventory) {
    if (
      (item.name.toLowerCase() === input.toLowerCase() ||
        item.author.toLowerCase() === input.toLowerCase()) &&
      item.inStock === true
    ) {
      cart.push(item);
    }
  }
  return cart;
};

//function
const clearCart = (cart) => {
  cart.length = 0;
  return cart;
};
console.log(clearCart);

module.exports = { addToCart };

//   console.log(book.inStock);
//   console.log(book.name === name);
