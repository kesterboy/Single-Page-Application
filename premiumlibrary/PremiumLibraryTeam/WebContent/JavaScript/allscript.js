$(document).ready(function() {
	$("#indexpage").show();
	$("#aboutuspage").hide();
	$("#bookpage").hide();
	$("#contactuspage").hide();
	$("#loginpage").hide();
	$("#adminpage").hide();
	$("#librarianpage").hide();
	$("#customerpage").hide();
	$("#errorpage").hide();
	$("#Logoutbox").hide();
	
	$(document).ready(function() {
		$("#Logoutbox").click(function() {
			$("#Logoutbox").hide();
			$('#loginbox').show();
			$("#indexpage").show();
			$("#aboutuspage").hide();
			$("#bookpage").hide();
			$("#contactuspage").hide();
			$("#loginpage").hide();
			$("#adminpage").hide();
			$("#librarianpage").hide();
			$("#customerpage").hide();
			$("#errorpage").hide();
			
		});
	
	$("#indexbox, #indexboxq").click(function() {
		$("#Logoutbox").hide();
		
		$('#loginbox').show();
		$("#indexpage").show();
		$("#aboutuspage").hide();
		$("#bookpage").hide();
		$("#contactuspage").hide();
		$("#loginpage").hide();
		$("#adminpage").hide();
		$("#librarianpage").hide();
		$("#customerpage").hide();
		$("#errorpage").hide();
		
	});
$('#aboutusbox, #aboutusboxq').click(function() {
	$("#Logoutbox").hide();
	$('#loginbox').show();
	$("#indexpage").hide();
	$("#aboutuspage").show();
	$("#bookpage").hide();
	$("#contactuspage").hide();
	$("#loginpage").hide();
	$("#adminpage").hide();
	$("#librarianpage").hide();
	$("#customerpage").hide();
	$("#errorpage").hide();
		
	});
$("#bookbox,#bookbox ").click(function() {
	//********************************************************************************************************start of book
	$("#indexpage").hide();
	$("#Logoutbox").hide();
	$('#loginbox').show();
	$("#aboutuspage").hide();
	$("#bookpage").show();
	$("#contactuspage").hide();
	$("#loginpage").hide();
	$("#adminpage").hide();
	$("#librarianpage").hide();
	$("#customerpage").hide();
	$("#errorpage").hide();
	$(document).ready(function() {
		
		// The root URL for the RESTful services
		var qrootURL = "http://localhost:8080/PremiumLibraryTeam/rest/books";

		var qcurrentBook;



		var qsearch =function(qsearchKey) {
			qresetForm();
			if (qsearchKey == '') 
				qfindAll();
			else
				qfindByName(qsearchKey);
		};

		var qnewBook=function () {
			$('#qbtnDelete').hide();
			qcurrentBook = {};
			qrenderDetails(qcurrentBook); // Display empty form
		};

		var qfindAll=function() {
			console.log('qfindAll');
			$.ajax({
				type: 'GET',
				url: qrootURL,
				dataType: "json", // data type of response
				success: qrenderList
			});
		};

		var qfindByName= function(qsearchKey) {
			console.log('qfindByName: ' + qsearchKey);
			$.ajax({
				type: 'GET',
				url: qrootURL + '/search/' + qsearchKey,
				dataType: "json",
				success: qrenderList 
			});
		};

		var qfindById= function(qid) {
			console.log('qfindById: ' + qid);
			$.ajax({
				type: 'GET',
				url: qrootURL + '/' + qid,
				dataType: "json",
				success: function(data){
					$('#qbtnDelete').show();
					console.log('findById success: ' + data.name);
					qcurrentBook = data;
					qrenderDetails(qcurrentBook);
				}
			});
		};

		var qaddBook = function () {
			console.log('qaddBook');
			$.ajax({
				type: 'POST',
				contentType: 'application/json',
				url: qrootURL,
				dataType: "json",
				data: qformToJSON(),
				success: function(data, textStatus, jqXHR){
					alert('Book created successfully');
					$('#qbtnDelete').show();
					$('#qBookid').val(data.id);
		            qfindAll();
				},
				error: function(jqXHR, textStatus, errorThrown){
					alert('addBook error: ' + textStatus);
				}
			});
		};

		var qupdateBook= function () {
			console.log('qupdateBook');
			$.ajax({
				type: 'PUT',
				contentType: 'application/json',
				url: qrootURL + '/' + $('#qBookid').val(),
				dataType: "json",
				data: qformToJSON(),
				success: function(data, textStatus, jqXHR){
					alert('Book updated successfully');
		            qfindAll();
				},
				error: function(jqXHR, textStatus, errorThrown){
					alert('updateBook error: ' + textStatus);
				}
			});
		};

		var qdeleteBook=function() {
			console.log('qdeleteBook');
			$.ajax({
				type: 'DELETE',
				url: qrootURL + '/' + $('#qBookid').val(),
				success: function(data, textStatus, jqXHR){
					alert('Book deleted successfully');
					qresetForm();
		            qfindAll();
				},
				error: function(jqXHR, textStatus, errorThrown){
					alert('deleteBook error');
				}
			});
		};


		var qrenderList= function(data) {
			// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
			var list = data == null ? [] : (data instanceof Array ? data : [data]);
			$('#qBookList li').remove();
			$.each(list, function(index, book) {
				$('#qBookList').append('<li><a href="#" id="' + book.id + '">'+book.bookName+'</a></li>');
			});
		};

		var qrenderDetails=function(book) {
			$('#qBookid').val(book.id);
			$('#qbookName').val(book.bookName);
			$('#qbookAuthor').val(book.bookAuthor);
			$('#qbookCategory').val(book.bookCategory);
			$('#qbookReserved').val(book.bookReserved);
			$('#qbookReservedUserId').val(book.bookReservedUserId);
			$('#qbookRented').val(book.bookRented);
			$('#qbookRentedUserId').val(book.bookRentedUserId);
			$('#qbookRentedDate').val(book.bookRentedDate);
			$('#qbookPicture').attr('src', 'images/' + book.bookPicture);
			$('#qbookDescription').val(book.bookDescription);
		};

		// Helper function to serialize all the form fields into a JSON string
		var qformToJSON=function () {
			var qBookid = $('#qBookid').val();
			return JSON.stringify({
				"id": qBookid == "" ? null : qBookid, 
				"qbookName": $('#qbookName').val(), 
				"qbookAuthor": $('#qbookAuthor').val(),
				"qbookCategory": $('#qbookCategory').val(),
				"qbookReserved": $('#qbookReserved').val(),
				"qbookReservedUserId": $('#qbookReservedUserId').val(),
				"qbookRented": $('#qbookRented').val(),
				"qbookRentedUserId": $('#qbookRentedUserId').val(),
				"qbookRentedDate": $('#qbookRentedDate').val(),
				"qbookPicture": "generic.jpg",
				"qbookDescription": $('#qbookDescription').val()
				});
		};

		var qresetForm=function(){
					$('#qBookid').val(""); 
					$('#qbookName').val(""); 
					$('#qbookAuthor').val("");
					$('#qbookCategory').val("");
					$('#qbookReserved').val("");
					$('#qbookReservedUserId').val("");
					$('#qbookRented').val("");
					$('#qbookRentedUserId').val("");
					$('#qbookRentedDate').val("");
					$('#qbookPicture').attr('src', "");
					$('#qbookDescription').val("");
		}

		//When the DOM is ready.
		$(document).ready(function(){
			// Nothing to delete in initial application state
			$('#qbtnDelete').hide();
		  //The return false is cancelling the default browser action
			$(document).on('click','#qbtnSearch',function() {
				qsearch($('#qsearchKey').val());
				return false;
			});

			// Trigger search when pressing 'Return' on search key input field
			
			$(document).on('keypress','#qsearchKey',function(e){
				if(e.which == 13) {
					qsearch($('#qsearchKey').val());
					return false;
			    }
			});

			$(document).on('click','#qbtnAdd',function() {
				qnewBook();
				return false;
			});
			//if the id is empty we are adding a new wine - otherwise update
			$(document).on('click','#qbtnSave',function() {
				if ($('#qbookName'|| '#qbookAuthor'||'#qbookCategory'||'#qbookReserved'||'#qbookRented' ).val() == ''){
					alert('All filed required');}
				else if ($('#qBookid').val() == '')
					     qaddBook();
				        else
					   qupdateBook();
				return false;
			});
			
				
			$(document).on('click','#qbtnDelete',function() {
				qdeleteBook();
				return false;
			});

			$(document).on("click", '#qBookList a', function(){qfindById(this.id);});

			//reset form
			qresetForm();
			$('#qsearchKey').val("");
			qfindAll();
		});


		
	});
	//*******************************************************************************************************8***end of book
});
$("#contactusbox, #contactusboxq").click(function() {
	$('#loginbox').show();
	$("#Logoutbox").hide();
	$("#indexpage").hide();
	$("#aboutuspage").hide();
	$("#bookpage").hide();
	$("#contactuspage").show();
	$("#loginpage").hide();
	$("#adminpage").hide();
	$("#librarianpage").hide();
	$("#customerpage").hide();
	$("#errorpage").hide();
	
});
$("#loginbox").click(function() {
	$('#loginbox').show();
	$("#indexpage").hide();
	$("#aboutuspage").hide();
	$("#bookpage").hide();
	$("#contactuspage").hide();
	$("#loginpage").show();
	$("#adminpage").hide();
	$("#librarianpage").hide();
	$("#customerpage").hide();
	$("#errorpage").hide();
	//******************************************************************************************************start of loginpage

	$(document).ready(function() {
		$("#popupbox").hide();
		$("#popupbox1").hide();
		$("#popupbox2").hide();
		$(".userbutton1").click(function() {
			$("#popupbox").show();
			$("#popupbox1").hide();
			$("#popupbox2").hide();
			
		});
		$(".userbutton2").click(function() {
			$("#popupbox").hide();
			$("#popupbox1").show();
			$("#popupbox2").hide();
			
		});
		$(".userbutton3").click(function() {
			$("#popupbox").hide();
			$("#popupbox1").hide();
			$("#popupbox2").show();
			
		});
		$("#close1").click(function() {
			$("#popupbox").hide();
			$("#popupbox1").hide();
			$("#popupbox2").hide();
		});
		$("#close2").click(function() {
			$("#popupbox").hide();
			$("#popupbox1").hide();
			$("#popupbox2").hide();
		});
		$("#close3").click(function() {
			$("#popupbox").hide();
			$("#popupbox1").hide();
			$("#popupbox2").hide();
		});

		
		$(document).ready(function() {
			
			
			$("#adminbox").click(function() {
				//******************************************************************************************************start of adminpage
				
				  var adminusername = $("#adminusername").val();
	                var adminpassword = $("#adminpassword").val();
	                if(adminusername == "" ||adminpassword == ""){
	                   
	                    alert("All field is required");
	                    return;
	                }
	            
	                $.ajax ({
	                   
	                    type : 'GET',
	                    url : "http://localhost:8080/PremiumLibraryTeam/rest/admin",
	                    dataType: "json", 
	                    success : function(data){
	                    	
	                    	if(JSON.stringify(data)=='[{"id":"'+adminusername+'","password":"'+adminpassword+'"}]'){
	                    		
	                    	
				
				
				$('#loginbox').hide();
				$("#Logoutbox").show();
				$("#indexpage").hide();
				$("#aboutuspage").hide();
				$("#bookpage").hide();
				$("#contactuspage").hide();
				$("#loginpage").hide();
				$("#adminpage").show();
				$("#librarianpage").hide();
				$("#customerpage").hide();
				$("#errorpage").hide();
				
				
				
				$(document).ready(function() {
				
					// The root URL for the RESTful services
var mrootURL = "http://localhost:8080/PremiumLibraryTeam/rest/librarians";

var mcurrentLibrarian;


var msearch =function(msearchKey) {
	mresetForm();
	if (msearchKey == '') 
		mfindAll();
	else
		mfindByName(msearchKey);
};

var mnewLibrarian=function () {
	$('#mbtnDelete').hide();
	mcurrentLibrarian = {};
	mrenderDetails(mcurrentLibrarian); // Display empty form
};

var mfindAll=function() {
	console.log('mfindAll');
	$.ajax({
		type: 'GET',
		url: mrootURL,
		dataType: "json", // data type of response
		success: mrenderList
	});
};

var mfindByName= function(msearchKey) {
	console.log('mfindByName: ' + msearchKey);
	$.ajax({
		type: 'GET',
		url: mrootURL + '/search/' + msearchKey,
		dataType: "json",
		success: mrenderList 
	});
};

var mfindById= function(id) {
	console.log('mfindById: ' + id);
	$.ajax({
		type: 'GET',
		url: mrootURL + '/' + id,
		dataType: "json",
		success: function(data){
			$('#mbtnDelete').show();
			console.log('mfindById success: ' + data.name);
			mcurrentLibrarian = data;
			mrenderDetails(mcurrentLibrarian);
		}
	});
};

var maddLibrarian = function () {
	console.log('maddLibrarian');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: mrootURL,
		dataType: "json",
		data: mformToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Librarian created successfully');
			$('#mbtnDelete').show();
			$('#mLibrarianid').val(data.id);
           mfindAll();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('addLibrarian error: ' + textStatus);
		}
	}); return false;
};

var mupdateLibrarian= function () {
	console.log('mupdateLibrarian');
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: mrootURL + '/' + $('#mLibrarianid').val(),
		dataType: "json",
		data: mformToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Librarian updated successfully');
            mfindAll();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('updateLibrarian error: ' + textStatus);
		}
	});return false;
};

var mdeleteLibrarian=function() {
	console.log('mdeleteLibrarian');
	$.ajax({
		type: 'DELETE',
		url: mrootURL + '/' + $('#mLibrarianid').val(),
		success: function(data, textStatus, jqXHR){
			alert('Librarian deleted successfully');
			mresetForm();
            mfindAll();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('Librarian error');
		}
	});
};

var mrenderList= function(data) {
	// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
	var list = data == null ? [] : (data instanceof Array ? data : [data]);
	$('#mLibrarianList li').remove();
	$.each(list, function(index, librarian) {
		$('#mLibrarianList').append('<li><a href="#" id="' + librarian.id + '">'+librarian.firstName+'</a></li>');
	});
};

var mrenderDetails=function(librarian) {
	$('#mLibrarianid').val(librarian.id);
	$('#mfirstName').val(librarian.firstName);
	$('#mlastName').val(librarian.lastName);
	$('#memail').val(librarian.email);
	$('#mphone').val(librarian.phone);
	$('#mpassword').val(librarian.password)
	
};

// Helper function to serialize all the form fields into a JSON string
var mformToJSON=function () {
	var mLibrarianid = $('#mLibrarianid').val();
	return JSON.stringify({
		"id": mLibrarianid == "" ? null : mLibrarianid, 
				"firstName": $('#mfirstName').val(), 
				"lastName": $('#mlastName').val(),
				"email": $('#memail').val(),
				"phone": $('#mphone').val(),
				"password": $('#mpassword').val()
		});
};

var mresetForm=function(){
	$('#mLibrarianid').val("");
	$('#mfirstName').val("");
	$('#mlastName').val("");
	$('#memail').val("");
	$('#mphone').val("");
	$('#mpassword').val("");
	
}

//When the DOM is ready.
$(document).ready(function(){
	// Nothing to delete in initial application state
	$('#mbtnDelete').hide();
  //The return false is cancelling the default browser action
	$(document).on('click','#mbtnSearch',function() {
		msearch($('#msearchKey').val());
		return false;
	});

	// Trigger search when pressing 'Return' on search key input field
	
	$(document).on('keypress','#msearchKey',function(e){
		if(e.which == 3) {
			msearch($('#msearchKey').val());
			return false;
	    }
	});

	$(document).on('click','#mbtnAdd',function() {
		mnewLibrarian();
		return false;
	});
	//if the id is empty we are adding a new wine - otherwise update
	$(document).on('click','#mbtnSave',function() {
		if (($('#mfirstName').val() == '')|($('#mlastName').val() == '')|($('#memail').val() == '') |($('#mpassword').val() == '') ){
			
			
			alert('All filed required');}
		else if ($('#mLibrarianid').val() == '')
			     maddLibrarian();
		        else
			   mupdateLibrarian();
		return false;
	});

	$(document).on('click','#mbtnDelete',function() {
		mdeleteLibrarian();
		return false;
	});

	$(document).on("click", '#mLibrarianList a', function(){mfindById(this.id);});

	//reset form
	mresetForm();
	$('#msearchKey').val("");
	mfindAll();
});

					
				})}else{
                

    				$('#loginbox').show();
    				$("#indexpage").hide();
    				$("#aboutuspage").hide();
    				$("#bookpage").hide();
    				$("#contactuspage").hide();
    				$("#loginpage").hide();
    				$("#adminpage").hide();
    				$("#librarianpage").hide();
    				$("#customerpage").hide();
    				$("#errorpage").show();
    				 return false;
                }
            }
        });
        return false;
    });

				//******************************************************************************************************end of adminpage
				
			
			$("#librarianbox").click(function() {
				//**************************************************************************************************************start of librarian
				 var librausername = $("#librausername").val();
	                var librapassword = $("#librapassword").val();
	                if(librausername == "" || librapassword == ""){
	                   
	                    alert("All field is required");
	                    return false;
	                }
	            
	                $.ajax ({
	                   
	                    type : 'GET',
	                    url : "http://localhost:8080/PremiumLibraryTeam/rest/librarians/search/"+librausername,
	                    dataType: "json", 
	                    success : function(data){
	                    	var pk=JSON.stringify(data);
	                    	
	                    	if(pk!=="[]"){
	                    	$.each(data, function(i, obj){
	                    		var pass = obj.password;
	                    		var nam = obj.firstName;
	                    		var las= obj.lastName;
	                    		
	                    	if(pass==librapassword){
	                    		 	
	                    		document.getElementById("tot").innerHTML ="<h2>Welcome to librarian page : "+nam+" "+las+" </h2>";
	                    	
	                    	                    		
				
				
				$('#loginbox').hide();
				$("#Logoutbox").show();
				$("#indexpage").hide();
				$("#aboutuspage").hide();
				$("#bookpage").hide();
				$("#contactuspage").hide();
				$("#loginpage").hide();
				$("#adminpage").hide();
				$("#librarianpage").show();
				$("#customerpage").hide();
				$("#errorpage").hide();
				
				
				$(document).ready(function(){
					 $("#popcus").hide();
					 $("#popbook").hide();
					
				   $("#Customersbutton").click(function(){
				   	 $("#popcus").show();
				  	 $("#popbook").hide();
				  	$(document).ready(function(){
					 // The root URL for the RESTful services
					  	 
					  	var arootURL = "http://localhost:8080/PremiumLibraryTeam/rest/customers";

					  	var acurrentLibrarian;


					  	var asearch =function(asearchKey) {
					  		aresetForm();
					  		if (asearchKey == '') 
					  			afindAll();
					  		else
					  			afindByName(asearchKey);
					  	};

					  	var anewLibrarian=function () {
					  		$('#abtnDelete').hide();
					  		acurrentLibrarian = {};
					  		arenderDetails(acurrentLibrarian); // Display empty form
					  	};

					  	var afindAll=function() {
					  		console.log('afindAll');
					  		$.ajax({
					  			type: 'GET',
					  			url: arootURL,
					  			dataType: "json", // data type of response
					  			success: arenderList
					  		});
					  	};

					  	var afindByName= function(asearchKey) {
					  		console.log('afindByName: ' + asearchKey);
					  		$.ajax({
					  			type: 'GET',
					  			url: arootURL + '/search/' + asearchKey,
					  			dataType: "json",
					  			success: arenderList 
					  		});
					  	};

					  	var afindById= function(id) {
					  		console.log('afindById: ' + id);
					  		$.ajax({
					  			type: 'GET',
					  			url: arootURL + '/' + id,
					  			dataType: "json",
					  			success: function(data){
					  				$('#abtnDelete').show();
					  				console.log('findById success: ' + data.name);
					  				acurrentLibrarian = data;
					  				arenderDetails(acurrentLibrarian);
					  			}
					  		});
					  	};

					  	var aaddLibrarian = function () {
					   		console.log('aaddLibrarian');
					   		$.ajax({
					   			type: 'POST',
					   			contentType: 'application/json',
					   			url: arootURL,
					   			dataType: "json",
					   			data: aformToJSON(),
					   			success: function(data, textStatus, jqXHR){
					   				alert('Customer created successfully');
					   				$('#abtnDelete').show();
					   				$('#aLibrarianid').val(data.id);
					   	            afindAll();
					   			},
					   			error: function(jqXHR, textStatus, errorThrown){
					   				alert('addCustomer error: ' + textStatus);
					   			}
					   		}); return false;
					   	};

					   	var aupdateLibrarian= function () {
					   		console.log('aupdateLibrarian');
					   		$.ajax({
					   			type: 'PUT',
					   			contentType: 'application/json',
					   			url: arootURL + '/' + $('#aLibrarianid').val(),
					   			dataType: "json",
					   			data: aformToJSON(),
					   			success: function(data, textStatus, jqXHR){
					   				alert('Customer updated successfully');
					   	            afindAll();
					   			},
					   			error: function(jqXHR, textStatus, errorThrown){
					   				alert('updateCustomer error: ' + textStatus);
					   			}
					   		});return false;
					   	};

					  	var adeleteLibrarian=function() {
					  		console.log('adeleteLibrarian');
					  		$.ajax({
					  			type: 'DELETE',
					  			url: arootURL + '/' + $('#aLibrarianid').val(),
					  			success: function(data, textStatus, jqXHR){
					  				alert('Customer deleted successfully');
					  				aresetForm();
					  	            afindAll();
					  			},
					  			error: function(jqXHR, textStatus, errorThrown){
					  				alert('Customer error');
					  			}
					  		});
					  	};

					  	var arenderList= function(data) {
					  		// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
					  		var list = data == null ? [] : (data instanceof Array ? data : [data]);
					  		$('#aLibrarianList li').remove();
					  		$.each(list, function(index, librarian) {
					  			$('#aLibrarianList').append('<li><a href="#" id="' + librarian.id + '">'+librarian.firstName+'</a></li>');
					  		});
					  	};

					  	var arenderDetails=function(librarian) {
					  		$('#aLibrarianid').val(librarian.id);
					  		$('#afirstName').val(librarian.firstName);
					  		$('#alastName').val(librarian.lastName);
					  		$('#aemail').val(librarian.email);
					  		$('#aphone').val(librarian.phone);
					  		$('#apassword').val(librarian.password)
					  		
					  	};

					  	// Helper function to serialize all the form fields into a JSON string
					  	var aformToJSON=function () {
					  		var aLibrarianid = $('#aLibrarianid').val();
					  		return JSON.stringify({
					  			"id": aLibrarianid == "" ? null : aLibrarianid, 
					  					"firstName": $('#afirstName').val(), 
					  					"lastName": $('#alastName').val(),
					  					"email": $('#aemail').val(),
					  					"phone": $('#aphone').val(),
					  					"password": $('#apassword').val()
					  			});
					  	};

					  	var aresetForm=function(){
					  		$('#aLibrarianid').val("");
					  		$('#afirstName').val("");
					  		$('#alastName').val("");
					  		$('#aemail').val("");
					  		$('#aphone').val("");
					  		$('#apassword').val("");
					  		
					  	}

					  	//When the DOM is ready.
					  	$(document).ready(function(){
					  		// Nothing to delete in initial application state
					  		$('#abtnDelete').hide();
					  	  //The return false is cancelling the default browser action
					  		$(document).on('click','#abtnSearch',function() {
					  			asearch($('#asearchKey').val());
					  			return false;
					  		});

					  		// Trigger search when pressing 'Return' on search key input field
					  		
					  		$(document).on('keypress','#asearchKey',function(e){
					  			if(e.which == 3) {
					  				asearch($('#asearchKey').val());
					  				return false;
					  		    }
					  		});

					  		$(document).on('click','#abtnAdd',function() {
					  			anewLibrarian();
					  			return false;
					  		});
					  		//if the id is empty we are adding a new wine - otherwise update
					  		$(document).on('click','#abtnSave',function() {
					  			
					  				if (($('#afirstName').val() == '')|($('#alastName').val() == '')|($('#aemail').val() == '') |($('#apassword').val() == '') ){
					  				alert('All filed required');
					  				return;}
					  			else if ($('#aLibrarianid').val() == '')
					  				     aaddLibrarian();
					  			        else
					  				   aupdateLibrarian();
					  			
					  		});

					  		$(document).on('click','#abtnDelete',function() {
					  			adeleteLibrarian();
					  			return false;
					  		});

					  		$(document).on("click", '#aLibrarianList a', function(){afindById(this.id);});

					  		//reset form
					  		aresetForm();
					  		$('#asearchKey').val("");
					  		afindAll();
					  	});
				  	 });
					  	
				   });
//				   **************************************************************************************************librarian book
				   $("#Bookbutton").click(function(){
				   	$("#popbook").show();
				   	$("#popcus").hide();
				  	 
				   	$(document).ready(function(){
				   	// The root URL for the RESTful services
				   	var rootURL = "http://localhost:8080/PremiumLibraryTeam/rest/books";

				   	var currentBook;



				   	var search =function(searchKey) {
				   		resetForm();
				   		if (searchKey == '') 
				   			findAll();
				   		else
				   			findByName(searchKey);
				   	};

				   	var newBook=function () {
				   		$('#btnDelete').hide();
				   		currentBook = {};
				   		renderDetails(currentBook); // Display empty form
				   	};

				   	var findAll=function() {
				   		console.log('findAll');
				   		$.ajax({
				   			type: 'GET',
				   			url: rootURL,
				   			dataType: "json", // data type of response
				   			success: renderList
				   		});
				   	};

				   	var findByName= function(searchKey) {
				   		console.log('findByName: ' + searchKey);
				   		$.ajax({
				   			type: 'GET',
				   			url: rootURL + '/search/' + searchKey,
				   			dataType: "json",
				   			success: renderList 
				   		});
				   	};

				   	var findById= function(id) {
				   		console.log('findById: ' + id);
				   		$.ajax({
				   			type: 'GET',
				   			url: rootURL + '/' + id,
				   			dataType: "json",
				   			success: function(data){
				   				$('#btnDelete').show();
				   				console.log('findById success: ' + data.name);
				   				currentBook = data;
				   				renderDetails(currentBook);
				   			}
				   		});
				   	};

				   	var addBook = function () {
				   		console.log('addBook');
				   		$.ajax({
				   			type: 'POST',
				   			contentType: 'application/json',
				   			url: rootURL,
				   			dataType: "json",
				   			data: formToJSON(),
				   			success: function(data, textStatus, jqXHR){
				   				alert('Book created successfully');
				   				$('#btnDelete').show();
				   				$('#Bookid').val(data.id);
				   	            findAll();
				   			},
				   			error: function(jqXHR, textStatus, errorThrown){
				   				alert('addBook error: ' + textStatus);
				   			}
				   		});
				   	};

				   	var updateBook= function () {
				   		console.log('updateBook');
				   		$.ajax({
				   			type: 'PUT',
				   			contentType: 'application/json',
				   			url: rootURL + '/' + $('#Bookid').val(),
				   			dataType: "json",
				   			data: formToJSON(),
				   			success: function(data, textStatus, jqXHR){
				   				alert('Book updated successfully');
				   	            findAll();
				   			},
				   			error: function(jqXHR, textStatus, errorThrown){
				   				alert('updateBook error: ' + textStatus);
				   			}
				   		});
				   	};

				   	var deleteBook=function() {
				   		console.log('deleteBook');
				   		$.ajax({
				   			type: 'DELETE',
				   			url: rootURL + '/' + $('#Bookid').val(),
				   			success: function(data, textStatus, jqXHR){
				   				alert('Book deleted successfully');
				   				resetForm();
				   	            findAll();
				   			},
				   			error: function(jqXHR, textStatus, errorThrown){
				   				alert('deleteBook error');
				   			}
				   		});
				   	};

				   	var renderList= function(data) {
				   		
				   		// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
				   		var list = data == null ? [] : (data instanceof Array ? data : [data]);
				   		$('#LibrarainBookList li').remove();
				   		$.each(list, function(index, book) {
				   			$('#LibrarainBookList').append('<li><a href="#" id="' + book.id + '">'+book.bookName+'</a></li>');
				   		});
				   	};

				   	var renderDetails=function(book) {
				   		$('#Bookid').val(book.id);
				   		$('#bookName').val(book.bookName);
				   		$('#bookAuthor').val(book.bookAuthor);
				   		$('#bookCategory').val(book.bookCategory);
				   		$('#bookReserved').val(book.bookReserved);
				   		$('#bookReservedUserId').val(book.bookReservedUserId);
				   		$('#bookRented').val(book.bookRented);
				   		$('#bookRentedUserId').val(book.bookRentedUserId);
				   		$('#bookRentedDate').val(book.bookRentedDate);
				   		$('#bookPicture').attr('src', 'images/' + book.bookPicture);
				   		$('#bookDescription').val(book.bookDescription);
				   	};

				   	// Helper function to serialize all the form fields into a JSON string
				   	var formToJSON=function () {
				   		var Bookid = $('#Bookid').val();
				   		return JSON.stringify({
				   			"id": Bookid == "" ? null : Bookid, 
				   			"bookName": $('#bookName').val(), 
				   			"bookAuthor": $('#bookAuthor').val(),
				   			"bookCategory": $('#bookCategory').val(),
				   			"bookReserved": $('#bookReserved').val(),
				   			"bookReservedUserId": $('#bookReservedUserId').val(),
				   			"bookRented": $('#bookRented').val(),
				   			"bookRentedUserId": $('#bookRentedUserId').val(),
				   			"bookRentedDate": $('#bookRentedDate').val(),
				   			"bookPicture": "generic.jpg",
				   			"bookDescription": $('#bookDescription').val()
				   			});
				   	};

				   	var resetForm=function(){
				   				$('#Bookid').val(""); 
				   				$('#bookName').val(""); 
				   				$('#bookAuthor').val("");
				   				$('#bookCategory').val("");
				   				$('#bookReserved').val("");
				   				$('#bookReservedUserId').val("");
				   				$('#bookRented').val("");
				   				$('#bookRentedUserId').val("");
				   				$('#bookRentedDate').val("");
				   				$('#bookPicture').attr('src', "");
				   				$('#bookDescription').val("");
				   	}

				   	//When the DOM is ready.
				   	$(document).ready(function(){
				   		// Nothing to delete in initial application state
				   		$('#btnDelete').hide();
				   	  //The return false is cancelling the default browser action
				   		$(document).on('click','#btnSearch',function() {
				   			search($('#searchKey').val());
				   			return false;
				   		});

				   		// Trigger search when pressing 'Return' on search key input field
				   		
				   		$(document).on('keypress','#searchKey',function(e){
				   			if(e.which == 13) {
				   				search($('#searchKey').val());
				   				return false;
				   		    }
				   		});

				   		$(document).on('click','#btnAdd',function() {
				   			newBook();
				   			$('#bookReserved').val("False");
			   				$('#bookReservedUserId').val("0");
			   				$('#bookRented').val("False");
			   				$('#bookRentedUserId').val("0");
				   			return false;
				   		});
				   		//if the id is empty we are adding a new wine - otherwise update
				   		$(document).on('click','#btnSave',function() {
				   			if (($('#bookName').val() == '')|($('#bookAuthor').val() == '')|($('#bookCategory').val() == '') |($('#bookRented').val() == '')){
				   				alert('All filed required');}
				   			else if ($('#Bookid').val() == '')
				   				     addBook();
				   			        else
				   				   updateBook();
				   			return false;
				   		});
				   		
				   			
				   		$(document).on('click','#btnDelete',function() {
				   			deleteBook();
				   			return false;
				   		});

				   		$(document).on("click", '#LibrarainBookList a', function(){findById(this.id);});

				   		//reset form
				   		resetForm();
				   		$('#searchKey').val("");
				   		findAll();
				   	});

				   	
				    });
				   });
				});

	                    	}else{
	                        
	            				$('#loginbox').show();
	            				$("#indexpage").hide();
	            				$("#aboutuspage").hide();
	            				$("#bookpage").hide();
	            				$("#contactuspage").hide();
	            				$("#loginpage").hide();
	            				$("#adminpage").hide();
	            				$("#librarianpage").hide();
	            				$("#customerpage").hide();
	            				$("#errorpage").show();
	                        }
	                    	
	                    	
	                    });
	                    }else{
                        	

            				$('#loginbox').show();
            				$("#indexpage").hide();
            				$("#aboutuspage").hide();
            				$("#bookpage").hide();
            				$("#contactuspage").hide();
            				$("#loginpage").hide();
            				$("#adminpage").hide();
            				$("#librarianpage").hide();
            				$("#customerpage").hide();
            				$("#errorpage").show();
                        }}
	                });
	                return false;
				
			});
			
			//******************************************************************************end of librarian
				//*********************************************************************************************start of customer
			  /////////////////////////////////////////////////////////////////////////
				
				 $("#customerbox").on('click', function(){
		               
		                    		
					 var cususername = $("#cususername").val();
		                var cususerpassword = $("#cususerpassword").val();
		                if(cususername == "" || cususerpassword == ""){
		                   
		                    alert("All field is required");
		                    return false;
		                }
		            
		                $.ajax ({
		                   
		                    type : 'GET',
		                    url : "http://localhost:8080/PremiumLibraryTeam/rest/customers/search/"+cususername,
		                    dataType: "json", 
		                    success : function(data){
		                    	var kesther=JSON.stringify(data);
		                    	
		                    	if(kesther!=="[]"){
		                    	$.each(data, function(i, obj){
		                    		var passs = obj.password;
		                    		var nams = obj.firstName;
		                    		var lass= obj.lastName;
		                    		
		                    	if(passs==cususerpassword){
		                    		 	
		                    		document.getElementById("tots").innerHTML ="<h2>Welcome to librarian page : "+nams+" "+lass+" </h2>";
		                    	
		                    	                    		
					
				 
		            $("#Logoutbox").show();
					$('#loginbox').hide();
					$("#indexpage").hide();
					$("#aboutuspage").hide();
					$("#bookpage").hide();
					$("#contactuspage").hide();
					$("#loginpage").hide();
					$("#adminpage").hide();
					$("#librarianpage").hide();
					$("#customerpage").show();
					$("#errorpage").hide();
					$(document).ready(function(){
						// The root URL for the RESTful services
						var zrootURL = "http://localhost:8080/PremiumLibraryTeam/rest/books";

						var zcurrentBook;



						var zsearch =function(zsearchKey) {
							zresetForm();
							if (zsearchKey == '') 
								alert('Enter your correct customer ID');
							else
								zfindByName(zsearchKey);
						};

						var znewBook=function () {
							$('#zbtnDelete').hide();
							zcurrentBook = {};
							zrenderDetails(zcurrentBook); // Display empty form
						};

						var zfindAll=function() {
							console.log('zfindAll');
							$.ajax({
								type: 'GET',
								url: zrootURL,
								dataType: "json", // data type of response
								success: zrenderList
							});
						};

						var zfindByName= function(zsearchKey) {
							console.log('zfindByName: ' + zsearchKey);
							$.ajax({
								type: 'GET',
								url: zrootURL + '/search/' + zsearchKey,
								dataType: "json",
								success: zrenderList 
							});
						};

						var zfindById= function(zid) {
							console.log('zfindById: ' + zid);
							$.ajax({
								type: 'GET',
								url: zrootURL + '/' + zid,
								dataType: "json",
								success: function(data){
									$('#zbtnDelete').show();
									console.log('zfindById success: ' + data.name);
									zcurrentBook = data;
									zrenderDetails(zcurrentBook);
								}
							});
						};

						var zaddBook = function () {
							console.log('zaddBook');
							$.ajax({
								type: 'POST',
								contentType: 'application/json',
								url: zrootURL,
								dataType: "json",
								data: zformToJSON(),
								success: function(data, textStatus, jqXHR){
									alert('Book created successfully');
									$('#zbtnDelete').show();
									$('#zBookid').val(data.id);
						            zfindAll();
								},
								error: function(jqXHR, textStatus, errorThrown){
									alert('addBook error: ' + textStatus);
								}
							});
						};

						var zupdateBook= function () {
							console.log('zupdateBook');
							$.ajax({
								type: 'PUT',
								contentType: 'application/json',
								url: zrootURL + '/' + $('#zBookid').val(),
								dataType: "json",
								data: zformToJSON(),
								success: function(data, textStatus, jqXHR){
									alert('Book updated successfully');
						            zfindAll();
								},
								error: function(jqXHR, textStatus, errorThrown){
									alert('updateBook error: ' + textStatus);
								}
							});
						};

						var zdeleteBook=function() {
							console.log('zdeleteBook');
							$.ajax({
								type: 'DELETE',
								url: zrootURL + '/' + $('#zBookid').val(),
								success: function(data, textStatus, jqXHR){
									alert('Book deleted successfully');
									zresetForm();
						            zfindAll();
								},
								error: function(jqXHR, textStatus, errorThrown){
									alert('deleteBook error');
								}
							});
						};

						var zrenderList= function(data) {
							// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
							var list = data == null ? [] : (data instanceof Array ? data : [data]);
							$('#zBookList li').remove();
							$.each(list, function(index, book) {
								$('#zBookList').append('<li><a href="#" id="' + book.id + '">'+book.bookName+'</a></li>');
							});
						};

						var zrenderDetails=function(book) {
							$('#zBookid').val(book.id);
							$('#zbookName').val(book.bookName);
							$('#zbookAuthor').val(book.bookAuthor);
							$('#zbookCategory').val(book.bookCategory);
							$('#zbookReserved').val(book.bookReserved);
							$('#zbookReservedUserId').val(book.bookReservedUserId);
							$('#zbookRented').val(book.bookRented);
							$('#zbookRentedUserId').val(book.bookRentedUserId);
							$('#zbookRentedDate').val(book.bookRentedDate);
							$('#zbookPicture').attr('src', 'images/' + book.bookPicture);
							$('#zbookDescription').val(book.bookDescription);
						};

						// Helper function to serialize all the form fields into a JSON string
						var zformToJSON=function () {
							var zBookid = $('#zBookid').val();
							return JSON.stringify({
								"zid": zBookid == "" ? null : zBookid, 
								"zbookName": $('#zbookName').val(), 
								"zbookAuthor": $('#zbookAuthor').val(),
								"zbookCategory": $('#zbookCategory').val(),
								"zbookReserved": $('#zbookReserved').val(),
								"zbookReservedUserId": $('#zbookReservedUserId').val(),
								"zbookRented": $('#zbookRented').val(),
								"zbookRentedUserId": $('#zbookRentedUserId').val(),
								"zbookRentedDate": $('#zbookRentedDate').val(),
								"zbookPicture": "generic.jpg",
								"zbookDescription": $('#zbookDescription').val()
								});
						};

						var zresetForm=function(){
									$('#zBookid').val(""); 
									$('#zbookName').val(""); 
									$('#zbookAuthor').val("");
									$('#zbookCategory').val("");
									$('#zbookReserved').val("");
									$('#zbookReservedUserId').val("");
									$('#zbookRented').val("");
									$('#zbookRentedUserId').val("");
									$('#zbookRentedDate').val("");
									$('#zbookPicture').attr('src', "");
									$('#zbookDescription').val("");
						}

						//When the DOM is ready.
						$(document).ready(function(){
							// Nothing to delete in initial application state
							$('#zbtnDelete').hide();
						  //The return false is cancelling the default browser action
							$(document).on('click','#zbtnSearch',function() {
								zsearch($('#zsearchKey').val());
								return false;
							});

							// Trigger search when pressing 'Return' on search key input field
							
							$(document).on('keypress','#zsearchKey',function(e){
								if(e.which == 13) {
									zsearch($('#zsearchKey').val());
									return false;
							    }
							});

							$(document).on('click','#zbtnAdd',function() {
								znewBook();
								return false;
							});
							//if the id is empty we are adding a new wine - otherwise update
							$(document).on('click','#zbtnSave',function() {
					
				if (($('#zbookName').val() == '')|($('#zbookAuthor').val() == '')|($('#zbookCategory').val() == '') |($('#zbookReserved').val() == '')|($('#zbookRented').val() == '') ){
									alert('All filed required');}
								else if ($('#zBookid').val() == '')
									     zaddBook();
								        else
									   zupdateBook();
								return false;
							});
							
								
							$(document).on('click','#zbtnDelete',function() {
								zdeleteBook();
								return false;
							});

							$(document).on("click", '#zBookList a', function(){zfindById(this.id);});

							//reset form
							zresetForm();
//							$('#zsearchKey').val("");
//							zfindAll();
						});

				});
		                     	}else{
			                        
		            				$('#loginbox').show();
		            				$("#indexpage").hide();
		            				$("#aboutuspage").hide();
		            				$("#bookpage").hide();
		            				$("#contactuspage").hide();
		            				$("#loginpage").hide();
		            				$("#adminpage").hide();
		            				$("#librarianpage").hide();
		            				$("#customerpage").hide();
		            				$("#errorpage").show();
		                        }
		                    	
		                    	
		                    });
		                    }else{
	                        	

	            				$('#loginbox').show();
	            				$("#indexpage").hide();
	            				$("#aboutuspage").hide();
	            				$("#bookpage").hide();
	            				$("#contactuspage").hide();
	            				$("#loginpage").hide();
	            				$("#adminpage").hide();
	            				$("#librarianpage").hide();
	            				$("#customerpage").hide();
	            				$("#errorpage").show();
	                        }}
		                });
		                return false;
					
				});
			
			
			//******************************************************************************end of customer
			
				
			
			
		});
		

	});
	//******************************************************************************************************end of loginpage
	
});

	});
});

