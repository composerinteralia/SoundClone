Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show]
    resource :session, only: [:destroy]
  end
end
