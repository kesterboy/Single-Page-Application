package com.ait.lib;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Admin {
	private String id, password;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
