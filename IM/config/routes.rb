Rails.application.routes.draw do
  devise_for :owners
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  root to: 'application#angular'

  resources :buildings  do
    resources :floors  do
      resources :blocks do
      end
    end
  end
  post 'block/:block_id/beacon' => 'beacon#create'
  delete 'beacon/:id' => 'beacon#destroy'
  post 'floor/:floor_id/svg' => 'svg#create'
  get 'floor/:floor_id/svg' => 'svg#show'
  get 'svg/beacon/:uuid' => 'svg#import'
  get 'beacons/' => 'beacon#all'
  post 'beacon/:uuid/callibrate' => 'beacon#callibrate'
  post 'visitors/' => 'visitor#create'
  get 'floor/:floor_id/blocks' => 'floors#getBlockByFloor'
  post 'beacons/visits' => 'visits#getVistors'
  post 'visitors/login' => 'visitor#login'
  post 'beacon/:uuid/visit' => 'visit#create'
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
