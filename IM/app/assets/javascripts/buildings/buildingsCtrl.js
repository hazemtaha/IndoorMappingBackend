angular.module('IM_module')
	.controller('buildingsCtrl', ['$stateParams','buildings',
		function( $stateParams, buildings){
			console.log($stateParams.id);
			this.build = buildings.buildings[$stateParams.id];
			console.log(this.build);			
	}]);