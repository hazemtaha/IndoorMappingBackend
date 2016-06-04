angular.module('IM_module')
.controller('AuthCtrl', [
'$state',
'Auth',
'FileUploader',
function($state, Auth,FileUploader){
	 this.login = function() {
    Auth.login(this.user).then(function(){
      //console.log(data);
      $state.go('home');
    });
  };



    //this.$on('flow::fileAdded', function(event, $flow, flowFile) {
     //this.user.picture = $flow.files.flowRelativePath;
  //});


  this.register = function() {
    this.uploader = new FileUploader({url: '/owners'});
    this.user.picture = this.uploader;
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
