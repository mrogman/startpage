var Tab = Backbone.Model.extend({

  defaults: {
    name: '',
    iconClass: '',
    tabData: {}
  },

  initialize: function() {
    //this.getElements();
  },

  elements: function() {
    var $container = $('div.header-tab#tab-' + this.attributes.name)
    var $icon = $container.children('div.tab-icon');
    var $tabData = $container.children('div.tab-data');
    return {
      container: $container,
      icon: $icon,
      tabData: $tabData
    }
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
  },
});
