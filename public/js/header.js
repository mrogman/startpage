var Header = {

  init: function() {
    Header.getElements();
  },

  getElements: function() {
    this.$container = $('div.header');
    this.$headerLeft = $('div.header-left');
    this.$tabBlock = $('div.tab-block');
    this.$tabs = $('div.header-tab');
  },

  tabs: {
    github:  new Tab({ name: 'github' }),
    twitter: new Tab({ name: 'twitter' }),
    reddit:  new Tab({ name: 'reddit' }),
  }

}
