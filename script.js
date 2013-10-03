/* Written by Ryan Dumlao */
/* www.korjuice.com */
/* September 10, 2013 */


var $navButton = $('.navButton'),
	$navReset = $('#navReset'),
	$navContainer = $('#navContainer'),
	$menuContainer = $('#menuContainer'),
	$splashTop = $('#splashTop'),
	$menuLogo = $('#menuLogo'),
	$logoImage = $('#logoimage'),
	$iggFrame = $('.iggFrame'),
	$iggClose = $('#iggClose'),
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
	$('.navButton a').removeAttr('href');
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
	});

	$iggClose.click(function(){
		$iggFrame.slideUp(200);
	});

	/*$('#logoimage').hover(
		function(){
			$iggFrame.slideDown(200);
		},
		function(){
			$iggFrame.slideUp(200);
		});*/
});


//catch if use has scrolled past the splash page
$(window).on("scroll",function(){
	var $tempWidth = $(window).width();
	console.log($tempWidth);
	if($(document).scrollTop() <= $windowHeight && $tempWidth <= 760){
		//$menuLogo.css({'background-image':'url(korlogo_hz.png)','width':'200'});
		$menuLogo.switchClass('menuLogo_short','menuLogo_long',200);
	}
	else if($tempWidth <= 760){
		//$menuLogo.css({'background-image':'url(img/korlogo_tiny.png)','width':'70'});
		$menuLogo.switchClass('menuLogo_long','menuLogo_short',200);
	};
});

$('.contentSection').waypoint(function(direction){
	$('.navButton').removeClass('buttonHighlight');
	section = '#'+$(this).attr('id').slice(0,$(this).length-8);
	section = $(section);
	if(direction == 'down'){
		section.addClass('buttonHighlight');
	};
	},{
		offset:120
	});

$('.contentSection').waypoint(function(direction){
	$('.navButton').removeClass('buttonHighlight');
	section = '#'+$(this).attr('id').slice(0,$(this).length-8);
	section = $(section);
	if(direction == 'up'){
		section.addClass('buttonHighlight');
	}
	},{
		offset: function() {
		return -$(this).height()+120;
	}
});

$(window).resize(function(){
	$splashTop.css({'height':fullWindowHeight()});
	$windowView = $(window);
	if($windowView.width() >= 760){
		$navContainer.css({'top':0});
	};
});