angular.module('IM_module')
	.controller('buildingsCtrl', ['$stateParams','buildings','floors',
		function( $stateParams, buildings,floors){
			console.log($stateParams.id);
			//this.build = buildings.buildings[$stateParams.id];
			console.log(this.build);
			var self = this;
			self.addFloor = {} ;
			self.editBuild = {} ;
			self.addBuild = {} ;

			buildings.getOne($stateParams.id).success(function(data){
		    	console.log(data);
				self.build = data ;
		    });

		    self.delFloorFunc = function (bid,fid){
			    	console.log(bid,fid);
		    	floors.delOne(bid,fid).success(function(data){
		    			console.log(data);
		    		self.build.floors = data ;
		    	});
		    }

		    self.submitaddFloorForm = function(){
		    	self.addFloor.building_id = self.build.id ;
		    	console.log(self.addFloor) ;
		    	floors.addOne(self.build.id,self.addFloor).success(function(data){
		    		if (data.errorMsg !== undefined ){
		    			self.floorExist = data.errorMsg ;
		    			// self.addFloorForm.$invalid = true ;
		    			console.log(data.errorMsg);
		    			console.log('errrrrrrrrrrrr');		
		    		}else{
		    			console.log('no errrrrrrrrrrrr');
		    			console.log(data);
		    			self.build.floors = data ;	
					    $('.modal').modal('hide');
		    		}
		    	});
		    	self.addFloor = {} ;
		    	self.addFloorForm.$setPristine();
		    }

		    self.editFunc = function(){
		    	self.isEdit = true ;
		    	self.editBuild.name = self.build.name ;
				self.editBuild.address = self.build.address ;		
		    }
		    self.submiteditbuildForm = function(){
		    	console.log("submit") ;
		    	console.log(self.editBuild) ;
		    	buildings.editOne(self.build.id ,self.editBuild).success(function(data){
			    	console.log(data);
					self.build = data ;
		    	});
		    	self.isEdit = false ;
			   	
		    }


		    self.submitaddBuildForm = function(){
		    	//self.addBuild.building_id = self.build.id ;
		    	//console.log(self.addFloor) ;
		    	buildings.addOne(self.addBuild).success(function(data){
		    		if (data.errorMsg !== undefined ){
		    			self.buildExist = data.errorMsg ;
		    			console.log(data.errorMsg);
		    			console.log('errrrrrrrrrrrr');		
		    		}else{
		    			console.log('no errrrrrrrrrrrr');
		    			console.log(data);
		    			self.build = data ;	
					    $('.modal').modal('hide');
		    		}
		    	});

		    	self.addBuild = {} ;
		    	self.addBuildForm.$pristine = true;
		    	self.addBuildForm.$dirty = false;
		    	self.addBuildForm.$setPristine();
		    	self.addBuildForm.$setUntouched();
		    	////console.log(self.addBuildForm);
		    }

	}]);