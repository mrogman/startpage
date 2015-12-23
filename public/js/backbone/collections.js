var ShortcutsCollection = Backbone.Collection.extend({
  model: Shortcut,
  url:'/api/shortcuts/',
});


var CategoriesCollection = Backbone.Collection.extend({
  model: Category,
  url: '/api/categories/'
});
