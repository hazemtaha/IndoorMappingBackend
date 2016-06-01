angular.module('IM_module')
	.factory('floors', ['$http' , function($http){

       var obj = {}; 

		obj.getOne = function(id) {
		    
		};
		obj.delOne = function(bid,fid) {
		   return $http.delete('/buildings/'+bid+'/floors/'+fid+'.json'); 
		};
		return obj ; 

	}])

