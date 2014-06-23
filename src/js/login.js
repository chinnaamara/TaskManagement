$(document).ready(function() {

	var login_nav = $("#login_nav-template").html(),
      	login_nav_template = Handlebars.compile(login_nav);
  	$("#login-navBar").html(login_nav_template());

  	var login = $("#login-template").html(),
      login_form = Handlebars.compile(login);
  	$("#loginForm").html(login_form);

	sessionStorage.userName = 'admin';
	sessionStorage.password = 'Design_20';

	$("#btnLogin").click(function(e){
		e.preventDefault();
		var username = $("#userName").val();
		var pwd = $("#password").val();    
	    if(sessionStorage.userName === username && sessionStorage.password === pwd)
	    	window.location.href = 'src/html/home.html';
	    else
	        alert('Invalid User Name and Password!');
	});	
});
