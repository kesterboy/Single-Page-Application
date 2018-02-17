package com.ait.utils;

import java.io.BufferedReader;
import java.io.FileReader;
import java.sql.Connection;
import java.sql.DriverManager;

public class UtilsSetup {
	 public void initialiseDB(String fileName)
	    {
		 Connection conn = null;
			String url = "jdbc:mysql://localhost:3306/library?user=root&password=";
			try {
				Class.forName("com.mysql.jdbc.Driver");
				conn = DriverManager.getConnection(url);
				 ScriptRunner runner = new ScriptRunner(conn,false,false);
				 runner.runScript(new BufferedReader(new FileReader(fileName)));
				 conn.close();
			} catch (Exception e) {
				e.printStackTrace();
			}	
	    }
}
