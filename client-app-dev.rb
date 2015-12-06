require 'sinatra'
require 'slim'
require 'sass'
require 'json'

set :port, 8090
set :environment, :development

## for development - include compiled html in client
get '/' do
  slim :index
end

## for development - include compiled css in client
get '/styles.css' do
  sass :styles, :style => :expanded
end
