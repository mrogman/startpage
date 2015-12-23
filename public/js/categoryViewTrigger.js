//Category view trigger zone
var CV_TriggerZone = {

  triggered: false,

  init: function() {
    this.$selector = $('div.main').add($('div.gateway'));
    this.enable();
  },

  /* briefly indicate that the trigger zone has been clicked
   * for the search bar blur event handler to evaluate. */
  activate: function(e, context) {
    if(e.target === context) { //exclude child elements
      this.triggered = true
      setTimeout(function() {
        this.triggered = false //reset to false
      }, 100);
    }
    //keep search bar focused if not trigger zone not clicked
    else Gateway.search.$input.focus();
  },

  enable: function() {
    this.$selector.on('click', function(e) {
      CV_TriggerZone.activate(e, this)
      this.activateEvent = e
    });
    this.triggered = false //ensure trigggered is false when set to enabled
  },

  disable: function() {
    this.$selector.off('click', this.activateEvent);
  }

}
