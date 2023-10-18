//import the read and write functions we created in the helpers file
const { readJSONFile, writeJSONFile } = require("./src/helpers");

//make the bookstore cart json file readable in a JS file and assign it to the variable books so that we can reuse it
const books = readJSONFile("./data", "bookStoreCart.json");

//make the book inventory json file readable in a JS file and assign it to the variable bookInventory so that we can reuse it
const bookInventory = readJSONFile("./data", "bookStoreInventory.json");

const lolcats = require("lolcats");

//import the functions created in the bookStoreController file
const {
  addToCart,
  create,
  update,
  showByName,
  showById,
  showCart,
  total,
  destroy,
  clearCart,
} = require("./src/bookStoreController");

// create an alias called inform to store the console.log function
// When providing user feedback in the terminal use `inform`
// When developing/debugging use `console.log`
const inform = console.log;

//the run function
function run() {
  //process.argv (these are all coming from the command line)
  const action = process.argv[2];
  const bookTitle = process.argv[3];
  const inputAuthor = process.argv[4];
  const inputReleaseDate = process.argv[5];
  const inputPriceInCents = process.argv[6];
  const inputSaleItem = process.argv[7];
  const inputInStock = process.argv[8];
  const inputId = process.argv[9];

  //write to file toggle
  let writeToFile = false;
  let updatedCart;

  switch (action) {
    case "showCart":
      const custCart = showCart(books);
      inform(custCart);
      break;

    case "create":
      const newInventory = create(
        bookInventory,
        bookTitle,
        inputAuthor,
        inputReleaseDate,
        inputPriceInCents,
        inputSaleItem,
        inputInStock
      );
      writeJSONFile("./data", "bookStoreInventory.json", newInventory);
      break;

    case "showByName":
      const bookInformation = showByName(bookInventory, bookTitle);
      lolcats.print(bookInformation);
      break;

    case "showById":
      const bookInfo = showById(bookInventory, process.argv[3]);
      lolcats.print(bookInfo);
      break;

    case "update":
      const updatedInventory = update(
        bookInventory,
        bookTitle,
        inputAuthor,
        inputReleaseDate,
        inputPriceInCents,
        inputSaleItem,
        inputInStock,
        inputId
      );
      writeJSONFile("./data", "bookStoreInventory.json", updatedInventory);
      break;

    case "destroy":
      writeToFile = true;
      updatedCart = destroy(books, process.argv[3]);
      break;

    case "clearCart":
      writeToFile = true;
      updatedCart = clearCart(books);
      break;

    case "total":
      const cartTotal = total(books);
      lolcats.print(cartTotal);
      // inform(cartTotal);
      writeJSONFile("./data", "bookStoreStoreCart.json", cartTotal);
      break;

    case "addToCart":
      writeToFile = true;
      updatedCart = addToCart(books, bookInventory, bookTitle);
      break;
    case "total":
      inform(action);
      break;
    default:
      lolcats.print("There was an error.");
  }
  if (writeToFile) {
    writeJSONFile("./data", "bookStoreCart.json", updatedCart);
  }
}

run();
