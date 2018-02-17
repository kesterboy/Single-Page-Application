package com.ait.lib;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class BooksDAO {

    public List<Book> findAll() {
        List<Book> list = new ArrayList<Book>();
        Connection c = null;
    	String sql = "SELECT * FROM book ORDER BY bookName";
        try {
            c = ConnectionHelper.getConnection();
            Statement s = c.createStatement();
            ResultSet rs = s.executeQuery(sql);
            while (rs.next()) {
                list.add(processRow(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return list;
    }
    
    public Book findById(int id){
    	String sql = "select * from book where id = ?";
    	Book book = null;
    	Connection c = null;
    	try{
    		c = ConnectionHelper.getConnection();
    		PreparedStatement ps = c.prepareStatement(sql);
    		ps.setInt(1,  id);
    		ResultSet rs = ps.executeQuery();
    		if(rs.next()){
    			book = processRow(rs);
    		}
    	}catch(Exception e){
    		e.printStackTrace();
    		throw new RuntimeException(e);
    	}finally{
    		ConnectionHelper.close(c);
    	}
    	return book;
    }
    
    public List<Book> findByBookName(String name) {
        List<Book> list = new ArrayList<Book>();
        Connection c = null;
    	String sql = "SELECT * FROM book as b " +
        "WHERE UPPER(bookName) LIKE ? " +
        "OR UPPER(bookAuthor) LIKE ? " +
        "OR UPPER(bookCategory) LIKE ? " +
        "OR bookRentedUserId LIKE ? " +
    			"ORDER BY bookName";
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, "%" + name.toUpperCase() + "%");
            ps.setString(2, "%" + name.toUpperCase() + "%");
            ps.setString(3, "%" + name.toUpperCase() + "%");
            ps.setString(4, "%" + name.toUpperCase() + "%");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                list.add(processRow(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return list;
    }
    
    public boolean removeBook(int id) {
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("DELETE FROM book WHERE id=?");
            ps.setInt(1, id);
            int count = ps.executeUpdate();
            return count == 1;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
    }
    
    public Book createBook(Book book) {
        Connection c = null;
        PreparedStatement ps = null;
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement("INSERT INTO book (bookName, bookAuthor, bookCategory, "
            		+ "bookDescription, bookReserved, bookReservedUserId, bookRented, "
            		+ "bookRentedUserId,bookPicture, bookRentedDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?)",
                new String[] { "ID" });
            ps.setString(1, book.getBookName());
            ps.setString(2, book.getBookAuthor());
            ps.setString(3, book.getBookCategory());
            ps.setString(4, book.getBookDescription());
            ps.setString(5, book.getBookReserved());
            ps.setInt(6, book.getBookReservedUserId());
            ps.setString(7, book.getBookRented());
            ps.setInt(8, book.getBookRentedUserId());
            ps.setString(9, book.getBookPicture());
            ps.setString(10, book.getBookRentedDate());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            // Update the id in the returned object. This is important as this value must be returned to the client.
            int id = rs.getInt(1);
            book.setId(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return book;
    }

    public Book updateBook(Book book) {
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("UPDATE book SET bookName=?, bookAuthor=?, "
            		+ "bookCategory=?, bookDescription=?, bookReserved=?, bookReservedUserId=?, "
            		+ "bookRented=?, bookRentedUserId=?,bookPicture=?, bookRentedDate=? WHERE id=?");
            ps.setString(1, book.getBookName());
            ps.setString(2, book.getBookAuthor());
            ps.setString(3, book.getBookCategory());
            ps.setString(4, book.getBookDescription());
            ps.setString(5, book.getBookReserved());
            ps.setInt(6, book.getBookReservedUserId());
            ps.setString(7, book.getBookRented());
            ps.setInt(8, book.getBookRentedUserId());
            ps.setString(9, book.getBookPicture());
            ps.setString(10, book.getBookRentedDate());
            ps.setInt(11, book.getId());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return book;
    }
   
    protected Book processRow(ResultSet rs) throws SQLException {
        Book book = new Book();
        book.setId(rs.getInt("id"));
        book.setBookName(rs.getString("bookName"));
        book.setBookAuthor(rs.getString("bookAuthor"));
        book.setBookCategory(rs.getString("bookCategory"));
        book.setBookDescription(rs.getString("bookDescription"));
        book.setBookReserved(rs.getString("bookReserved"));
        book.setBookReservedUserId(rs.getInt("bookReservedUserId"));
        book.setBookRented(rs.getString("bookRented"));
        book.setBookRentedUserId(rs.getInt("bookRentedUserId"));
        book.setBookPicture(rs.getString("bookPicture"));
        book.setBookRentedDate(rs.getString("bookRentedDate"));
        return book;
    }
    
}
