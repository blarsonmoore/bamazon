var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displayProducts();
});

function displayProducts() {
  var querrySQL = "SELECT * FROM products";
  console.log("Displaying all products...\n");
  connection.query(querrySQL, function(err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      console.log(
        "Item ID: " +
          res[i].item_id +
          " Product: " +
          res[i].product_name +
          " Price: $" +
          res[i].price +
          " Availible Qty: " +
          res[i].stock_quantity +
          "\n" +
          "---------------------------------------------------------------"
      );
    }
    itemSelection();
    // }
  });
}

function itemSelection() {
  inquirer
    .prompt([
      {
        name: "item_id",
        type: "input",
        message: "Enter item_id of product choice."
      },
      {
        name: "qty",
        type: "input",
        message: "How many would you like?"
      }
    ])
    .then(function(answer) {
      var item = answer.item_id;
      var qty = answer.qty;
      var querrySQL = "SELECT * FROM products";

      connection.query(querrySQL, function(err, res) {
        if (err) throw err;
        console.log(item);

        if (answer.item_id.length === 0) {
          console.log("Invalid Item ID. Please enter a new ID");
          setTimeout(displayProducts, 1500);
        } else {
          var availQty = res.stock_quantity;

          if (availQty < qty) {
            console.log("Requested Quantity is availible. ");
          }
        }
      });

      console.log(answer.item_id);
      console.log(answer.qty);
    });
}
