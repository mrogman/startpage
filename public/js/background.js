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

  triggerBlur: function() {
    this.$el.stop(true, false).delay(100).animate({ blurRadius: 5 }, {
      duration: 600,
      easing: 'easeOutQuart',
      step: function() {
        $(this).css({
          'filter': 'blur(' + this.blurRadius + 'px)',
          '-webkit-filter': 'blur(' + this.blurRadius + 'px)',
          '-moz-filter': 'blur(' + this.blurRadius + 'px)',
        })
      }
    });
  },

  removeBlur: function() {
    this.$el.stop(true, false).animate({ blurRadius: 0 }, {
      duration: 600,
      easing: 'easeOutQuart',
      step: function() {
        $(this).css({
          'filter': 'blur(' + this.blurRadius + 'px)',
          '-webkit-filter': 'blur(' + this.blurRadius + 'px)',
          '-moz-filter': 'blur(' + this.blurRadius + 'px)',
        })
      }
    });
  }

}
