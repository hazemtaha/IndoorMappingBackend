angular.module('IM_module')
	.controller('buildingsCtrl', ['$stateParams','buildings','floors',
		function( $stateParams, buildings,floors){
			console.log($stateParams.id);
			//this.build = buildings.buildings[$stateParams.id];
			console.log(this.build);

			var self = this;

			buildings.getOne($stateParams.id).success(function(data){
		    	console.log(data);
				self.build = data ;
		    });

		    self.delFloorFunc = function (bid,fid){
			    	console.log(bid,fid);

		    	floors.delOne(bid,fid).success(function(data){
			    	console.log('hiiiii');
			    	console.log(data);
					//self.build = data ;
		    	});
		    }			
	}]);