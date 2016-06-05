angular.module('IM_module')
	.controller('blocksCtrl', ['$stateParams','blocks',
		function( $stateParams, blocks){
			console.log($stateParams.id);
			console.log($stateParams.building_id);
			console.log($stateParams.floor_id);
	
			var self = this;
			
			self.editBlock = {};
			self.isEdit = false;
			// self.editBlock.name = self.block.name ;

			blocks.getOne($stateParams.building_id,$stateParams.floor_id,$stateParams.id).success(function(data){
		    	console.log(data);
				// self.build = data ;
		    });


			self.submiteditBlockForm = function(buildId , floorId){
		    	console.log("submit") ;
		    	console.log(self.editBlock) ;
		    	// console.log(self.editId) ;
		    	// console.log(buildId);
		    	// console.log(floorId);
		    	blocks.editOne(buildId , floorId, self.editId , self.editBlock).success(function(data){
			    	console.log(data);
			    	self.block.name = data.name;
			    	console.log(self.block);
		    	});
		    	self.isEdit = false ;
			   	
		    }

			
			self.editFunc = function(block){
				console.log(block.name);
		    	self.isEdit = true;
		    	self.editId = block.id;
		    	self.editBlock.name = block.name ;
		    	self.editBlock.id = block.id;
			 }
	}]);