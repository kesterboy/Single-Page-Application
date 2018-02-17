package com.ait.lib;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.ait.lib.*;

public class LibrariansDAO {
    public List<Librarian> findAllLibrarians() {
        List<Librarian> list = new ArrayList<Librarian>();
        Connection c = null;
    	String sql = "SELECT * FROM librarian ORDER BY firstName";
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
    
    public Librarian findLibrarianById(int id){
    	String sql = "select * from librarian where id = ?";
    	Librarian librarian = null;
    	Connection c = null;
    	try{
    		c = ConnectionHelper.getConnection();
    		PreparedStatement ps = c.prepareStatement(sql);
    		ps.setInt(1,  id);
    		ResultSet rs = ps.executeQuery();
    		if(rs.next()){
    			librarian = processRow(rs);
    		}
    	}catch(Exception e){
    		e.printStackTrace();
    		throw new RuntimeException(e);
    	}finally{
    		ConnectionHelper.close(c);
    	}
    	return librarian;
    }

  
    
    public List<Librarian> findByLibrarianSurname(String lastName) {
        List<Librarian> list = new ArrayList<Librarian>();
        Connection c = null;
    	String sql = "SELECT * FROM librarian as b " +
    			"WHERE lastName LIKE ? " +
    			"OR firstName LIKE ? " +
    			"OR email LIKE ? " +
    			"ORDER BY firstName";
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, "%" + lastName.toUpperCase() + "%");
            ps.setString(2, "%" + lastName.toUpperCase() + "%");
            ps.setString(3, "%" + lastName.toUpperCase() + "%");
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
    
    public boolean removeLibrarian(int id) {
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("DELETE FROM librarian WHERE id=?");
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
    
    public Librarian createLibrarian(Librarian librarian) {
        Connection c = null;
        PreparedStatement ps = null;
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement("INSERT INTO librarian (firstName, lastName, email, phone,  password) VALUES (?, ?, ?, ?, ?)",
                new String[] { "ID" });
            ps.setString(1, librarian.getFirstName());
            ps.setString(2, librarian.getLastName());
            ps.setString(3, librarian.getEmail());
            ps.setString(4, librarian.getPhone());
            ps.setString(5, librarian.getPassword());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            // Update the id in the returned object. This is important as this value must be returned to the client.
            int id = rs.getInt(1);
            librarian.setId(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return librarian;
    }
    
    public Librarian updateLibrarian(Librarian librarian) {
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("UPDATE librarian SET firstName=?, lastName=?, "
            		+ "email=?, phone=?, password=? WHERE id=?");
            ps.setString(1, librarian.getFirstName());
            ps.setString(2, librarian.getLastName());
            ps.setString(3, librarian.getEmail());
            ps.setString(4, librarian.getPhone());
            ps.setString(5, librarian.getPassword());
            ps.setInt(6, librarian.getId());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return librarian;
    }
   
    protected Librarian processRow(ResultSet rs) throws SQLException {
        Librarian librarian = new Librarian();
        librarian.setId(rs.getInt("id"));
        librarian.setFirstName(rs.getString("firstName"));
        librarian.setLastName(rs.getString("lastName"));
        librarian.setEmail(rs.getString("email"));
        librarian.setPhone(rs.getString("phone"));
        librarian.setPassword(rs.getString("password"));
        return librarian;
    }
}
