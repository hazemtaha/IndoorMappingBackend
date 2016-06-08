angular.module('IM_module')
	.factory('blocks', ['$http' , function($http){
       var obj = {}; 
		obj.getOne = function(bid,fid,blockId) {
		   return $http.get('/buildings/'+bid+'/floors/'+fid+'/blocks/'+blockId+'.json'); 
		};
		obj.delOne = function(bid,fid) {
		   return $http.delete('/buildings/'+bid+'/floors/'+fid+'.json'); 
		};
		obj.editOne = function(buildId , fId , bId , editBlock){
			console.log("before send to ws");
			return $http.put('/buildings/'+buildId+'/floors/'+fId+'/blocks/'+bId+'.json' , editBlock)
		}

		return obj ; 

	}])