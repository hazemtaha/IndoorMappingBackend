angular.module('IM_module')
	.controller('MainCtrl', ['buildings',
		function(buildings){
			var self = this;
			self.addBuild = {};
			self.file = {};
			buildings.getAll().success(function(data){
				self.buildings = data ;
		    })
		    self.delBuilding = function(id){
		    	buildings.delOne(id).success(function(data){
		    		self.buildings = data ;
	    		})
		    }

		    self.onFileSelect = function($files) {
                self.file = $files[0];
                console.log($files);
            }

		    self.submitaddBuildForm = function(){
		    	buildings.addOne(self.addBuild,self.file).success(function(data){
		    		console.log(self.addBuild);
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

	
