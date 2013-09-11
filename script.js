$(document).ready(function(){
	var $navButton = $('.navCats .button'),
		$navReset = $('#navReset'),
		$navContainer = $('#navContainer');
	var offset, section, navDroppedDown;

	$('.button a').removeAttr('href');

	$navButton.click(function(){
		section = '#'+ $(this).attr('id');
		console.log('it\'s ' + section)
		section = section + 'Content';
		console.log(section);
		jumpOffset = $(section).offset().top;
		console.log(jumpOffset);

		if($navContainer.css('padding-right') == '200px'){jumpOffset -= 125};

		console.log(jumpOffset);
		$('html,body').stop().animate({scrollTop : jumpOffset},400);

		if(navDroppedDown == true){
			$navContainer.animate({top:'-250px'},250,function(){
				$navContainer.css({'position':'absolute',top:'0'});
			});
			//$navContainer.css({position:'absolute'});
			navDroppedDown == false;
		};
	});

	$('#navReset').click(function(){
		console.log('animating')
		$navContainer.css({position:'fixed', top:'-300px'}).animate({top: '0px'},250);
		navDroppedDown = true;
	});
});