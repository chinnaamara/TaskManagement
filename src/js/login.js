$(document).ready(function() {
	sessionStorage.userName = 'admin';
	sessionStorage.password = 'Design_20';

	$('#btnLogin').click(function(e){
		e.preventDefault();
		var username = $('#userName').val();
		var pwd = $('#password').val();
        if(sessionStorage.userName === username && sessionStorage.password === pwd)
            window.location.href = 'home.html';
        else
            alert('Invalid User Name and Password!');
	});
});
