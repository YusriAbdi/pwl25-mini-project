CREATE DATABASE `week6-express-db`;
USE `week6-express-db`;

CREATE TABLE obat(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama varchar(50),
    kategori varchar(50),
    dosis varchar(50),
    harga INT,
    exp year
);