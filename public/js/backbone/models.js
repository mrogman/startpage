var Tab = Backbone.Model.extend({

  defaults: {
    name: '',
    iconClass: '',
    tabData: {}
  },

  initialize: function() {
    this.getElements();
  },

  getElements: function() {
    this.$container = $('div.header-tab')
    this.$icon = $('div.tab-icon');
    this.$tabData = $('div.tab-data');
  },

});


var Shortcut = Backbone.Model.extend({
  urlroot: '/api/shortcuts/',
  defaults: {
    name: '',
    type: '',  // 'image' or 'font'
    fontClass: '',
    hoverColor: '#FFFFFF',
    img: '',
    href: '#'
  },
  isImage: function() {
    return this.attributes.type === 'image';
  },
  isFontIcon: function() {
    return this.attributes.type === 'font';
  }
});


var Category = Backbone.Model.extend({
  urlroot: '/api/categories/',
  defaults: {
    name: '',
    background: '',
    links: []
  }
});
