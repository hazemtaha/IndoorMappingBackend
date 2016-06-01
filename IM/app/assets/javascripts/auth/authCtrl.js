angular.module('IM_Module')
.controller('AuthCtrl', [
'$state',
'Auth',
function($state, Auth){
	 this.login = function() {
    Auth.login(this.user).then(function(){
      $state.go('home');
    });
  };

  this.register = function() {
    Auth.register(this.user).then(function(){
      $state.go('home');
    });
  };
}]);
