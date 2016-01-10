Gateway.search = {

  activated: false, //quick result div open

  getElements: function(){
    this.$outer = $('div.search');
    this.$input = $('input.search');
    this.$left = $('div#search-left');
  },

  send: function() {
    //send search to DuckDuckGo on 'return' keydown
    window.location.href = 'https://duckduckgo.com/?q=' + Gateway.search.$input.val();
  }

}
