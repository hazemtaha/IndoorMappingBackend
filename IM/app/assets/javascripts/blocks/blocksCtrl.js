angular.module('IM_module')
	.controller('blocksCtrl', ['$stateParams','blocks',
		function( $stateParams, blocks){
			console.log($stateParams.id);
			console.log($stateParams.building_id);
			console.log($stateParams.floor_id);
	
			var self = this;
			self.isEdit = false;
			
			blocks.getOne($stateParams.building_id,$stateParams.floor_id,$stateParams.id).success(function(data){
		    	console.log(data);
		    });


			
	}]);