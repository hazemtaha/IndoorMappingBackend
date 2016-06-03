angular.module('IM_module')
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

  this.reset = function(){
    Auth.sendResetPasswordInstructions(this.user).then(function(){
      $state.go('home');
    });
  }

}]);
