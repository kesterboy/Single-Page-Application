package com.ait.lib;
import static org.junit.Assert.assertEquals;
import java.util.List;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import com.ait.utils.UtilsSetup;

/* Integration tests that test from WS layer to database.
 * MySQL should be running.
 * These tests run outside of Tomcat
 */
public class IntegrationTest {
	
	private LibrariansResource librariansResource;
	private CustomersResource customersResource;
	private BooksResource booksResource;
	private AdminResource adminsResource;
	
	private static UtilsSetup utilsSetup;
	
	//runs before every test and set db with 3 rows
	@Before
	public void setUp() {
		//this runs before each test and puts db into a defined state
		utilsSetup=new UtilsSetup();
		utilsSetup.initialiseDB("test.sql");
		librariansResource=new LibrariansResource();
		customersResource = new CustomersResource();
		booksResource = new BooksResource();
		adminsResource = new AdminResource();
	}
	
	@Test
	public void testFindAllLibrarians() {
	List<Librarian> librarianList = librariansResource.findAllLibrarians();
	assertEquals("Data fetch = data persisted", librarianList.size(), 3);
	Librarian librarian=librarianList.get(0);
	assertEquals("Egor",librarian.getFirstName());
	librarian=librarianList.get(1);
	assertEquals("hpotter@ait.ie",librarian.getEmail());
	librarian=librarianList.get(2);
	assertEquals("Kesther",librarian.getLastName());
	} 
	 
	
	@Test
	public void testFindLibrarianById() {
		Librarian librarian = (Librarian) librariansResource.findLibrarianById("1");
		assertEquals(1,librarian.getId());
		assertEquals("Egor",librarian.getFirstName());
		assertEquals("Bogachev",librarian.getLastName());
		assertEquals("ebogachev@ait.ie",librarian.getEmail());
		assertEquals("999999999",librarian.getPhone());
		assertEquals("password",librarian.getPassword());
	}
	
	@Test
	public void testCreateLibrarian() {
		Librarian librarian = new Librarian();
		librarian.setFirstName("Jack");
		librarian.setLastName("Black");
		librarian.setEmail("jblack@ait.ie");
		librarian.setPhone("1122334455");
		librarian.setPassword("password");
		librarian=librariansResource.create(librarian);
		List<Librarian> librarianList = librariansResource.findAllLibrarians();
		assertEquals("Data fetch = data persisted", librarianList.size(), 4);
		System.out.println(librarian.getId());
		librarian = (Librarian)librariansResource.findLibrarianById("4");
		assertEquals(4,librarian.getId());
		assertEquals("Jack",librarian.getFirstName());
		assertEquals("Black",librarian.getLastName());
		assertEquals("jblack@ait.ie",librarian.getEmail());
		assertEquals("1122334455",librarian.getPhone());
		assertEquals("password",librarian.getPassword());
	}
	
	@Test
	public void testRemoveLibrarian() {
		List<Librarian> librarianList = librariansResource.findAllLibrarians();
		assertEquals(librarianList.size(), 3);
		librariansResource.remove(2);
		librarianList = librariansResource.findAllLibrarians();
		assertEquals(librarianList.size(), 2);
		Librarian librarian = (Librarian) librariansResource.findLibrarianById("2");
		assertEquals(null,librarian);	
	}
	
	@Test
	public void testFindByLibrarianSurname() {
		List<Librarian> librarianList = librariansResource.findByLibrarianSurname("Bogachev");
		assertEquals(librarianList.size(), 1);
		Librarian librarian=librarianList.get(0);
		assertEquals("Bogachev",librarian.getLastName());
		assertEquals("Egor",librarian.getFirstName());		
	}
	
	@Test
	public void testUpdateLibrarian() {
		Librarian librarian = (Librarian) librariansResource.findLibrarianById("2");
		librarian.setFirstName("John");
		librarian.setLastName("White");
		librarian.setEmail("jwhite@ait.ie");
		librarian.setPhone("111222333");
		librarian.setPassword("password");
		librarian=librariansResource.update(librarian);
		List<Librarian> librarianList = librariansResource.findAllLibrarians();
		assertEquals("Data fetch = data persisted", librarianList.size(), 3);
		System.out.println(librarian.getId());
		librarian = (Librarian)librariansResource.findLibrarianById("2");
		assertEquals("John",librarian.getFirstName());
		assertEquals("White",librarian.getLastName());
		assertEquals("jwhite@ait.ie",librarian.getEmail());
		assertEquals("111222333",librarian.getPhone());
		assertEquals("password",librarian.getPassword());
	}
	 
//	//runs once after all tests and puts back db with 13 rows
//	@AfterClass
//	public static void tearDown() {
//		utilsSetup=new UtilsSetup();
//		utilsSetup.initialiseDB("cellar.sql");	
//	} 
	
