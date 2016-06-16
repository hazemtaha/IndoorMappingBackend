angular.module('IM_module')
	.controller('buildingsCtrl', ['$stateParams','buildings','floors','$state','mapStorage',
		function( $stateParams, buildings, floors, $state, mapStorage){
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
		    		}else{
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

			self.openMap = function(floorWidth, floorHeight, floorId) {
				console.log("");
				mapStorage.realWidth = floorWidth;
				mapStorage.realHeight = floorHeight;
				mapStorage.width = floorWidth * mapStorage.scale(floorWidth, floorHeight);
				mapStorage.height = floorHeight * mapStorage.scale(floorWidth, floorHeight);
				$state.go('map_editor', {
						building_id: $stateParams.id,
						floor_id: floorId
				});
			}
	}]);
