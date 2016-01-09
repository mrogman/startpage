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
    this.$shortcutBar = $('.shortcut-bar');
    this.$shortcutIcons = $('.shortcut i');
    this.$container
      .hide()
      .fadeIn(600);

    this.$shortcutBar.on({
      mouseleave: function() { Background.removeBlur() },
    });

    this.$shortcutIcons.on({
      mouseenter: function() { Background.triggerBlur() },
      mouseout: this.scFontOut
    })
  },

  template: Handlebars.templates.shortcutBar,

  render: function() {
    var html = this.template(this.collection);
    this.$el.append(html);
  },

  events: {

  },

  scFontHover: function(elem, hoverColor) {
    elem.animate({
      color: hoverColor
    }, 200);

    //add label
    var text = elem.parent().parent().attr('id').split('-')[1].toLowerCase();
    this.$container.append("<div class='shortcut-label'>" + text + "</div>");
    var containerWidth = this.$container.width();
    $('div.shortcut-label')
      .hide()
      .css({ width: containerWidth + 'px' })
      .delay(200)
      .fadeIn('fast');
  },

  scFontOut: function() {
    $(this).animate({
      color: 'lightgray'
    });

    //remove label
    $('div.shortcut-label').remove();
  }

});


var categoryView = Backbone.View.extend({

  active: false,

  initialize: function() {
    this.render();
    this.$categoryViewer = $('.category-viewer');
    this.$categoryViewer.hide();
    this.categoryInit();
  },

  template: Handlebars.templates.categoryView,

  render: function() {
    var html = this.template(this.collection);
    this.$el.append(html);
  },

  category: {}, //used for manipulating category dom elements

  categoryInit: function() {
    this.category = {
      $array: this.$categoryViewer.children('div.category'),
      models: this.collection.models,
      origWidth: 175, //in px
      origHeight: 40, //in vh units
      scaleWidth: function(scale) { return this.origWidth * scale + 'px' },
      scaleHeight: function(scale) { return this.origHeight * scale + 'vh' }
    }
  },

  /*
    Animation sequence for category view.
    1. Sets view outer div to visible and category divs to transparent and 1/4 height.
    2. Iteratively animates through visible category divs with delay and restores opacity and height
  */
  animateIn: function() {
    this.active = true;

    var context = this; //parent context reference for closures

    var setup = function() {
      this.$categoryViewer.show();
      //prepare category divs for animation
      this.category.$array.css({
        opacity: '0',
        background: 'lightgray', //temporary
        height: this.category.scaleHeight(0.25),
      });
    }

    var doAnimation = function(elem) {
      elem.animate({
        opacity: '1',
        height: this.category.scaleHeight(1)
      }, 400, 'easeOutQuint');
    }

    setup.call(context);
    //animate visible category divs on interval
    $.each(this.category.$array, function(i) {
      var elem = $(this)
      var interval = i * 75
      if(elem.is(':visible')) {
        setTimeout(doAnimation.bind(context, elem), interval);
      }
    });
  },

  hideCategoryViewer: function() {
    this.active = false;
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
    Gateway.shortcut_bar_view.$shortcutBar.fadeOut('fast');
    this.$quickResultsDiv.fadeIn('fast');
    //enable category view trigger zone while open
    CV_TriggerZone.enable();
  },

  hideQuickResults: function(callback) {
    this.$quickResultsDiv.fadeOut('fast', callback);
    Gateway.$middle
      .add(Gateway.$container)
      .removeClass('qr-active', 200);
    Gateway.shortcut_bar_view.$shortcutBar.fadeIn('fast');
  },

  destroy: function() {
    //hide quick results window and show categories
    this.hideQuickResults(function() {
      if(Gateway.collapsed) {
        Gateway.hideCategories();
      }
      else {
        Gateway.showCategories()
      }
    });
    //clear query
    Gateway.search.$input.val('');
    //mark search as inactive
    Gateway.search.activated = false;
    //clear existing quick results data
  }

});
