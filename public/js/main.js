var Gateway = {

  init: function() {
    Gateway.renderViews();
    Gateway.getElements();
    Gateway.$middle.css({ height: '0' });

    Gateway.search.$input.on({
        'focus': function() {
          Gateway.search.$outer.addClass('search-focused', 200);
          if(!Gateway.quick_results_view.$quickResultsDiv.is(':visible') && Gateway.search.activated) {
            Gateway.quick_results_view.showQuickResults();
          }
        },
        'blur': function() {
          Gateway.showCategories();
          Gateway.search.$outer.removeClass('search-focused', 200);
        },
        'keypress': function(e) {
          if(e.which == 13) { //enter
            Gateway.search.send();
          }
          //open quick results div if not activated
          if(!Gateway.search.activated) Gateway.openQuickResults();
        }
    })
    .focus();

  },

  getElements: function() {
    Gateway.$container = $('div.gateway')
    Gateway.$top = $('.top');
    Gateway.$middle = $('.middle');

    Gateway.search.getElements();
  },

  renderViews: function() {
    Gateway.shortcuts_collection = new ShortcutsCollection();
    var getShortcuts = Gateway.shortcuts_collection.fetch();

    getShortcuts.done(function() {
      Gateway.shortcut_bar_view = new shortcutBarView({ el: $('.shortcut-bar-wrapper') });
    });

    Gateway.categories_collection = new CategoriesCollection();
    Gateway.categories_collection.fetch();
    Gateway.category_view = new categoryView({ el: $('.middle') });

    Gateway.quick_results_view = new quickResultsView({ el: $('.middle') });
  },

  showCategories: function() {
    if(Gateway.quick_results_view.$quickResultsDiv.is(':visible')) {
      Gateway.quick_results_view.hideQuickResults();
      Gateway.category_view.$categoryViewer.delay(400).fadeIn('fast');
    }
    else {
      Gateway.$middle.animate({
        height: '50vh'
      }, 300, function() {
        Gateway.category_view.$categoryViewer.fadeIn('fast');
      });
    }
  },

  openQuickResults: function() {
    Gateway.search.activated = true;
    if(Gateway.category_view.$categoryViewer.is(':visible')) Gateway.category_view.hideCategoryViewer();
    Gateway.quick_results_view.showQuickResults();
  },

  search: {

    activated: false, //quick result div open

    getElements: function(){
      this.$outer = $('div.search');
      this.$input = $('input.search');
      this.$left = $('div#search-left');
    },

    send: function() {
      //send search to DuckDuckGo on 'return' keydown
      console.log('sending query to duckduckgo.com');
      window.location.href = 'https://duckduckgo.com/?q=' + Gateway.search.$input.val();
    }
  }
}

var shortcutBarView = Backbone.View.extend({
  initialize: function() {
    this.render();
    this.$container = $('.shortcut-bar-wrapper');
    this.$shorcutBar = $('.shortcut-bar');
    this.$container
      .hide()
      .fadeIn(600);
  },
  render: function() {
    var shortcutBarTemplate = $('#shortcutBarTemplate').html();
    var template = Handlebars.compile(shortcutBarTemplate);
    var context = {};
    var html = template(context);
    this.$el.append(html);
  }
});

var categoryView = Backbone.View.extend({
  initialize: function() {
    this.render();
    this.$categoryViewer = $('.category-viewer');
    this.$categoryViewer.hide();
  },
  render: function() {
    console.log('rendering category viewer');
    var categoryViewTemplate = $('#categoryViewTemplate').html();
    console.log('categoryViewTemplate: ' + categoryViewTemplate);
    var template = Handlebars.compile(categoryViewTemplate);
    var context = {};
    var html = template(context);
    this.$el.append(html);
  },

  hideCategoryViewer: function() {
    this.$categoryViewer.fadeOut('fast');
  }
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
    console.log('quickResultsTemplate: ' + quickResultsTemplate);
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
  },

  hideQuickResults: function() {
    this.$quickResultsDiv.fadeOut('fast');
    Gateway.$middle
      .add(Gateway.$container)
      .removeClass('qr-active', 400);
    Gateway.shortcut_bar_view.$shorcutBar.fadeIn('fast');
  },

  destroy: function(e) {
    e.preventDefault();
    this.hideQuickResults();
    Gateway.search.$input.val('');
    Gateway.search.activated = false;
    //clear existing quick results data

  }
});

var Shortcut = Backbone.Model.extend({
  urlroot: '/api/shortcuts/',
  defaults: {
    name: 'unnamed',
    img: '',
    href: '#'
  }
});

var ShortcutsCollection = Backbone.Collection.extend({
  model: Shortcut,
  url:'/api/shortcuts/',
});

var Category = Backbone.Model.extend({
  urlroot: '/api/shortcuts/',
  defaults: {
    name: '',
    background: '',
    links: []
  }
});

var CategoriesCollection = Backbone.Collection.extend({
  model: Category,
  url: '/api/categories/'
});

$(document).ready(function() {

  $('input.search').focus(); //do first!

  Gateway.init();

});
