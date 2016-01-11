Background = {

  blurred: false,

  blurCache: [],

  init: function() {
    this.$el = $('body').children('div.background')

    //init animation
    this.$el
      .css({
        opacity: '0',
        width: '120vw',
        height: '120vh',
        top: '-10vh',
        left: '-10vw'
      })
      .animate({
        opacity: '1',
        width: '105vw',
        height: '105vh',
        top: '-2.5vh',
        left: '-2.5vw'
      }, 2000, 'easeOutQuint');
  },

  blur: function(radius, opacity, duration, delay) {
    this.$el
      .stop(true, false)
      .delay(delay)
      .animate({ blurRadius: radius, opacity: opacity }, {
        duration: duration,
        easing: 'easeOutQuart',
        step: function() {
          $(this).css({
            'filter': 'blur(' + this.blurRadius + 'px)',
            '-webkit-filter': 'blur(' + this.blurRadius + 'px)',
            '-moz-filter': 'blur(' + this.blurRadius + 'px)',
          })
        }
      });
    if(radius == 0) this.blurred = false
    else this.blurred = true
  },

  triggerBlur: function(radius, opacity, duration, delay) {
    //use defaults if not assigned
    var radius = radius ? radius : 5,
        opacity = opacity ? opacity : 1,
        duration = duration ? duration : 600,
        delay = delay ? delay : 100;

    var doBlur = function() {
      Background.blur(radius, opacity, duration, delay);
      Background.cacheBlurState(radius, opacity)
    }

    if(!this.blurred) doBlur();
    else {
      var currentBlurState = JSON.stringify(this.blurCache[0])
      var newBlurState = {
        blurRadius: radius,
        opacity: opacity
      }
      newBlurState = JSON.stringify(newBlurState)
      //only apply blur animation if it differs from current state
      if(currentBlurState !== newBlurState) doBlur();
    }
  },

  removeBlur: function() {
    if(this.blurred) {
      //restore previous cached blur state if one other than the current state exists
      if(this.blurCache.length > 1) {
        var previousBlurState = this.blurCache[1]
        this.blur(previousBlurState.blurRadius, previousBlurState.opacity);
      }
      //otherwise, remove blur entirely
      else this.blur(0, 1);
      //remove current state from the cache
      this.blurCache.shift()
    }
  },

  cacheBlurState: function(radius, opacity) {
    var blurState = {
      blurRadius: radius,
      opacity: opacity
    }
    this.blurCache.unshift(blurState);
  }

}
