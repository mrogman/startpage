require 'sinatra'
require 'slim'
require 'sass'
require 'json'
require 'mongo'

set :port, 8090
set :environment, :development

configure do
  ## Create db client
  db = Mongo::Client.new(['127.0.0.1:27017'], :database => 'startpage')
  set :db, db

  ## insert example data - move to separate file
  if db[:shortcuts].find.to_a.empty?
    puts 'loading example data for shortcuts collection'
    db[:shortcuts].insert_many [
      { name: 'twitter', img: 'https://www.iconfinder.com/icons/107170/circle_color_twitter_icon', href: 'https://twitter.com' },
      { name: 'github', img: 'https://image.freepik.com/iconos-gratis/logo-github_318-53553.jpg', href: 'https://github.com/mrogman' },
      { name: 'reddit', img: 'http://mediaserver.pulse2.com/uploads/2009/10/reddit-logo.png', href: 'https://reddit.com' },
    ]
  end

  if db[:categories].find.to_a.empty?
    puts 'loading example data for categories collection'
    db[:categories].insert_many [
      { name: 'Social', background: 'https://wallscometumblingdown.files.wordpress.com/2013/04/social_media.jpg',
        links: [
          { text: 'Twitter', href: 'https://twitter.com' },
          { text: 'Reddit', href: 'https://reddit.com' },
          { text: 'Facebook', href: 'https://facebook.com' }
        ]
      },
      { name: 'Programming', background: 'http://media2.govtech.com/images/770*1000/shutterstock_computer_programming.jpg',
        links: [
          { text: 'Stack Overflow', href: 'http://stackoverflow.com' },
          { text: 'Hacker News', href: 'https://news.ycombinator.com' },
          { text: 'Github', href: 'https://github.com' }
        ]
      }
    ]
  end
end

get '/' do
  slim :index
end

get '/styles.css' do
  sass :styles, :style => :expanded
end

get '/api/shortcuts/' do
  # get all shortcut data
  settings.db[:shortcuts].find.to_a.to_json
end

post '/api/shortcuts/:name' do
  # add a new shortcut
end

delete '/api/shortcuts/:name' do
  # delete shortcut
end

get '/api/categories/' do
  # get list of categories and associated data
  settings.db[:categories].find.to_a.to_json
end

post '/api/categories/:name' do
  # add a new category
end

post '/api/categories/:name/links' do
  # add a new link to a category
end

delete '/api/categories/:name' do
  # delete a category
end

delete '/api/categories/:name/links/:id' do
  # delete a link within a category
end

get '/api/tabs/:name' do
  # get data for a specified tab
end

post '/api/tabs/:name' do
  # create a new tab
end

delete '/api/tabs/:name' do
  # delete a tab
end
