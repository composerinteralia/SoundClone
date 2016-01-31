Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :tracks, only: [:create, :destroy, :index, :show, :update]

    resources :users, only: [:create, :show]
    resource :user, only: [:update]
    resource :session, only: [:create, :destroy, :show]
  end
end
