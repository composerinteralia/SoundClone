Rails.application.routes.draw do
  root to: 'static_pages#root'
  get 'auth/facebook/callback', to: 'api/sessions#omniauth_facebook'

  namespace :api, defaults: { format: :json } do
    resources :tracks, only: [:create, :destroy, :show, :update] do
      collection do
        get 'explore'
        get 'stream'
      end

      resource :like, only: [:create, :destroy]
    end

    resources :users, only: [:create, :show] do
      resources :tracks, only: [:index]

      resource :follow, only: [:create, :destroy]
    end

    resource :user, only: [:update]

    resource :session, only: [:create, :destroy, :show]
  end
end
