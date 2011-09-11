# Cuepoint
## A javascript plugin for HTML5 video cuepoints and subtitles

www.owainlewis.com

License: MIT
http://www.opensource.org/licenses/mit-license.php

##Quick Start

Simply pass in an object containing your slides to the cuepoint.init method. The time is in seconds

	$(document).ready(function(){
	  var slides = {5:"Hello World"}
	  cuepoint.init(slides);
	  cuepoint.play();
	});

If you want to create skip to links you can use the setTime(seconds) method and bind it to a jQuery click event

	$('a').click(function(){
	  cuepoint.setTime(60); // Jump to 60 seconds into the video
	});

