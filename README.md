# startpage
My custom startpage. It serves as a launchpad to my commonly visited sites, a prettier face to the [Startpage](https://startpage.com/) search engine, and dashboard for some of my frequent web activity. It is relatively simple, dynamic client app backed by a RESTful [Sinatra](http://www.sinatrarb.com/) API that powers features such as Twitter and Reddit integration.

**Status:** super early development

## Intended Features
* Reddit top posts widget
* Reddit inbox notifications
* Twitter latest tweets widget
* Github notifications
* Compiled client-side code to be stored locally for rapid launching
* Ability to recieve the client from the server for demo purposes (rather than store locally)
* Flexible "categories" that can be created and filled with external links

## Stack
### Client
* Backbone.js
* jQuery
* SASS
* Slim

### Server
* Sinatra
* MongoDb
