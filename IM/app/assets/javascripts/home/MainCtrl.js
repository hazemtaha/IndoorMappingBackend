angular.module('IM_module')
	.controller('MainCtrl', ['buildings',
		function(buildings){
			var self = this;
			buildings.getAll().success(function(data){
				self.buildings = data ;
		    })
		    self.delBuilding = function(id){
		    	buildings.delOne(id).success(function(data){
		    		self.buildings = data ;
	    		})
		    }
	}])

	
