package com.ait.lib;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.ait.lib.*;

@Path("/admin")
public class AdminResource {
	AdminDAO dao = new AdminDAO();
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_XML })
	public List<Admin> findAllAdmins() {
		System.out.println("findAll");
		return dao.findAllAdmins();
	}
}
