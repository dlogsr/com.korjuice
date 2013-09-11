/* Written by Ryan Dumlao */
/* www.korjuice.com */
/* September 10, 2013 */


var $navButton = $('.navCats .button'),
	$navReset = $('#navReset'),
	$navContainer = $('#navContainer');
var offset, section, navDroppedDown;

$(document).ready(function(){
	$('.button a').removeAttr('href');

	$navButton.click(function(){
		section = '#'+ $(this).attr('id');
		console.log('it\'s ' + section)
		console.log($(window).scrollTop());

		//this is needed to prevent the menu from poppig up if at or near top of page
		if($(window).scrollTop() <= '250'){navDroppedDown = false};

		console.log(navDroppedDown);
		section = section + 'Content';
		jumpOffset = $(section).offset().top;

		if($navContainer.css('padding-right') == '200px'){jumpOffset -= 125};

		$('html,body').stop().animate({scrollTop : jumpOffset},400);

		if(navDroppedDown == true){
			$navContainer.animate({top:'-250px'},250,function(){
				$navContainer.css({'position':'absolute',top:'0'});
			});
			navDroppedDown == false;
		};
	});

	//the nav menu button; bring the menu down, slide it into screen
	$('#navReset').click(function(){
		$navContainer.css({position:'fixed', top:'-300px'}).animate({top: '0px'},250);
		navDroppedDown = true;
	});
});


//catch if user has scrolled back to the top while the dropMenu is down; if so, lock it back up! 
$(window).on("scroll",function(){
	if($("body").scrollTop() == 0){
		$navContainer.css({'position':'absolute',top:'0'});
	}
	navDroppedDown = false;
});