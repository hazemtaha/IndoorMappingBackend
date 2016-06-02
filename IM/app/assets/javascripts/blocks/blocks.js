angular.module('IM_module')
	.factory('blocks', ['$http' , function($http){

       var obj = {}; 

		obj.getOne = function(bid,fid,blockId) {
		   return $http.get('/buildings/'+bid+'/floors/'+fid+'/blocks/'+blockId+'.json'); 
		};
		obj.delOne = function(bid,fid) {
		   return $http.delete('/buildings/'+bid+'/floors/'+fid+'.json'); 
		};
		return obj ; 

	}])