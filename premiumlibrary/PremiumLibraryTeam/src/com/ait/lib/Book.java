package com.ait.lib;

import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement
public class Book {

    private int id;

    private String bookName;

    private String bookAuthor;

    private String bookCategory;

    private String bookDescription;
    
    private String bookReserved;
    
    private int bookReservedUserId;

    private String bookRented;
    
    private int bookRentedUserId;
    
    private String bookPicture;
    
    private String bookRentedDate;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public String getBookAuthor() {
		return bookAuthor;
	}

	public void setBookAuthor(String bookAuthor) {
		this.bookAuthor = bookAuthor;
	}

	public String getBookCategory() {
		return bookCategory;
	}

	public void setBookCategory(String bookCategory) {
		this.bookCategory = bookCategory;
	}

	public String getBookDescription() {
		return bookDescription;
	}

	public void setBookDescription(String bookDescription) {
		this.bookDescription = bookDescription;
	}

	public String getBookReserved() {
		return bookReserved;
	}

	public void setBookReserved(String bookReserved) {
		this.bookReserved = bookReserved;
	}

	public int getBookReservedUserId() {
		return bookReservedUserId;
	}

	public void setBookReservedUserId(int bookReservedUserId) {
		this.bookReservedUserId = bookReservedUserId;
	}

	public String getBookRented() {
		return bookRented;
	}

	public void setBookRented(String bookRented) {
		this.bookRented = bookRented;
	}

	public int getBookRentedUserId() {
		return bookRentedUserId;
	}

	public void setBookRentedUserId(int bookRentedUserId) {
		this.bookRentedUserId = bookRentedUserId;
	}

	public String getBookPicture() {
		return bookPicture;
	}

	public void setBookPicture(String bookPicture) {
		this.bookPicture = bookPicture;
	}

	public String getBookRentedDate() {
		return bookRentedDate;
	}

	public void setBookRentedDate(String bookRentedDate) {
		this.bookRentedDate = bookRentedDate;
	}

    
	
}

