# startpage
My custom startpage. It serves as a launchpad to my commonly visited sites, an interface to the [DuckDuckGo](https://duckduckgo.com/) search engine, and dashboard for some of my frequent web activity. It is a client-side app that uses a [Sinatra](http://www.sinatrarb.com/) API on the back-end. I'm mostly just designing this for my own personal use, but I plan to make it highly customizable for others who may want to use it (don't count on this for a while though)

**Status:** moderately functional
* DuckDuckGo basic search works
* Shortcut icons are loaded from db
* Categories are loaded from db, but links are not loaded into the templates yet
* Reddit, Twitter, Github, tabs not functional
* DuckDuckGo quick results not functional
* Support for other search engines does not exist yet

_Note: There is very little one can do to customize the app at this point other than to modify the code yourself. All database entries are hardcoded until an add interface is built._

## Intended Features
* Reddit top posts widget and notification
* Twitter latest tweets widget and notifications
* Github notifications
* DuckDuckGo search (default)
* DuckDuckGo top results (manually parsed with Nokogiri)
* Support for other search engines (Google, Amazon, Stack Overflow, etc.)
* Flexible "categories" that can be created and filled with external links
* Compiled client-side code to be stored locally for rapid launching
* Ability to recieve the client from the server for demo purposes (rather than store locally)

## Stack

### Client
* Backbone.js
* jQuery
* Handlebars

### Server
* Sinatra
* MongoDb
* Slim
* Sass

## Installation
For now, you must run the application on a server. Since the client app will be sent to the browser every time you open a new window or tab, you will have a faster, more pleasant experience if the app is hosted locally or within your local network.

1. Make sure you have Ruby and bundler installed
2. Clone the repo
3. Run `bundle install`
3. Install and run MongoDb
   * Make sure `app.rb` is pointing to your running mongo instance
5. Boot up the app
```
ruby app.rb
```
6. Open the app in your browser (port 8090 on your host machine)
7. Set your new home page in your browser settings. (You may have to install a browser plugin to have it open for new tabs)

## How to use
Check back later!