	@Test
	public void testFindAllCustomers() {
	List<Customer> customerList = customersResource.findAllCustomers();
	assertEquals("Data fetch = data persisted", customerList.size(), 3);
	Customer customer=customerList.get(0);
	assertEquals("Bill",customer.getFirstName());
	customer=customerList.get(1);
	assertEquals("dtrump@ait.ie",customer.getEmail());
	customer=customerList.get(2);
	assertEquals("smith",customer.getLastName());
	}
	
	@Test
	public void testFindCustomerById() {
		Customer customer = (Customer) customersResource.findCustomerById("1");
		assertEquals(1,customer.getId());
		assertEquals("Bill",customer.getFirstName());
		assertEquals("bgeits@ait.ie",customer.getEmail());
		assertEquals("888888888",customer.getPhone());
		assertEquals("password",customer.getPassword());
	}
	
	@Test
	public void testFindByCustomerSurname() {
		List<Customer> customerList = customersResource.findByCustomerSurname("smith");
		assertEquals(customerList.size(), 1);
		Customer customer=customerList.get(0);
		assertEquals("smith",customer.getLastName());
		assertEquals("Egor",customer.getFirstName());		
	}
	
	@Test
	public void testRemoveCustomer() {
		List<Customer> customerList = customersResource.findAllCustomers();
		assertEquals(customerList.size(), 3);
		customersResource.remove(2);
		customerList = customersResource.findAllCustomers();
		assertEquals(customerList.size(), 2);
		Customer customer = (Customer) customersResource.findCustomerById("2");
		assertEquals(null,customer);	
	}
	
	@Test
	public void testCreateCustomer() {
		Customer customer = new Customer();
		customer.setFirstName("Jack");
		customer.setLastName("Black");
		customer.setEmail("jblack@ait.ie");
		customer.setPhone("1122334455");
		customer.setPassword("password");
		customer=customersResource.create(customer);
		List<Customer> customerList = customersResource.findAllCustomers();
		assertEquals("Data fetch = data persisted", customerList.size(), 4);
		System.out.println(customer.getId());
		customer = (Customer)customersResource.findCustomerById("4");
		assertEquals(4,customer.getId());
		assertEquals("Jack",customer.getFirstName());
		assertEquals("Black",customer.getLastName());
		assertEquals("jblack@ait.ie",customer.getEmail());
		assertEquals("1122334455",customer.getPhone());
		assertEquals("password",customer.getPassword());
	}
	
	@Test
	public void testUpdateCustomer() {
		Customer customer = (Customer) customersResource.findCustomerById("2");
		customer.setFirstName("John");
		customer.setLastName("White");
		customer.setEmail("jwhite@ait.ie");
		customer.setPhone("111222333");
		customer.setPassword("password");
		customer=customersResource.update(customer);
		List<Customer> customerList = customersResource.findAllCustomers();
		assertEquals("Data fetch = data persisted", customerList.size(), 3);
		System.out.println(customer.getId());
		customer = (Customer)customersResource.findCustomerById("2");
		assertEquals("John",customer.getFirstName());
		assertEquals("White",customer.getLastName());
		assertEquals("jwhite@ait.ie",customer.getEmail());
		assertEquals("111222333",customer.getPhone());
		assertEquals("password",customer.getPassword());
	}
	
	@Test
	public void testFindAllAdmins() {
	List<Admin> adminList = adminsResource.findAllAdmins();
	assertEquals("Data fetch = data persisted", adminList.size(), 1);
	Admin admin=adminList.get(0);
	assertEquals("admin",admin.getId());
	assertEquals("password",admin.getPassword());
	}
	
	@Test
	public void testFindAllBooks() {
	List<Book> bookList = booksResource.findAll();
	assertEquals("Data fetch = data persisted", bookList.size(), 4);
	Book book=bookList.get(0);
	assertEquals("Harry Potter",book.getBookName());
	book=bookList.get(1);
	assertEquals("kesther Author",book.getBookAuthor());
	book=bookList.get(2);
	assertEquals("Man category",book.getBookCategory());
	book=bookList.get(3);
	assertEquals("Pk description",book.getBookDescription());
	}
	
