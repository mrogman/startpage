require 'sinatra'
require 'slim'
require 'sass'

get '/' do
  slim :index
end

get '/styles.css' do
  sass :styles, :style => :expanded
end
