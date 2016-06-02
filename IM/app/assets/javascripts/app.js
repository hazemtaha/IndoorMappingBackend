angular.module('IM_module', ['ui.router','templates','Devise'])
	.config([
		'$stateProvider',
		'$urlRouterProvider',
		'AuthProvider',
		function($stateProvider, $urlRouterProvider,AuthProvider) {
			AuthProvider.registerPath('/owners.json');
            AuthProvider.registerMethod('POST');

            AuthProvider.loginPath('/owners/sign_in.json');
            AuthProvider.loginMethod('POST');

		    $stateProvider
			    .state('home', {
			      url: '/home',
			      templateUrl: 'home/_home.html',
			      controller: 'MainCtrl',
			      controllerAs: "homeCtrl"
			      
			    })
			   .state('buildings', {
				  url: '/buildings/{id}',
				  templateUrl: 'buildings/_buildings.html',
				  controller: 'buildingsCtrl' ,
				  controllerAs: "buildCtrl"
				})
<<<<<<< HEAD

=======
			   .state('floors', {
				  url: '/buildings/{building_id}/floors/{id}',
				  templateUrl: 'floors/_floors.html',
				  controller: 'floorsCtrl' ,
				  controllerAs: "floorCtrl"
				})
			   .state('blocks', {
				  url: '/buildings/{building_id}/floors/{floor_id}/blocks/{id}',
				  templateUrl: 'blocks/_blocks.html',
				  controller: 'blocksCtrl' ,
				  controllerAs: "blockCtrl"
				});
>>>>>>> 8a93634b0dba365d8f71aa6df56420fae201edb3

			   .state('login', {
			      url: '/login',
			      templateUrl: 'auth/_login.html',
			      controller: 'AuthCtrl',
			      controllerAs: "authCtrl",
			      onEnter: ['$state', 'Auth', function($state, Auth) {
        				Auth.currentUser().then(function (){
          				$state.go('home');
        				})
      				}]
			    })
			    .state('register', {
			      url: '/register',
			      templateUrl: 'auth/_register.html',
			      controller: 'AuthCtrl',
			      controllerAs: "authCtrl",
			      onEnter: ['$state', 'Auth', function($state, Auth) {
        				Auth.currentUser().then(function (){
          				$state.go('home');
        				})
      				}]
			    });
		    $urlRouterProvider.otherwise('home');
	}])


