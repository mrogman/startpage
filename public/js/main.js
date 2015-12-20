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
          Gateway.clock.$container.remove();
          Gateway.showCategories();
          Gateway.search.$outer.removeClass('search-focused', 200);
        },
        'keyup': function(e) {
          if(e.which == 13) { //enter
            Gateway.search.send();
          }
          else if(e.which == 27){
            Gateway.search.$input.blur(); //blur on 'esc' keyup
          }
          //open quick results div if not activated
          else if(!Gateway.search.activated) {
            var clock = Gateway.clock.$container;
            if(clock.is(':visible')) clock.remove();
            Gateway.openQuickResults();
          }
        }
    })
    .focus();
  },

  getElements: function() {
    Gateway.$container = $('div.gateway')
    Gateway.$top = $('.top');
    Gateway.$middle = $('.middle');

    Gateway.search.getElements();

    Gateway.clock.$container = $('div.clock');
  },

  renderViews: function() {

    //fetch shortcuts and render view
    Gateway.shortcuts_collection = new ShortcutsCollection();
    var fetchShortcuts = Gateway.shortcuts_collection.fetch();
    fetchShortcuts.done(function() {
      Gateway.shortcut_bar_view = new shortcutBarView({
        el: $('.shortcut-bar-wrapper'),
        collection: Gateway.shortcuts_collection
      });
    });

    //fetch categories and render view
    Gateway.categories_collection = new CategoriesCollection();
    var fetchCategories = Gateway.categories_collection.fetch();
    fetchCategories.done(function() {
      Gateway.category_view = new categoryView({
        el: $('.middle'),
        collection: Gateway.categories_collection
      });
    });

    //render quick results view
    Gateway.quick_results_view = new quickResultsView({ el: $('.middle') });
  },

  showCategories: function() {
    if(Gateway.quick_results_view.$quickResultsDiv.is(':visible')) {
      Gateway.quick_results_view.hideQuickResults();
      Gateway.category_view.$categoryViewer.delay(200).fadeIn(800);
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
      window.location.href = 'https://duckduckgo.com/?q=' + Gateway.search.$input.val();
    }
  },

  clock: {}
}

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
    console.log('mouseout icon');
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
      .removeClass('qr-active', 200);
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

var ShortcutsCollection = Backbone.Collection.extend({
  model: Shortcut,
  url:'/api/shortcuts/',
});

var Category = Backbone.Model.extend({
  urlroot: '/api/categories/',
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

  runClock();

});
