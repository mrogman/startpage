var tabsView = Backbone.View.extend({

  initialize: function() {
    this.render();
    this.getElements();
  },

  template: Handlebars.templates.tabs,

  render: function() {
    var html = this.template(this.collection);
    this.$el.append(html);
  },

  events: {
    'click .header-tab': 'triggerDropdown'
  },

  getElements: function() {
    this.$container = $('div.tabs-block'),
    this.$tabs = $('div.header-tab')
  },

  triggerDropdown: function(e) {
    var tab = $(e.target).parents('div.header-tab')
    //open dropdown if not already open
    if(!Dropdown.isOpen()) Dropdown.init(tab);
  }

});

var shortcutBarView = Backbone.View.extend({

  initialize: function() {
    this.render();
    this.$container = $('.shortcut-bar-wrapper');
    this.$shorcutBar = $('.shortcut-bar');
    this.$shortcutIcons = $('.shortcut i');
    this.$container
      .hide()
      .fadeIn(600);
    this.$shortcutIcons.on('mouseout', this.scFontOut);
  },

  template: Handlebars.templates.shortcutBar,

  render: function() {
    var html = this.template(this.collection);
    this.$el.append(html);
  },

  events: {
    //'mouseout i': 'scFontOut'
  },

  scFontHover: function(elem, hoverColor) {
    elem.animate({
      color: hoverColor
    }, 200);
  },

  scFontOut: function() {
    $(this).animate({
      color: 'lightgray'
    });
  }

});


var categoryView = Backbone.View.extend({

  initialize: function() {
    this.render();
    this.$categoryViewer = $('.category-viewer');
    this.$categoryViewer.hide();
  },

  template: Handlebars.templates.categoryView,

  render: function() {
    var html = this.template(this.collection);
    this.$el.append(html);
  },

  showTransition: function() {
    //remove clock
    var clock = Gateway.clock.$container
    if(clock.is(':visible')) clock.remove();
    //display category viewer
    Gateway.showCategories();
    //unfocus search bar
    Gateway.search.$outer.removeClass('search-focused', 200);
  },

  hideCategoryViewer: function() {
    this.$categoryViewer.fadeOut('fast');
  },

  isVisible: function() { return this.$categoryViewer.is(':visible') }

});


var quickResultsView = Backbone.View.extend({

  initialize: function() {
    this.render();
    this.$quickResultsDiv = $('.quick-results');
    this.$queryText = $('.query-text');
    this.$closeIcon = $('span.close');
    this.$quickResultsDiv.hide();
  },

  render: function() {
    var quickResultsTemplate = $('#quickResultsTemplate').html();
    var template = Handlebars.compile(quickResultsTemplate);
    var context = {};
    var html = template(context);
    this.$el.append(html);
  },

  events: {
    'click .close': 'destroy'
  },

  showQuickResults: function() {
    if(Gateway.category_view.$categoryViewer.is(':visible')) Gateway.category_view.hideCategoryViewer();
    Gateway.$middle
      .add(Gateway.$container)
      .addClass('qr-active', 400);
    Gateway.shortcut_bar_view.$shorcutBar.fadeOut('fast');
    this.$quickResultsDiv.fadeIn('fast');
    //enable category view trigger zone while open
    CV_TriggerZone.enable();
  },

  hideQuickResults: function() {
    this.$quickResultsDiv.fadeOut('fast');
    Gateway.$middle
      .add(Gateway.$container)
      .removeClass('qr-active', 200);
    Gateway.shortcut_bar_view.$shorcutBar.fadeIn('fast');
  },

  destroy: function(e) {
    e.preventDefault();
    //hide quick results window
    this.hideQuickResults();
    //clear query
    Gateway.search.$input.val('');
    //mark search as inactive
    Gateway.search.activated = false;
    //clear existing quick results data

    //show category view
    Gateway.category_view.showTransition();
  }

});
