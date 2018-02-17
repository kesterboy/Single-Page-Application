package com.ait.lib;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.ait.lib.*;

public class AdminDAO {
    public List<Admin> findAllAdmins() {
        List<Admin> list = new ArrayList<Admin>();
        Connection c = null;
    	String sql = "SELECT * FROM admin ORDER BY id";
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
	
    protected Admin processRow(ResultSet rs) throws SQLException {
    	Admin admin = new Admin();
    	admin.setId(rs.getString("id"));
    	admin.setPassword(rs.getString("password"));
        return admin;
    }
}
