package com.ait.lib;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.ait.lib.Book;

@Path("/librarians")
public class LibrariansResource {
	LibrariansDAO dao = new LibrariansDAO();
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Librarian> findAllLibrarians() {
		System.out.println("findAll");
		return dao.findAllLibrarians();
	}

	@GET @Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Librarian findLibrarianById(@PathParam("id") String id) {
		System.out.println("findLibrarianById "+id);
		return dao.findLibrarianById(Integer.parseInt(id));
	}
	
	@GET @Path("search/{query}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Librarian> findByLibrarianSurname(@PathParam("query") String query) {
		System.out.println("findByLibrarianSurname: " + query);
		return dao.findByLibrarianSurname(query);
	}
	

	
	@DELETE @Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public void remove(@PathParam("id") int id) {
		dao.removeLibrarian(id);
	}
	
	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Librarian create(Librarian librarian) {
		System.out.println("creating librarian");
		return dao.createLibrarian(librarian);
	}
	
	@PUT @Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Librarian update(Librarian librarian) {
		System.out.println("Updating librarian: " + librarian);
		dao.updateLibrarian(librarian);
		return librarian;
	}
}
