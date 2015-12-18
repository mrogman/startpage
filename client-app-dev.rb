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
      { name: 'reddit', type: 'font', fontClass: 'fa-reddit-alien', hoverColor: '#F22700', img: '', href: 'https://reddit.com' },
      { name: 'twitter', type: 'font', fontClass: 'fa-twitter', hoverColor: '#3399ff', img: '', href: 'https://twitter.com' },
      { name: 'github', type: 'font', fontClass: 'fa-github-alt', hoverColor: '#60DA11', img: '', href: 'https://github.com/mrogman' },
      { name: 'soundcloud', type: 'font', fontClass: 'fa-soundcloud', hoverColor: '#FF6400', img: '', href: 'https://soundcloud.com/stream' }
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

## application root
get '/' do
  slim :index
end

get '/styles.css' do
  sass :styles, :style => :expanded
end

## get all shortcut data
get '/api/shortcuts/' do
  settings.db[:shortcuts].find.to_a.to_json
end

## add a new shortcut
post '/api/shortcuts/' do
  entry = { name: params[:shortcut_name],
            img:  params[:shortcut_img],
            href: params[:shortcut_href] }
  # insert
  settings.db[:shortcuts].insert_one(entry)
end

## delete shortcut
delete '/api/shortcuts/:id' do
  settings.db[:shortcuts].delete_one(name: :id)
end

## get list of categories and associated data
get '/api/categories/' do
  settings.db[:categories].find.to_a.to_json
end

## add a new category
post '/api/categories/' do
  category_links = [text: params[:category_link_text],
                    href: params[:category_link_href]]
  entry = { name:       params[:shortcut_name],
            background: params[:shortcut_img],
            links:      category_links }
  # insert
  settings.db[:categories].insert_one(entry)
end

## add a new link to a category
patch '/api/categories/:id/links' do
  categories = settings.db[:categories]
  new_link = [text: params[:category_link_text],
              href: params[:category_link_href]]
  entry = categories.find(id: :id)
  # update
  entry.replace_one(links: new_link)
end

## delete a category
delete '/api/categories/:id' do
  settings.db[:categories].delete_one(id: :id)
end

## delete a link within a category
delete '/api/categories/:id/links/:link_id' do
  # do later
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
