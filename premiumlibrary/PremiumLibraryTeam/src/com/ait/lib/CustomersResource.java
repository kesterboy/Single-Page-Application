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

import com.ait.lib.*;

@Path("/customers")
public class CustomersResource {
	CustomersDAO dao = new CustomersDAO();
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Customer> findAllCustomers() {
		System.out.println("findAll");
		return dao.findAllCustomers();
	}

	@GET @Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Customer findCustomerById(@PathParam("id") String id) {
		System.out.println("findCustomerById "+id);
		return dao.findCustomerById(Integer.parseInt(id));
	}
	
	@GET @Path("search/{query}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Customer> findByCustomerSurname(@PathParam("query") String query) {
		System.out.println("findByLibrarianSurname: " + query);
		return dao.findByCustomerSurname(query);
	}
	
	@DELETE @Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public void remove(@PathParam("id") int id) {
		dao.removeCustomer(id);
	}
	
	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Customer create(Customer customer) {
		System.out.println("creating customer");
		return dao.createCustomer(customer);
	}
	
	@PUT @Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Customer update(Customer customer) {
		System.out.println("Updating customer: " + customer);
		dao.updateCustomer(customer);
		return customer;
	}
}
