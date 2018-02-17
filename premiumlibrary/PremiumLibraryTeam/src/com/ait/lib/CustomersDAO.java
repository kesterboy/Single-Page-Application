
package com.ait.lib;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CustomersDAO {
    public List<Customer> findAllCustomers() {
        List<Customer> list = new ArrayList<Customer>();
        Connection c = null;
    	String sql = "SELECT * FROM customer ORDER BY firstName";
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
    
    public Customer findCustomerById(int id){
    	String sql = "select * from customer where id = ?";
    	Customer customer = null;
    	Connection c = null;
    	try{
    		c = ConnectionHelper.getConnection();
    		PreparedStatement ps = c.prepareStatement(sql);
    		ps.setInt(1,  id);
    		ResultSet rs = ps.executeQuery();
    		if(rs.next()){
    			customer = processRow(rs);
    		}
    	}catch(Exception e){
    		e.printStackTrace();
    		throw new RuntimeException(e);
    	}finally{
    		ConnectionHelper.close(c);
    	}
    	return customer;
    }
    
    public List<Customer> findByCustomerSurname(String lastName) {
        List<Customer> list = new ArrayList<Customer>();
        Connection c = null;
    	String sql = "SELECT * FROM customer as b " +
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
    
    public boolean removeCustomer(int id) {
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("DELETE FROM customer WHERE id=?");
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
    
    public Customer createCustomer(Customer customer) {
        Connection c = null;
        PreparedStatement ps = null;
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement("INSERT INTO customer (firstName, lastName, email, phone, password) VALUES (?, ?, ?, ?, ?)",
                new String[] { "ID" });
            ps.setString(1, customer.getFirstName());
            ps.setString(2, customer.getLastName());
            ps.setString(3, customer.getEmail());
            ps.setString(4, customer.getPhone());
            ps.setString(5, customer.getPassword());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            // Update the id in the returned object. This is important as this value must be returned to the client.
            int id = rs.getInt(1);
            customer.setId(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return customer;
    }
    
    public Customer updateCustomer(Customer customer) {
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("UPDATE customer SET firstName=?, lastName=?, "
            		+ "email=?, phone=?, password=? WHERE id=?");
            ps.setString(1, customer.getFirstName());
            ps.setString(2, customer.getLastName());
            ps.setString(3, customer.getEmail());
            ps.setString(4, customer.getPhone());
            ps.setString(5, customer.getPassword());
            ps.setInt(6, customer.getId());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return customer;
    }
    
    protected Customer processRow(ResultSet rs) throws SQLException {
    	Customer customer = new Customer();
    	customer.setId(rs.getInt("id"));
    	customer.setFirstName(rs.getString("firstName"));
    	customer.setLastName(rs.getString("lastName"));
    	customer.setEmail(rs.getString("email"));
    	customer.setPhone(rs.getString("phone"));
    	customer.setPassword(rs.getString("password"));
        return customer;
    }
}
