angular.module('IM_module')
  .controller('NavCtrl', [
  'Auth',
  function(Auth){
    	  this.signedIn = Auth.isAuthenticated;
      	this.logout = Auth.logout;
        this.cu = "anahenA" ;
        var self =this ;
      	Auth.currentUser().then(function(user){
            self.user = user;
            console.log(user) ;
           //  this.$on('devise:new-registration', function (e, user){
           //    this.user = user;
          	// });

           //  this.$on('devise:login', function (e, user){
           //    this.user = user;   
           //    console.log(e) ;
           //    console.log("dfh") ;
           //  });

           //  this.$on('devise:logout', function (e, user){
           //    this.user = {};
           //  });
        }
        ,function(data){
            console.log('error') ;
            console.log(data) ;
          }
        );

  }]);