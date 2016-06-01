angular.module('IM_module')
	.controller('MainCtrl', ['buildings',
		function(buildings){
			var self = this;
			buildings.getAll().success(function(data){
		    	console.log(data);
				self.buildings = data ;
		    });
	}])

	
