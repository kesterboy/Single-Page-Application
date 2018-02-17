DROP DATABASE IF EXISTS library;
CREATE DATABASE IF NOT EXISTS library;
USE library;


DROP TABLE IF EXISTS book;

CREATE TABLE book (
	id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
	bookName VARCHAR(50) NOT NULL,
	bookAuthor VARCHAR(50) NOT NULL,
	bookCategory VARCHAR(50) NOT NULL,
	bookDescription VARCHAR(255) NOT NULL,
	   bookReserved VARCHAR(50) NOT NULL,
     bookReservedUserId INTEGER NULL,
     bookRented VARCHAR(50) NOT NULL,
     bookRentedUserId INTEGER NULL,
     bookPicture VARCHAR(255) NULL,
     bookRentedDate VARCHAR(255) NOT NULL);

INSERT INTO book VALUES ( null, 'Harry Potter', 'Potter Author', 'Potter category', 'Potter description', 'false', 222, 'true',222,'pic.PNG', '2016-11-22');
INSERT INTO book VALUES ( null, 'Mr Man', 'Man Author', 'Man category', 'Man description', 'false', 222, 'true',222,'pic1.PNG', '2016-12-21');
INSERT INTO book VALUES ( null, 'Pk Book', 'Pk Author', 'Pk category', 'Pk description', 'false', 111, 'true',111,'pic2.PNG', '2016-12-21');
INSERT INTO book VALUES ( null, 'kesther Book', 'kesther Author', 'kesther category', 'kesther description', 'false', 111, 'fals',111,'pic2.PNG', '2016-12-21');

DROP TABLE IF EXISTS customer;

CREATE TABLE customer (
	id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
	firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	phone VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL);
     
INSERT INTO customer VALUES ( null, 'Bill', 'Geits', 'bgeits@ait.ie', '888888888', 'password');
INSERT INTO customer VALUES ( null, 'Donald', 'Trump', 'dtrump@ait.ie', '6666666666', 'password');
INSERT INTO customer VALUES ( null, 'Egor', 'smith', 'stuff', '777777777', 'password');

DROP TABLE IF EXISTS librarian;

CREATE TABLE librarian (
	id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
	firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	phone VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL);
   
INSERT INTO librarian VALUES ( null, 'Egor', 'Bogachev', 'ebogachev@ait.ie', '999999999', 'password');
INSERT INTO librarian VALUES ( null, 'Harry', 'Potter', 'hpotter@ait.ie', '777777777', 'password');
INSERT INTO librarian VALUES ( null, 'John', 'Kesther', 'stuff', '7777876', 'password');

DROP TABLE IF EXISTS library.admin;

CREATE TABLE library.admin (
	id VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL);
    
INSERT INTO admin VALUES ('admin', 'password');


select * from book;
select * from librarian;
select * from customer;

