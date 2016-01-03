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
          //show category view if clicked within the trigger zone
          setTimeout(function() { //brief pause to allow boolean to be set
            if(CV_TriggerZone.triggered) {
              Gateway.category_view.showTransition();
            }
          }, 50);

        },
        'keyup': function(e) {
          if(e.which == 13) { //enter
            Gateway.search.send();
          }
          else if(e.which == 27){
            Gateway.search.$input.blur(); //blur on 'esc' keyup
            Gateway.category_view.showTransition();
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
    //disable category view trigger zone click event while open
    CV_TriggerZone.disable();
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
