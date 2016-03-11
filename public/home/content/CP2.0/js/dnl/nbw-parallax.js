/*

Author: Ian Lunn

Author URL: http://www.ianlunn.co.uk/



License: http://creativecommons.org/licenses/by-sa/3.0/ (Attribution Share Alike). Please attribute work to Ian Lunn simply by leaving these comments in the source code or if you'd prefer, place a link on your website to http://www.ianlunn.co.uk/.



Dual licensed under the MIT and GPL licenses:

http://www.opensource.org/licenses/mit-license.php

http://www.gnu.org/licenses/gpl.html

*/



$(document).ready(function() { //when the document is ready...





	//save selectors as variables to increase performance

	var $window = $(window);

	var $firstBG = $('#first');

	var $secondBG = $('#second');

	var $thirdBG = $('#third');

	var $fourthBG = $('#fourth');

	var $fifthBG = $('#fifth');

	

	var windowHeight = 803; //get the height of the window

	

	

	//apply the class "inview" to a section that is in the viewport

	$('#intro, #second, #third, #fourth, #fifth').bind('inview', function (event, visible) {

			if (visible == true) {

			$(this).addClass("inview");

			} else {

			$(this).removeClass("inview");

			}

		});

	

			

	//function that places the navigation in the center of the window

	function RepositionNav(){

		var windowHeight = $window.height(); //get the height of the window

		var navHeight = $('#nav').height() / 2;

		var windowCenter = (windowHeight / 2); 

		var newtop = windowCenter - navHeight;

		$('#nav').css({"top": newtop}); //set the new top position of the navigation list

	}

	

	//function that is called for every pixel the user scrolls. Determines the position of the background

	/*arguments: 

		x = horizontal position of background

		windowHeight = height of the viewport

		pos = position of the scrollbar

		adjuster = adjust the position of the background

		inertia = how fast the background moves in relation to scrolling

	*/

	function newPos(x, windowHeight, pos, adjuster, inertia){

		return x + "% " + (-((windowHeight + pos) - adjuster) * inertia)  + "px";

	}

	

	//function to be called whenever the window is scrolled or resized

	function Move(){ 

		var pos = $window.scrollTop(); //position of the scrollbar



			

		//if the second section is in view...

		if($secondBG.hasClass("inview")){

			

			//switch design to match-products

			if(pos > 460){

				$('.section2-bg2').css('opacity','1');

				$('.example-design').css('opacity', '0');

				$('.second-info').fadeIn();

			} else {

				$('.section2-bg2').css('opacity','0');

				$('.example-design').css('opacity', '1');

				$('.second-info').fadeOut();

			}

		}

		

		//if the third section is in view...

		if($thirdBG.hasClass("inview")) {



			//keep design on top when moving to third slide

			if (pos > 784) {

				$('.section2-bg2').css('z-index', '10');

			} else {

				$('.section2-bg2').css('z-index', '-1');

			}



			//replace fixed position design with unfixed copy

			if (pos > 1153){

				$('.section2-bg2').hide();

				$('.section3-bg4').show();

				

			} else {

				$('.section2-bg2').show();

				$('.section3-bg4').hide();

				

			}



			//once products are gathered, stop parallax effect and show information

			if (pos > 1321) {

				$('.third-info').fadeIn();

			} else {

				$('.third-info').fadeOut();

				$thirdBG.find('.section3-bg2').css({'backgroundPosition': newPos(44, windowHeight, pos, 2300, 0.5)});

				$thirdBG.find('.section3-bg').css({'backgroundPosition': newPos(42, windowHeight, pos, 2225, 0.9)});

				$thirdBG.find('.section3-bg3').css({'backgroundPosition': newPos(46, windowHeight, pos, 2400, 0.8)});



			}



		}

		

		//if the fourth section is in view...

		if($fourthBG.hasClass("inview")){

			//once community elements are gathered, stop parallax effect and show information

			

			if (pos > 2000) {

				$('.fourth-info').fadeIn();

			} else {

				$('.fourth-info').fadeOut();

				$fourthBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 5500, 0.1)});

				$('.section4-bg').css({'backgroundPosition': newPos(50, windowHeight, pos, 3200, 0.2)});

				$('.section4-bg2').css({'backgroundPosition': newPos(50, windowHeight, pos, 2900, 0.4)});

			}

		}



		//if the fifth section is in view...

		if($fifthBG.hasClass("inview")){

			

		}

		

	}

		

	RepositionNav(); //Reposition the Navigation to center it in the window when the script loads

	

	$window.resize(function(){ //if the user resizes the window...

		Move(); //move the background images in relation to the movement of the scrollbar

		RepositionNav(); //reposition the navigation list so it remains vertically central

	});		

	

	$window.bind('scroll', function(){ //when the user is scrolling...

		Move(); //move the background images in relation to the movement of the scrollbar

	});

	

});