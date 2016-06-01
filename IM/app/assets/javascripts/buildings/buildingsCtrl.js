angular.module('IM_module')
	.controller('buildingsCtrl', ['$stateParams','buildings',
		function( $stateParams, buildings){
			console.log($stateParams.id);
			//this.build = buildings.buildings[$stateParams.id];
			console.log(this.build);

			var self = this;
			buildings.getOne($stateParams.id).success(function(data){
		    	console.log(data);
				self.build = data ;
		    });			
	}]);