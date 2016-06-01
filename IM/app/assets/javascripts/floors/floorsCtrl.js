angular.module('IM_module')
	.controller('floorsCtrl', ['$stateParams','floors',
		function( $stateParams,floors){
			console.log('id'+$stateParams.id);
			console.log('bid'+$stateParams.building_id);

			var self = this;

			floors.getOne($stateParams.building_id,$stateParams.id).success(function(data){
		    	console.log(data);
		    	self.floor = data ; 
				
		    });

	
	}]);