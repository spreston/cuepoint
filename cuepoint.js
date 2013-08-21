/*
* Cuepoint JS
* Author: Owain Lewis
* Copyright: Copyright Owain Lewis. All rights reserved.
* License: MIT License
* Created: 2011
* Version: 1.0.0
*
* A simple library for HTML5 Video Subtitles and Cuepoints
*
*/

(function () {

  var Cuepoint, Utils, utils;
  Utils = (function () {
    function Utils() {}
    Utils.prototype.log = function (args) {
      this.args = args;
      if (window.console) {
        return console.log(Array.prototype.slice.call(this, arguments));
      }
    };
    return Utils;
  })();

  Cuepoint = (function () {
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

    /*
     * @method currentTime
     * @returns integer
     * @short returns the current slide time
     * @extra
     * @example
     */

    Cuepoint.prototype.currentTime = function () {
      return this.video.currentTime;
    };

    /*
     * @method update
     * @returns
     * @short updates the inner html of a slide
     * @extra
     * @example
     */

    Cuepoint.prototype.update = function (html) {
      this.html = html;
      return this.subtitles.innerHTML = this.html;
    };

    /*
     * @method hideAll
     * @returns
     * @short hides all elements
     * @extra
     * @example
     */

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

    /*
     * @method cuepointUpdate
     * @returns
     * @short hides all managed elements, shows next element
     * @extra
     * @example
     */

    Cuepoint.prototype.cuepointUpdate = function (element) {
      this.hideAll();
      $(element).show();
      return this;
    };


    /*
     * @method setTime
     * @returns
     * @short sets the videos current time equal to the var passed in
     * @extra
     * @example
     */

    Cuepoint.prototype.setTime = function (time) {
      this.time = time;
      this.video.currentTime = time;
      return this.video.play();
    };

    /*
     * @method addSlide
     * @returns
     * @short add a new slide
     * @extra
     * @example
     */

    Cuepoint.prototype.addSlide = function (time, html) {
      var self;
      this.time = time;
      this.html = html;
      self = this;
      return this.video.addEventListener("timeupdate", function () {
        if (this.currentTime >= time && this.currentTime <= time + 0.3) {
          return self.update(html);
        }
      }, false);
    };

    /*
     * @method addCuepoint
     * @returns
     * @short add a new cuepoint
     * @extra
     * @example
     */

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

    /*
     * @method play
     * @returns
     * @short starts the HTML5 video player
     * @extra
     * @example
     */

    Cuepoint.prototype.play = function () {
      return this.video.play();
    };

    /*
     * @method pause
     * @returns
     * @short pause the HTML5 video player
     * @extra
     * @example
     */

    Cuepoint.prototype.pause = function () {
      if (!this.video.paused) {
        return this.video.pause();
      }
    };

    return Cuepoint;

  })();

  utils = new Utils;

}).call(this);
