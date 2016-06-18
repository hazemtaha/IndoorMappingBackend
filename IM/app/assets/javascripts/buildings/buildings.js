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
		    return $http.delete('/buildings/'+id+'.json');
		};
		obj.editOne = function(id , editBuild ) {
			console.log('inside') ;
		    return $http.put('/buildings/'+id+'.json' , editBuild );
		};

		obj.addOne = function(addBuild) {
		    return $http.post('/buildings.json', addBuild);
		};


		obj.getBlocks = function(bId, fId){
			return $http.get('floor/'+fId+'/blocks.json');
		}; //start from hereeeeeeeeeeeeeeeeeee


		return obj ; 
	}])

