angular.module('IM_module', ['ui.router','templates'])
	.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {

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
			      controllerAs: "homeCtrl" ,
			      
			    })
			   .state('buildings', {
				  url: '/buildings/{id}',
				  templateUrl: 'buildings/_buildings.html',
				  controller: 'buildingsCtrl' ,
				  controllerAs: "buildCtrl"
				});

		    $urlRouterProvider.otherwise('home');
	}])


