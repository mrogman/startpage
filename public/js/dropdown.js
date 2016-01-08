var Dropdown = {

  width: '',
  height: '',

  init: function(tab) {
    //create html element
    Header.$container.after("<div class='dropdown'>this is a dropdown menu</div>");
    //initialize elements
    this.el = $('div.dropdown');
    this.$tab = tab
    //open dropdown
    Dropdown.open();
  },

  isOpen: function() {
    return typeof this.el !== 'undefined'
  },

  open: function() {
    this.el
      .css({
        top: Header.$container.height(),
        left: this.getLeftPos(),
        marginTop: '30px'
      })
      .animate({
        opacity: 1,
        marginTop: '5px'
      }, 600, 'easeOutQuart');
  },

  close: function() {
    this.el.fadeOut('fast', function() {
      $(this).remove();
      Dropdown.el = undefined;
    })
  },

  getLeftPos: function() {
    var tabLeft = this.$tab.offset().left;
    var dropdownWidth = this.el.width();
    var dropdownRightOffset = tabLeft + dropdownWidth + 25
    var leftPos;
    if(dropdownRightOffset > $(window).width()) leftPos = $(window).width() - dropdownWidth - 25
    else leftPos = tabLeft
    return leftPos
  }

}