	@Test
	public void testFindBookById() {
		Book book = (Book) booksResource.findById("1");
		assertEquals(1,book.getId());
		assertEquals("Harry Potter",book.getBookName());
		assertEquals("Potter Author",book.getBookAuthor());
		assertEquals("Potter category",book.getBookCategory());
		assertEquals("Potter description",book.getBookDescription());
		assertEquals("false",book.getBookReserved());
		assertEquals(222,book.getBookReservedUserId());
		assertEquals("true",book.getBookRented());
		assertEquals(222,book.getBookRentedUserId());
		assertEquals("pic.PNG",book.getBookPicture());
		assertEquals("2016-11-22",book.getBookRentedDate());
	}
	
	@Test
	public void testFindByBookName() {
		List<Book> bookList = booksResource.findByBookName("Harry Potter");
		assertEquals(bookList.size(), 1);
		Book book=bookList.get(0);
		assertEquals(1,book.getId());
		assertEquals("Harry Potter",book.getBookName());
		assertEquals("Potter Author",book.getBookAuthor());
		assertEquals("Potter category",book.getBookCategory());
		assertEquals("Potter description",book.getBookDescription());
		assertEquals("false",book.getBookReserved());
		assertEquals(222,book.getBookReservedUserId());
		assertEquals("true",book.getBookRented());
		assertEquals(222,book.getBookRentedUserId());
		assertEquals("pic.PNG",book.getBookPicture());
		assertEquals("2016-11-22",book.getBookRentedDate());		
	}
	
	@Test
	public void testRemoveBook() {
		List<Book> bookList = booksResource.findAll();
		assertEquals(bookList.size(), 4);
		booksResource.remove(2);
		bookList = booksResource.findAll();
		assertEquals(bookList.size(), 3);
		Book book = (Book) booksResource.findById("2");
		assertEquals(null,book);	
	}
	
	@Test
	public void testCreateBook() {
		Book book = new Book();
		book.setBookName("Bible");
		book.setBookAuthor("Unknown");
		book.setBookCategory("Religion");
		book.setBookDescription("About everything");
		book.setBookReserved("true");
		book.setBookReservedUserId(222);
		book.setBookRented("true");
		book.setBookRentedUserId(111);
		book.setBookPicture("pic.PNG");
		book.setBookRentedDate("10-03-2017");
		book=booksResource.create(book);
		List<Book> bookList = booksResource.findAll();
		assertEquals("Data fetch = data persisted", bookList.size(), 5);
		book = (Book)booksResource.findById("5");
		assertEquals(5,book.getId());
		assertEquals("Bible",book.getBookName());
		assertEquals("Unknown",book.getBookAuthor());
		assertEquals("Religion",book.getBookCategory());
		assertEquals("About everything",book.getBookDescription());
		assertEquals("true",book.getBookReserved());
		assertEquals(222,book.getBookReservedUserId());
		assertEquals("true",book.getBookRented());
		assertEquals(111,book.getBookRentedUserId());
		assertEquals("pic.PNG",book.getBookPicture());
		assertEquals("10-03-2017",book.getBookRentedDate());
	}
	
	@Test
	public void testUpdateBook() {
		Book book = (Book) booksResource.findById("1");
		book.setBookName("Bible");
		book.setBookAuthor("Unknown");
		book.setBookCategory("Religion");
		book.setBookDescription("About everything");
		book.setBookReserved("true");
		book.setBookReservedUserId(222);
		book.setBookRented("true");
		book.setBookRentedUserId(111);
		book.setBookPicture("pic.PNG");
		book.setBookRentedDate("10-03-2017");
		book=booksResource.update(book);
		List<Book> bookList = booksResource.findAll();
		assertEquals("Data fetch = data persisted", bookList.size(), 4);
		book = (Book)booksResource.findById("1");
		assertEquals(1,book.getId());
		assertEquals("Bible",book.getBookName());
		assertEquals("Unknown",book.getBookAuthor());
		assertEquals("Religion",book.getBookCategory());
		assertEquals("About everything",book.getBookDescription());
		assertEquals("true",book.getBookReserved());
		assertEquals(222,book.getBookReservedUserId());
		assertEquals("true",book.getBookRented());
		assertEquals(111,book.getBookRentedUserId());
		assertEquals("pic.PNG",book.getBookPicture());
		assertEquals("10-03-2017",book.getBookRentedDate());
	}
}
