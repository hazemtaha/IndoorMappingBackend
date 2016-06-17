angular.module('IM_module')
	.controller('floorsCtrl', ['$stateParams','floors','blocks' ,
		function( $stateParams,floors ,blocks){
			console.log('id = '+$stateParams.id);
			console.log('bid = '+$stateParams.building_id);
			var self = this;
			self.editBlock = {};
			self.isEdit = false;
			
			floors.getOne($stateParams.building_id,$stateParams.id).success(function(data){
		    	console.log(data);
		    	self.floor = data ; 
		    })
	    // ----------------------------------------
	    	self.getBlockDetails = function(bid,fid,block_id){
	    		console.log(bid ,fid ,block_id) ;
	    		blocks.getOne(bid,fid,block_id).success(function(data){
			    	self.blockDetails = data ;
		    	});	
	    	}
	    // ----------------------------------------

	    self.submiteditBlockForm = function(buildId , floorId){
		    	console.log("submit") ;
		    	console.log(self.editBlock) ;
		    	// console.log(self.editId) ;
		    	// console.log(buildId);
		    	// console.log(floorId);
		    	blocks.editOne(buildId , floorId, self.editId , self.editBlock).success(function(data){
			    	console.log(data);
			    	self.floor.blocks = data;
			    	console.log(self.floor);
			    	console.log("final");
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