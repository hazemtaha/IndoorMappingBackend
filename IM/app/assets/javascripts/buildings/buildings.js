angular.module('IM_module')
	.factory('buildings', ['$http' , function($http){

	  // var o = {
	  //   buildings: [
	  //         {id:0 ,address: 'add 0', name: 5  , thumbnail: '1.png',floors: ['f0','f3','f1','f2']},
	  //         {id:1 ,address: 'add 1', name: 5  , thumbnail: '1.png',floors: ['f4','f5','f1','f2']},
			//   {id:2 ,address: 'add 2', name: 2  , thumbnail: '1.png',floors: ['f6','f5','f1','f2'] },
			//   {id:3 ,address: 'add 3', name: 15  , thumbnail: '1.png',floors: ['f3','f9','f1','f2'] },
			//   {id:4 ,address: 'add 7', name: 15  , thumbnail: '1.png',floors: ['f4','f3','f1','f2'] },
   //   		  {id:5 ,address: 'add 5', name: 4  , thumbnail: '1.png',floors: ['f5','f3','f1','f2'] }
   //   		]
	  // };
	  // return o ;

       var obj = {}; 
	    obj.getAll = function() {
		    return $http.get('/buildings.json');
		};
		obj.getOne = function(id) {
		    return $http.get('/buildings/'+id+'.json');
		};
		return obj ; 

	}])

