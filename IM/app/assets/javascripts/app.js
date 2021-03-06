angular.module('IM_module', ['ui.router','templates','Devise','ui.bootstrap', 'ngFileUpload'])
	.config([
		'$stateProvider',
		'$urlRouterProvider',
		'AuthProvider',
		function($stateProvider, $urlRouterProvider,AuthProvider,flowFactoryProvider) {

			AuthProvider.registerPath('/owners.json');
            AuthProvider.registerMethod('POST');
            AuthProvider.loginPath('/owners/sign_in.json');
            AuthProvider.loginMethod('POST');
            //console.log(AuthProvider);
            AuthProvider.sendResetPasswordInstructionsPath('/owners/password.json');
            AuthProvider.sendResetPasswordInstructionsMethod('POST');

		    $stateProvider
		    	.state('mainPage', {
			      url: '/mainPage',
			      templateUrl: 'mainPage/_mainPage.html',
			      controller: 'mainPageCtrl',
			      controllerAs: "mainPageCtrl"
			    })

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
				  controllerAs: "buildCtrl" ,
				})

			   .state('floors', {
				  url: '/buildings/{building_id}/floors/{id}',
				  templateUrl: 'floors/_floors.html',
				  controller: 'floorsCtrl' ,
				  controllerAs: "floorCtrl"
				})

		        .state('map_editor', {
		            url: '/buildings/{building_id}/floors/{floor_id}/map_editor',
		            templateUrl: 'map/_map_editor.html',
		            controller: 'MapEditorController',
		            controllerAs: 'mapCtrl'
		        })

			   .state('blocks', {
				  url: '/buildings/{building_id}/floors/{floor_id}/blocks/{id}',
				  templateUrl: 'blocks/_blocks.html',
				  controller: 'blocksCtrl' ,
				  controllerAs: "blockCtrl"
				})

				.state('statistics', {
				  url: '/buildings/{building_id}/statistics/{floor_id}',
				  templateUrl: 'statistics/_statistics.html',
				  controller: 'statisticsCtrl' ,
				  controllerAs: "statisticCtrl"
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
			   .state('reset', {
			      url: '/reset',
			      templateUrl: 'auth/_reset.html',
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
        					console.log(Auth.currentUser);
          				$state.go('home');
        				})
      				}]
			    });
		    $urlRouterProvider.otherwise('mainPage');
	}])
