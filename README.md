# startpage
My custom startpage. It serves as a launchpad to my commonly visited sites, an interface to the [DuckDuckGo](https://duckduckgo.com/) search engine, and dashboard for some of my frequent web activity. It is relatively simple, dynamic client app backed by a RESTful [Sinatra](http://www.sinatrarb.com/) API that powers features such as social media integration and instant search results.

**Status:** super early development

## Intended Features
* Reddit top posts widget and notification
* Twitter latest tweets widget and notifications
* Github notifications
* DuckDuckGo instant results (via API)
* DuckDuckGo top results (manually parsed with Nokogiri)
* Compiled client-side code to be stored locally for rapid launching
* Ability to recieve the client from the server for demo purposes (rather than store locally)
* Flexible "categories" that can be created and filled with external links

## Stack

### Client
* Backbone.js
* jQuery
* Sass
* Slim

### Server
* Sinatra
* MongoDb
