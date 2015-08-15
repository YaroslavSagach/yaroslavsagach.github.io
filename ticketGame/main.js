$(document).ready(function(){
	
		$("#menu").toggle(function(){
			$("#menu").animate({left:"-=315px"},"fast");
			$("#ticket").animate({left:"-=190px"},"fast");
		},
		function(){
			$("#menu").animate({left:"+=315px"},"fast");
			$("#ticket").animate({left:"+=190px"},"fast");
		});
	
});
