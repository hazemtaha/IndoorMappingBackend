angular.module('IM_module')
	.controller('floorsCtrl', ['$stateParams','floors','blocks' ,
		function( $stateParams,floors ,blocks){
			console.log('id = '+$stateParams.id);
			console.log('bid = '+$stateParams.building_id);
			var self = this;
			floors.getOne($stateParams.building_id,$stateParams.id).success(function(data){
		    	console.log(data);
		    	self.floor = data ; 
		    })
	    // ----------------------------------------
	    	self.getBlockDetails = function(bid,fid,block_id){
	    		console.log(bid ,fid ,block_id) ;
	    		blocks.getOne(bid,fid,block_id).success(function(data){
			    	console.log('floor---------- ');
			    	console.log(self.floor);
			    	console.log('blockes details ---------- ');
			    	console.log(data);
			    	self.blockDetails = data ;
		    	});	
	    	}
	    // ----------------------------------------
	
	}]);