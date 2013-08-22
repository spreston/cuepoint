(function() {

	var Cuepoint, Utils, utils;

	Utils = (function() {

		function Utils() {}

		Utils.prototype.log = function(args) {

			this.args = args;

			if (window.console) {
				return console.log(Array.prototype.slice.call(this, arguments));
			}

		};

		return Utils;

	})();
	
	Cuepoint = (function() {

		function Cuepoint() {

			this.nativeKeys = Object.keys;

		}

        Cuepoint.prototype.SUBTITLE = 1;
        Cuepoint.prototype.TOGGLE_HTML = 2;

		Cuepoint.prototype.init = function (slides, video, slideType) {

          var key, value, _results, elements;

          this.slides = slides;
          this.video = document.getElementById(video);
          this.subtitles = document.getElementById("subtitles");

          _results = [];
          elements = [];

          for (key in slides) {

            value = slides[key];
            elements.push(value);

            if (slideType == this.SUBTITLE){
                this.addSlide(key, value);
            }else if (slideType == this.TOGGLE_HTML){
                this.addCuepoint(key, value);
            } 

            _results.push(this.events.call);

          }

          this.elements = elements;

          return _results;

        };

        Cuepoint.prototype.addCuepoint = function (time, element) {

          var self;

          this.time = time;
          this.element = element;
          self = this;

          return this.video.addEventListener("timeupdate", function () {
            if (this.currentTime >= time && this.currentTime <= time + 0.3) {
              return self.cuepointUpdate(element);
            }
          }, false);

        };

        Cuepoint.prototype.hideAll = function () {

          var elementString = "";
          var space = "";

          for (key in this.elements){
            elementString += space + this.elements[key];
            space = ", ";
          }
          
          $(elementString).hide();
          $(elementString).removeClass("cuepoint-visible");
          $(elementString).addClass("cuepoint-hidden");

          return this;

        };

		Cuepoint.prototype.events = function() {};

		Cuepoint.prototype.currentTime = function() {
			return this.video.currentTime;
		};

		Cuepoint.prototype.update = function(html) {
			this.html = html;
			return this.subtitles.innerHTML = this.html;
		};

		Cuepoint.prototype.setTime = function(time) {
			this.time = time;
			this.video.currentTime = time;
			return this.video.play();
		};

		Cuepoint.prototype.addSlide = function(time, html) {
			var self;
			this.time = time;
			this.html = html;
			self = this;
			return this.video.addEventListener("timeupdate", function() {
				if (this.currentTime >= time && this.currentTime <= time + 0.3) {
					return self.update(html);
				}
			},
			false);
		};

        Cuepoint.prototype.cuepointUpdate = function (element) {
          this.hideAll();
          $(element).show();
          return this;
        };

		Cuepoint.prototype.play = function() {
			return this.video.play();
		};

		Cuepoint.prototype.pause = function() {
			if (!this.video.paused) {
				return this.video.pause();
			}
		};

		return Cuepoint;

	})();

	utils = new Utils;
	window.cuepoint = new Cuepoint;

}).call(this);

