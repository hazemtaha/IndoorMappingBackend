angular.module('IM_module')
	.factory('floors', ['$http' , function($http){

       var obj = {};

		obj.getOne = function(bid,fid) {
		   return $http.get('/buildings/'+bid+'/floors/'+fid+'.json');
		};
		obj.delOne = function(bid,fid) {
		   return $http.delete('/buildings/'+bid+'/floors/'+fid+'.json'); 
		};
		obj.addOne = function(bid,addFloor) {
		    return $http.post('/buildings/'+bid+'/floors.json', addFloor );
		};

		return obj ;

	}])
