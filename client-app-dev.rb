require 'sinatra'
require 'slim'
require 'sass'
require 'json'
require 'mongo'

set :port, 8090
set :environment, :development

db = new Connection.new.db('startpage')

shortcuts = db.collection('shortcuts')
categories = db.collection('categories')
tabs = db.collection('tabs')

get '/' do
  slim :index
end

get '/styles.css' do
  sass :styles, :style => :expanded
end

get 'api/shortcuts' do
  # get all shortcut data
end

post 'api/shortcuts/:name' do
  # add a new shortcut
end

delete 'api/shortcuts/:name' do
  # delete shortcut
end

get 'api/categories' do
  # get list of categories and associated data
end

post 'api/categories/:name' do
  # add a new category
end

post 'api/categories/:name/links' do
  # add a new link to a category
end

delete 'api/categories/:name' do
  # delete a category
end

delete 'api/categories/:name/links/:id' do
  # delete a link within a category
end

get 'api/tabs/:name' do
  # get data for a specified tab
end

post 'api/tabs/:name' do
  # create a new tab
end

delete 'api/tabs/:name' do
  # delete a tab
end
