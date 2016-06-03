angular.module('IM_module')
	.factory('buildings', ['$http' , function($http){
		
		var obj = {}; 
		obj.getAll = function() {
		    return $http.get('/buildings.json');
		};
		obj.getOne = function(id) {
		    return $http.get('/buildings/'+id+'.json');
		};
		obj.delOne = function(id) {
			console.log('inside') ;
		    return $http.delete('/buildings/'+id+'.json');
		};
		return obj ; 

	}])

