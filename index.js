//import the read and write functions we created in the helpers file
const { readJSONFile, writeJSONFile } = require("./src/helpers");

//grab the data inside of the bookStoreCart and use the readJSONFile function in order to be able to read the file in here
//assign it to the variable books so that we can reuse it
const books = readJSONFile("./data", "bookStoreCart.json");
// console.log(books);

const bookInventory = readJSONFile("./data", "bookStoreInventory.json");
// console.log(bookInventory);

console.log(books);

//import the functions created in the Controller file
const {
  addToCart,
  create,
  update,
  showByName,
  showById,
  showCart,
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
      inform(bookInformation);
      break;

    case "showById":
      const bookInfo = showById(bookInventory, process.argv[3]);
      inform(bookInfo);
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
      inform(action, book);
      break;

    case "clearCart":
      writeToFile = true;
      updatedCart = clearCart(books);

    case "addToCart":
      writeToFile = true;
      updatedCart = addToCart(books, bookInventory, bookTitle);
      break;
    case "total":
      inform(action);
      break;
    default:
      inform("There was an error.");
  }
  if (writeToFile) {
    writeJSONFile("./data", "bookStoreCart.json", updatedCart);
  }
}

// console.log(updatedCart);
run();
