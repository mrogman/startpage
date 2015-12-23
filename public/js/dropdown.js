var Dropdown = {

  $el: $('div.dropdown'),
  $menuItem: null,
  width: '',
  height: '',

  init: function() {
    //create html element
    Header.$container.after("<div class='dropdown'>this is a dropdown menu</div>")
  },

  open: function() {
    this.leftPos = getLeftPos();
  },

  getLeftPos: function() {
    return this.$menuItem.position().left
  }

}
