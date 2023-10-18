//the action functions goes in the Controller file

const { nanoid } = require("nanoid");
const lolcats = require("lolcats");
//import the readJSONFile function
const { readJSONFile } = require("./helpers");
const cart = readJSONFile("./data", "bookStoreCart.json");

const inventory = readJSONFile("./data", "bookStoreInventory.json");
const inform = console.log;

//update Function
const update = (
  inventory,
  inputName,
  inputAuthor,
  inputReleaseDate,
  inputPriceInCents,
  inputSaleItem,
  inputInStock,
  inputId
) => {
  const foundBook = inventory.findIndex((book) => book.id === inputId);
  const updatedBook = {
    id: inputId,
    name: inputName,
    author: inputAuthor,
    releaseDate: inputReleaseDate,
    priceInCents: inputPriceInCents,
    saleItem: inputSaleItem,
    inStock: inputInStock,
  };
  inventory.splice(foundBook, 1, updatedBook);
  return inventory;
};

//destroy function
const destroy = (cart, bookId) => {
  const index = cart.findIndex((book) => book.id === bookId);
  if (index > -1) {
    cart.splice(index, 1);
    lolcats.print(`Book has been successfully removed from the cart`);
    return cart;
  } else {
    lolcats.print(`Book was not found. No action taken`);
    return cart;
  }
};

//create Function
const create = (
  inventory,
  inputName,
  inputAuthor,
  inputReleaseDate,
  inputPriceInCents,
  inputSaleItem,
  inputInStock
) => {
  const newBook = {
    id: nanoid(4),
    name: inputName,
    author: inputAuthor,
    releaseDate: inputReleaseDate,
    priceInCents: inputPriceInCents,
    saleItem: inputSaleItem,
    inStock: inputInStock,
  };
  inventory.push(newBook);

  return inventory;
};

//addToCart function
const addToCart = (cart, inventory, input) => {
  for (let item of inventory) {
    const itemName = item.name ? item.name.toLowerCase() : "";
    const authorName = item.author ? item.author.toLowerCase() : "";

    if (
      itemName === input.toLowerCase() ||
      authorName === input.toLowerCase() ||
      (item.id === input && item.inStock === true)
    ) {
      cart.push(item);
    }
  }
  return cart;
};

//total function
const total = (cart) => {
  if (cart.length === 0) {
    return `Your cart is empty dude. Go SHOP 🤪!`;
  }
  const cartTotal = cart
    .map((book) => book.priceInCents)
    .reduce((acc, curr) => acc + curr / 100, 0)
    .toFixed(2);
  return `Your total comes out to: \n$${cartTotal}`;
};

//showById Function
const showById = (inventory, bookId) => {
  let message;
  const book = inventory.find((book) => {
    if (book.id === bookId) {
      message = `Book id: ${book.id}\nTitle: ${book.name}\nAuthor:${
        book.author
      }\nPrice: $${book.priceInCents / 100}`;
    }
  });
  return message;
};

//showCart
const showCart = (cart) => {
  let cartContents = "Your cart is currently empty";
  if (cart.length > 0) {
    cartContents = "";
    for (let ele of cart) {
      cartContents += `${ele.name} by ${ele.author}\n $${
        ele.priceInCents / 100
      }\n\n`;
    }
  }
  return cartContents;
};

//showByName function
const showByName = (inventory, name) => {
  let message;
  const book = inventory.find((book) => {
    if (book.name === name) {
      message = `Book id: ${book.id}\nTitle: ${book.name}\nAuthor:${
        book.author
      }\nPrice: $${book.priceInCents / 100}`;
    }
  });
  return message;
};

//clearCart function
const clearCart = (cart) => {
  if (cart.length > 0) {
    cart.length = 0;
  }
  return cart;
};

module.exports = {
  addToCart,
  create,
  update,
  showByName,
  showById,
  showCart,
  total,
  destroy,
  clearCart,
};
