angular.module('IM_module')
.controller('AuthCtrl', [
'$state',
'Auth',
function($state, Auth){
	 this.login = function() {
    Auth.login(this.user).then(function(){
      //console.log(data);
      $state.go('home');
    }, function(err){
      alert(JSON.stringify(err));
    });
  };

  this.isAuthenticated = function(){
    return Auth.isAuthenticated();
  }

    //this.$on('flow::fileAdded', function(event, $flow, flowFile) {
     //this.user.picture = $flow.files.flowRelativePath;
  //});


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
