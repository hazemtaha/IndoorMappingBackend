angular.module('IM_module')
	.factory('floors', ['$http' , function($http){

       var obj = {}; 

		obj.getOne = function(bid,fid) {
		   return $http.get('/buildings/'+bid+'/floors/'+fid+'.json'); 
		};
		obj.delOne = function(bid,fid) {
		   return $http.delete('/buildings/'+bid+'/floors/'+fid+'json'); 
		};
		obj.addOne = function(bid,addFloor) {
			console.log('inside add floor') ;
			console.log(addFloor) ;
			console.log(bid) ;
		    return $http.post('/buildings/'+bid+'/floors.json', addFloor );
		};

		obj.getvistors =function (bid){
			// console.log("inide getvistors");
			return $http.get('beacon/'+bid+'/visit.json');
		};

		return obj ; 

	}])

