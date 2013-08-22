# Cuepoint Documentation (Updated)

## A javascript plugin for HTML5 video cuepoints and subtitles

Original Plugin Author URL: www.owainlewis.com

License: MIT
http://www.opensource.org/licenses/mit-license.php

I modified this plugin to take a list of jquery selectors so that it could show and hide HTML elements when a cuepoint is reached. It can still take the original HTML slides and subtitles. When a cuepoint is reached, all cuepoint elements are hidden, then the element(s) associated with the cuepoint reached is(are) shown.

##Quick Start

Simply pass in an object containing your slides to the cuepoint.init method. The time is in seconds

    /**
     * .content5 and .content6 will be handled by #video2. Any number greater than the length of the video used will cause an element to be hidden and not shown. Don't duplicate indices.
     */
	$(document).ready(function(){
      var video = "video1";
	  var slides = {
        0: ".content1",
        5: ".content2",
        10: ".content3, .content4",
        15: "#video2",
        999: ".content5",
        1000: ".content6"
      }
	  cuepoint.init(slides, video, cuepoint.TOGGLE_HTML);//for original functionality use the cuepoint.SUBTITLE constant
	  cuepoint.play();
	});

If you want to create skip to links you can use the setTime(seconds) method and bind it to a jQuery click event

	$('a').click(function(){
	  cuepoint.setTime(60); // Jump to 60 seconds into the video
	});


