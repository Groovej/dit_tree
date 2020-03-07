Rails.application.routes.draw do
  root 'directories#index'

  resources :directories, only: [:index, :create, :destroy] do
    get :data, on: :collection
  end
end
