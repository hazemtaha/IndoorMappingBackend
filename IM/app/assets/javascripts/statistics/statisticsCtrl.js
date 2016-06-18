angular.module('IM_module')
	.controller('statisticsCtrl', ['$stateParams','floors','buildings',
		function($stateParams,floors,buildings){
			var self = this ;
			console.log($stateParams.building_id);
			console.log($stateParams.floor_id);
			self.buildId =  $stateParams.building_id;
			self.floorId =  $stateParams.floor_id ;
			buildings.getOne(self.buildId).success(function(data){
				self.currentBuild = data ;
			});
			floors.getOne(self.buildId ,self.floorId).success(function(data){
				self.currentFloor = data ;
			});
			// self.showFloorStatFunc = function(buildId, floorId){
			console.log("Inside showFloorStatFunc");
			buildings.getBlocks(self.buildId , self.floorId).success(function(data){
					// console.log(data);
					self.Fblocks = data;
					var blocksBeacons = {};
					
					for (var x = 0; x < data.length; x++) {
						blocksBeacons[data[x].id] = [];
						for (var y=0 ; y< data[x].beacons.length ; y++){
							var beaconId = data[x].beacons[y].id;
							blocksBeacons[data[x].id].push(beaconId);
						}
						if (!blocksBeacons[data[x].id].length) {
							delete blocksBeacons[data[x].id];
						}
					}
					floors.getvistors(blocksBeacons).success(function(vData){
						// console.log(vData);
						for (var x = 0; x < data.length; x++) {
							if (vData.visits[data[x].id]) {
							data[x].Tvisitors = vData.visits[data[x].id].visits;
								self.Fblocks = data;
								// console.log(data);
							}
						}
					});
				// console.log(data);
				});
			// }

	}])

	
