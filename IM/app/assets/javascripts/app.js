angular.module('IM_module', ['ui.router','templates'])
	.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {

		    $stateProvider
			    .state('home', {
			      url: '/home',
			      templateUrl: 'home/_home.html',
			      controller: 'MainCtrl',
			      controllerAs: "homeCtrl" ,
			      
			    })
			   .state('buildings', {
				  url: '/buildings/{id}',
				  templateUrl: 'buildings/_buildings.html',
				  controller: 'buildingsCtrl' ,
				  controllerAs: "buildCtrl"
				})
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

		    $urlRouterProvider.otherwise('home');
	}])


