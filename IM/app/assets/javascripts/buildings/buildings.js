angular.module('IM_module')
	.factory('buildings', ['$http','Upload' , function($http,Upload){
		
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

		obj.addOne = function(addBuild,file) {
			return Upload.upload({
                    url: '/buildings.json',
                    method: 'POST',
                    fields: {
                        'building[address]': addBuild.address,
                        'building[name]': addBuild.name,
                        'building[thumbnail]': file
                    },
                    file: file,
                    sendFieldsAs: 'json'
                })
		    //return $http.post('/buildings.json', addBuild);
		};

		return obj ; 
	}])

