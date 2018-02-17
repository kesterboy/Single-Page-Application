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

INSERT INTO book VALUES ( null, 'Harry Potter', 'j k Rowling', 'action', 'This is a very good good book for everyone', 'false', 222, 'true',222,'hp.PNG', '2016-11-22');
INSERT INTO book VALUES ( null, 'The Davinci Code', 'Dan Brown', 'thriller', 'This is a very good good book for everyone', 'false', 222, 'true',222,'tdc.PNG', '2016-12-21');
INSERT INTO book VALUES ( null, 'The Catcher in the Rye', 'J D Salinger', 'drammer', 'This is a very good good book for everyone', 'false', 111, 'true',111,'thecitrye.PNG', '2016-12-21');
INSERT INTO book VALUES ( null, 'The kill Order', 'James Dashner', 'drammer', 'This is a very good good book for everyone', 'false', 222, 'true',222,'tko.PNG', '2016-12-21');
INSERT INTO book VALUES ( null, 'Hunger Game', 'Suzanne Collins', 'action', 'This is a very good good book for everyone', 'false', 111, 'true',111,'hg.PNG', '2016-12-21');
INSERT INTO book VALUES ( null, 'A Game Of Thrones', 'George R R Martin', 'action', 'This is a very good good book for everyone', 'false', 111, 'true',111,'got.PNG', '2016-12-21');

DROP TABLE IF EXISTS customer;

CREATE TABLE customer (
	id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
	firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	phone VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL);
     
INSERT INTO customer VALUES ( null, 'Bill', 'Geits', 'kes@ait', '888888888', 'password');
INSERT INTO customer VALUES ( null, 'Donald', 'Trump', 'john@ait', '6666666666', 'password');
INSERT INTO customer VALUES ( null, 'Egor', 'smith', 'egor@ait', '777777777', 'password');

DROP TABLE IF EXISTS librarian;

CREATE TABLE librarian (
	id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
	firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	phone VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL);
   
INSERT INTO librarian VALUES ( null, 'Egor', 'Bogachev', 'egor@ait', '999999999', 'password');
INSERT INTO librarian VALUES ( null, 'Harry', 'John', 'john@ait', '777777777', 'password');
INSERT INTO librarian VALUES ( null, 'John', 'Kesther', 'kes@ait', '7777876', 'password');

DROP TABLE IF EXISTS library.admin;

CREATE TABLE library.admin (
	id VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL);
    
INSERT INTO admin VALUES ('admin', 'password');

select * from book;
