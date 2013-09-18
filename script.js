/* Written by Ryan Dumlao */
/* www.korjuice.com */
/* September 10, 2013 */


var $navButton = $('.navButton'),
	$navReset = $('#navReset'),
	$navContainer = $('#navContainer'),
	$menuContainer = $('#menuContainer'),
	$splashTop = $('#splashTop'),
	$menuLogo = $('#menuLogo'),
	$windowHeight = $(window).height();
var offset, section, navDroppedDown;

function scrollAndStop(offset){
	$('html,body').stop().animate({scrollTop : offset},400);
}

function closeNavMenu(){
	if(navDroppedDown == true && $(window).width() <= 760){
		$navContainer.animate({top:'-250px'},250,function(){
			$navContainer.addClass('hidden');
		});
		navDroppedDown == false;
	};
};

function fullWindowHeight(){
	if($(window).width() <= 760){
		return $(window).height();
	}
	else {
		return $(window).height() - 125;
	}
};

$(document).ready(function(){
	//fix anchor tag links to not scroll to top
	$('.button a').removeAttr('href');
	$splashTop.css({'height':fullWindowHeight()});

	$navButton.click(function(){
		section = $(this).attr('id');
		if(section.slice(section.length-6,section.length) == 'Splash') {
			section = section.slice(0,section.length-6)
		};
		section = '#' + section + 'Content';
		console.log(section);
		jumpOffset = $(section).offset().top - 42;

		// if we are in full-screen mode (desktop) then make sure there is a constant fixed offset
		if($navContainer.css('padding-right') == '200px'){jumpOffset -= 125};

		scrollAndStop(jumpOffset);
		closeNavMenu();
	});

	$('#logoimage').click(function(){
		scrollAndStop(0);
		closeNavMenu();
	});

	//the nav menu button; bring the menu down, slide it into screen
	$('#navReset').click(function(){
		$navContainer.removeClass('hidden');
		$navContainer.css({position:'fixed', top:'-300px'}).animate({top: '0px'},250);
		//$menuContainer.css({'box-shadow':'none','z-index':11}).animate({top:$navContainer.height()},250);
		navDroppedDown = true;
	});

	$('#navClose').click(function(){
		closeNavMenu();
	})
});


//catch if user has scrolled back to the top while the dropMenu is down; if so, lock it back up! 
$(window).on("scroll",function(){
	if($(document).scrollTop() <= $windowHeight && $(window).width() <= 760){
		//$navContainer.css({'position':'absolute',top:'0'});
		//navDroppedDown = false;
		$menuLogo.css({'background-image':'url(korlogo_hz.png)','width':'200'});
	}
	else if($(window).width() <= 760){
		$menuLogo.css({'background-image':'url(img/korlogo_tiny.png)','width':'70'});
	};
});



$(window).resize(function(){
	$splashTop.css({'height':fullWindowHeight()});

})