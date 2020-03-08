Rails.application.routes.draw do
  root 'directories#index'

  resources :directories, only: [:index, :create, :destroy, :show, :update] do
    get :data, on: :collection
  end
end
