DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INTEGER(100) NOT NULL,
    stock_quanity INTEGER(11) NOT NULL,
    PRIMARY KEY (id)
);




INSERT INTO products (product_name, department_name, price, stock_quanity) 
VALUES ("Gameboy", "Electronics", 50, 5), ("Ipod", "Electronics", 75, 5), ("PC", "Electronics", 100, 1),
       ("Pants", "Apparal", 30, 5), ("Shirt", "Apparal", 20, 6), ("Shoes", "Apparal", 35, 5),("Sun Glasses", "Apparal", 50, 5),
       ("Green Eggs and Ham", "Books", 5, 2), ("Harry Potter", "Books", 10, 3), ("The ONE Thing", "Books", 7, 1);

