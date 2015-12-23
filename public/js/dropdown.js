var Dropdown = {

  $tab: null,
  width: '',
  height: '',

  init: function(tab) {
    //create html element
    if(typeof this.el !== 'undefined') Dropdown.remove();
    this.$tab = tab
    Header.$tabBlock.after("<div class='dropdown'>this is a dropdown menu</div>");
    this.el = $('div.dropdown');
    this.open();
  },

  open: function() {
    this.el
      .css({
        left: this.getLeftPos(),
        marginTop: '30px'
      })
      .animate({
        opacity: 1,
        marginTop: '5px'
      }, 600, 'easeOutQuart');
  },

  remove: function() {
    this.el.remove();
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
