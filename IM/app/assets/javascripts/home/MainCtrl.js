angular.module('IM_module')
	.controller('MainCtrl', ['buildings',
		function(buildings){
		this.buildings = buildings.buildings;

	}])

	
