angular.module('IM_module')
	.controller('MainCtrl', ['buildings',
		function(buildings){
			var self = this;
			self.addBuild = {};
			buildings.getAll().success(function(data){
				self.buildings = data ;
		    })
		    self.delBuilding = function(id){
		    	buildings.delOne(id).success(function(data){
		    		self.buildings = data ;
	    		})
		    }


		    self.submitaddBuildForm = function(){
		    	buildings.addOne(self.addBuild).success(function(data){
		    		if (data.errorMsg !== undefined ){
		    			self.buildExist = data.errorMsg ;	
		    		}else{
		    			self.buildings = data ;	
					    $('.modal').modal('hide');
		    		}
		    	});

		    	self.addBuild = {} ;
		    	self.addBuildForm.$setPristine();
		    }	

	}])

	
