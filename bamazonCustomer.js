var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "BruCey10-",
    database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // console.log(results);

        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    message: "Enter the |ID#| of the product you would like to buy.",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                            console.log("ID-" + results[i].item_id + " " + results[i].product_name + " $" + results[i].price)
                        }

                        return choiceArray;
                    },
                },

                {
                    name: "quanity",
                    type: "input",
                    message: "How many would you like to buy?",

                },
                {
                    name: "confirm",
                    type:"confirm",
                    message: "Are you sure"
                }
            ])
            .then(function (answer) {
                var chosenItem;
                // console.log("-----------" + answer.quanity + "-----------");
                // console.log("======="+ answer.choice + "=======")
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenItem = results[i];
                        // console.log(chosenItem);
                    }
                }
                if (chosenItem.stock_quanity > answer.quanity) {

                    var total = chosenItem.price * answer.quanity;
                    // var newQuanity = chosenItem.stock_quanity - answer.quanity;
                    console.log("Your total comes up to $" + total + "----------");
                    //--- ----------------------------------------------------------------------------------

                    console.log("Thank you for your business!!");

                    var newQuanity = chosenItem.stock_quanity - answer.quanity;
                    // console.log("--------" + chosenItem + "---------");
                    // console.log("--------" + answer + "---------");
                    // console.log("--------" + newQuanity + "---------");

                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quanity: newQuanity
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ]
                    );


                    // ---------------------------------------------------------------------------------------//
                    // console.log("--------"+newQuanity + "---------");
                }
                else {
                    console.log("Sorry we currently have " + chosenItem.stock_quanity + " remaining. Please adjust your order");
                    
                }
            })
    })

}





//     // connection.end();
// }
