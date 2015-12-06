require 'sinatra'
require 'json'

# helpers to retrieve twitter dat
class TwitterAdapter
  def auth(user, pass)
    # authenticate
  end

  def fetch_latest(qty)
    # get latest tweets from feed in specified quantity
  end
end

# helpers to retrieve reddit data
class RedditAdapter
  def auth(user, pass)
    # authenticate
  end

  def fetch_new_messages
    # get new message qty from reddit inbox
  end

  def fetch_top(qty)
    # get top posts from front page in specified quantity
  end
end

get '/api/twitter/auth' do
end

get '/api/twitter/' do
end

get '/api/reddit/auth' do
end

get '/api/reddit/' do
end
