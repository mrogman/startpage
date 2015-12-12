var Gateway = {

  init: function() {
    Gateway.renderViews();
    Gateway.getElements();
    Gateway.$categoryPlaceholder.css({ height: '0' });

    Gateway.search.$input.on({
        'focus': function() {
          Gateway.search.$outer.addClass('search-focused', 200);
        },
        'blur': function() {
          Gateway.showCategories();
          Gateway.search.$outer.removeClass('search-focused', 200);
        },
        'keypress': function(e) {
          if(e.which == 13) {
            Gateway.search.send();
          }
        }
    })
    .focus();

  },

  getElements: function() {
    Gateway.$container = $('div.gateway')
    Gateway.$categoryPlaceholder = $('.category-viewer-placeholder');

    Gateway.search.getElements();
  },

  renderViews: function() {
    Gateway.category_view = new categoryView({el: $('.category-viewer-placeholder') });
    Gateway.shortcut_bar_view = new shortcutBarView({el: $('.shortcut-bar-wrapper') });
  },

  showCategories: function() {
    Gateway.$categoryPlaceholder.animate({
      height: '50vh'
    }, 300, function() {
      Gateway.category_view.$categoryViewer.fadeIn('fast');
    });
  },

  search: {

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

var $shortcutBar;

var shortcutBarView = Backbone.View.extend({
  initialize: function() {
    this.render();
    $shortcutBar = $('.shortcut-bar');
    $shortcutBar
      .hide()
      .fadeIn(600);
  },
  render: function() {
    var shortcutBarTemplate = $('#shortcutBarTemplate').html();
    var template = Handlebars.compile(shortcutBarTemplate);
    var context = {};
    var html = template(context);
    this.$el.html(html);
  }
});

var categoryView = Backbone.View.extend({
  initialize: function() {
    this.render();
    this.$categoryViewer = $('.category-viewer');
    this.$categoryViewer.hide();
  },
  render: function() {
    var categoryViewTemplate = $('#categoryViewTemplate').html();
    var template = Handlebars.compile(categoryViewTemplate);
    var context = {};
    var html = template(context);
    this.$el.html(html);
  },
});

$(document).ready(function() {

  $('input.search').focus(); //do first!

  Gateway.init();

});
