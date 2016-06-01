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
			  //     resolve: {
					//   buildingPromise: ['buildings', function(buildings){
					//   	console.log('hi') ;
					//     return buildings.getAll();
					//   }]
					// },

			      controller: 'MainCtrl',
			      controllerAs: "homeCtrl"
			      
			    })
			   .state('buildings', {
				  url: '/buildings/{id}',
				  templateUrl: 'buildings/_buildings.html',
				  controller: 'buildingsCtrl' ,
				  controllerAs: "buildCtrl"
				})


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


