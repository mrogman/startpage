Background = {

  blurred: false,

  init: function() {
    this.$el = $('body').children('div.background')
  },

  triggerBlur: function() {
    this.$el.stop(true, false).delay(100).animate({ blurRadius: 10 }, {
      duration: 1000,
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
