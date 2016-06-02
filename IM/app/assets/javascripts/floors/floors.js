angular.module('IM_module')
	.factory('floors', ['$http' , function($http){

       var obj = {}; 

		obj.getOne = function(bid,fid) {
		   return $http.get('/buildings/'+bid+'/floors/'+fid+'.json'); 
		};
		obj.delOne = function(bid,fid) {
		   // return $http.get('/buildings/'+bid+'/floors/'+fid+'.json'); 
		   return $http.delete('/buildings/'+bid+'/floors/'+fid); 
		};
		return obj ; 

	}])

