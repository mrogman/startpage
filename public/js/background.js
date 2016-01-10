Background = {

  blurred: false,

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

  triggerBlur: function() {
    if(!this.blurred) this.blur(5, 1, 600, 100);
  },

  removeBlur: function() {
    if(this.blurred) this.blur(0, 1, 600, 100);
  }

}
