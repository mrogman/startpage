var $searchInput;
var $categoryViewer;

var shortcutBarView = Backbone.View.extend({
  initialize: function() {
    this.render();
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
    $categoryViewer = $('.category-viewer');
    $categoryViewer.hide();
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

  $searchInput = $("input.search");
  $searchInput.focus(); //do first!

  var category_viewer_template = new categoryView({el: $('.category-viewer-placeholder') });
  var shortcut_bar_template = new shortcutBarView({el: $('.shortcut-bar-wrapper') });

  $("input.search").on('blur', function() {
    $categoryViewer.fadeIn('fast');
  });

});
