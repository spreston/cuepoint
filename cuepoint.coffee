### 

  Cuepoint Coffee. 
  A simple library for HTML5 Video Subtitles and Cuepoints

###

###

  @class Utils 

###

class Utils
  log: (@args) ->
    if window.console 
      console.log Array.prototype.slice.call this, arguments

### 

  @class Cuepoint 

###

class Cuepoint

  constructor: ->
    @nativeKeys = Object.keys

  init: (@slides) ->
    #We need a reference to the basic elements we're using
    @subtitles = document.getElementById "subtitles"
    @video = document.getElementById "video" 
    for key, value of slides
      this.addSlide key, value
      this.events.call

  currentTime: ->
    @video.currentTime

  update: (@html) ->
    @subtitles.innerHTML = @html

  setTime: (@time) ->
    @video.currentTime = time
    @video.play()

  addSlide: (@time, @html) ->
    self = this
    @video.addEventListener "timeupdate", ->
      if this.currentTime >= time and this.currentTime <= time + 0.3
        self.update html
    , false

  play: ->
    @video.play()
  pause: ->
    @video.pause() if not @video.paused 

utils = new Utils
window.cuepoint = new Cuepoint
		

	


