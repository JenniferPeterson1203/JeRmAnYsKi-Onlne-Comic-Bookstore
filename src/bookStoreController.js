//the action functions goes in the Controller file

const { nanoid } = require("nanoid");

//import the readJSONFile function
const { readJSONFile } = require("./helpers");
const cart = readJSONFile("./data", "bookStoreCart.json");

const inventory = readJSONFile("./data", "bookStoreInventory.json");

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
    if (
      item.name.toLowerCase() === input.toLowerCase() ||
      item.author.toLowerCase() === input.toLowerCase() ||
      (item.id === input && item.inStock === true)
    ) {
      cart.push(item);
    }
  }
  return cart;
};

//showById Function
const showById = (inventory, bookId) => {
  let message;
  const book = inventory.find((book) => {
    if (book.id === bookId) {
      message = `${book.id} ${book.name} ${book.author} ${book.priceInCents}`;
    }
  });
  return message;
};

//showCart
const showCart = (cart) => {
  let cartContents = "You're cart is currenlty empty";
  for (let ele of cart) {
    cartContents = `You now have ${ele.name} ${ele.author}`;
  }
  return cartContents;
};

//showByName function
const showByName = (inventory, name) => {
  let message;
  const book = inventory.find((book) => {
    if (book.name === name) {
      message = `${book.id} ${book.name} ${book.author} ${book.priceInCents}`;
    }
  });
  return message;
};

module.exports = { addToCart, create, update, showByName, showById, showCart };
