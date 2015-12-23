var Header = {

  init: function() {
    //initialize jQuery objects
    this.getElements();
    //instantiate tabs collection
    this.tabs_collection = new TabsCollection();
    this.tabs_collection.add([
      { name: 'github',
        iconClass: 'fa-github',
        tabData: [ //TODO: get data from github API
          { label: 'N:', value: '3' },
          { label: 'DC:', value: '9' }
        ]
      },
      { name: 'twitter',
        iconClass: 'fa-twitter',
        tabData: [ //TODO: get data from twitter API
          { label: 'DM:', value: '3' },
          { label: 'F:', value: '339' }
        ]
      },
      { name: 'reddit',
        iconClass: 'fa-reddit-alien',
        tabData: [ //TODO: get data from reddit API
          { label: 'I:', value: '3' },
          { label: 'K:', value: '3390' }
        ]
      }
    ]);
    //initialize & render tabs view
    this.tabs_view = new tabsView({
      el: this.$tabBlock,
      collection: this.tabs_collection
    });
  },

  getElements: function() {
    this.$container = $('div.header');
    this.$headerLeft = $('div.header-left');
    this.$tabBlock = $('div.tab-block');
    this.$tabs = $('div.header-tab');
  },

}
