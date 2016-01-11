var Gateway = {

  collapsed: null,

  init: function() {
    Gateway.renderViews();
    Gateway.getElements();
    Gateway.$middle.css({ height: '0' });
    Gateway.collapsed = true;

    Gateway.search.$input.on({
      'focus': function() {
        var quickResultsVisible = Gateway.quick_results_view.$quickResultsDiv.is(':visible')
        var searchActive = Gateway.search.activated
        Gateway.search.$outer.addClass('search-focused', 200);
        if(!quickResultsVisible && searchActive)
          Gateway.quick_results_view.showQuickResults();
      },
      'blur': function() {
        //show category view if clicked within the trigger zone
        setTimeout(function() { //brief pause to allow boolean to be set
          if(CV_TriggerZone.triggered) {
            Gateway.showCategories();
          }
        }, 50);
      },
      'keyup': function(e) {
        if(e.which == 13) { //enter
          Gateway.search.send();
        }
        else if(e.which == 27){ //esc
          //open category view unless there is a dropdown open or search is active
          if(!Dropdown.isOpen() && !Gateway.search.activated) {
            Gateway.search.$input.blur();
            Gateway.showCategories();
          }
        }
        //open quick results div if not activated
        else if(!Gateway.search.activated) {
          var clock = Gateway.clock.$container;
          if(clock.is(':visible')) Gateway.clock.detach();
          Gateway.openQuickResults();
        }
      }
    })
    .focus();

    $(window).on({
      'keyup': function(e) {
        if(e.which == 27){ //esc
          if(Dropdown.isOpen()) Dropdown.close()
          else if(Gateway.category_view.active) Gateway.hideCategories();
          //from quick results view
          else if(Gateway.quick_results_view.$quickResultsDiv.is(':visible')) {
            Gateway.quick_results_view.destroy();
          }
        }
      }
    });

  },

  getElements: function() {
    Gateway.$container = $('div.gateway')
    Gateway.$top = $('.top');
    Gateway.$middle = $('.middle');
    Gateway.$bottom = $('.shortcut-bar-wrapper');

    Gateway.search.getElements();
    Gateway.clock.getElements();
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

  //expand middle section to allow room for categories
  expand: function() {
    Gateway.collapsed = false;
    Gateway.$middle.animate({
      height: '50vh'
    }, 400);
    Background.triggerBlur();
  },

  //collapse middle section to restore initial landing view
  collapse: function() {
    Gateway.collapsed = true;
    Gateway.$middle.animate({
      height: '0'
    }, 400, 'easeOutCubic');
    Background.removeBlur();
  },

  showCategories: function() {
    //from landing view (collapsed)
    if(Gateway.collapsed) {
      Gateway.clock.stop().detach();
      Gateway.expand();
    }
    setTimeout(function() {
      Gateway.category_view.animateIn();
    }, 400);
    //disable category view trigger zone click event while open
    CV_TriggerZone.disable();
    //unfocus search bar
    Gateway.search.$input.blur();
    //shrink search bar
    Gateway.search.$outer.removeClass('search-focused', 600, 'easeOutQuint');
  },

  hideCategories: function() {
    Gateway.category_view.hideCategoryViewer();
    setTimeout(Gateway.collapse, 200);
    Gateway.clock.attach().start();
    Gateway.search.$input.focus();
    CV_TriggerZone.enable();
  },

  openQuickResults: function() {
    Gateway.search.activated = true;
    Background.triggerBlur();
    if(Gateway.category_view.$categoryViewer.is(':visible'))
      Gateway.category_view.hideCategoryViewer();
    Gateway.quick_results_view.showQuickResults();
  }

}
