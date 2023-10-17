//import the read and write functions we created in the helpers file
const { readJSONFile, writeJSONFile } = require("./src/helpers");

//grab the data inside of the bookStoreCart and use the readJSONFile function in order to be able to read the file in here
//assign it to the variable books so that we can reuse it
const books = readJSONFile("./data", "bookStoreCart.json");
// console.log(books);

const bookInventory = readJSONFile("./data", "bookStoreInventory.json");
// console.log(bookInventory);

//import the functions created in the Controller file
const { addToCart } = require("./src/bookStoreController");
// create an alias called inform to store the console.log function
// When providing user feedback in the terminal use `inform`
// When developing/debugging use `console.log`
const inform = console.log;

//the run function
function run() {
  //process.argv
  const action = process.argv[2];
  const bookTitle = process.argv[3];

  //write to file toggle
  let writeToFile = false;
  let updatedCart;

  switch (action) {
    case "cart":
      inform(action, books);
      break;
    case "create":
      inform(action, book);
      break;
    case "show":
      inform(action, book);
      break;
    case "update":
      inform(action, bookTitle);
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
      //   inform(action);
      break;
    case "total":
      inform(action);
      break;
    default:
      writeToFile = true;
      updatedCart = [];
  }
  if (writeToFile) {
    writeJSONFile("./data", "bookStoreCart.json", updatedCart);
  }
}

run();
