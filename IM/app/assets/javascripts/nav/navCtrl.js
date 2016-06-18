angular.module('IM_module')
  .controller('NavCtrl', [
  'Auth',
  '$rootScope',
  function(Auth, $rootScope){
    var self = this ;
    	  self.signedIn = Auth.isAuthenticated;
      	self.logout = Auth.logout;
      	Auth.currentUser().then(function(user){
            self.user = user;
            console.log(user) ;
            $rootScope.$on('devise:new-registration', function (e, user){
              self.user = user;
          	});

            $rootScope.$on('devise:login', function (e, user){
              self.user = user;
              console.log(e) ;
              console.log("dfh") ;
            });

            $rootScope.$on('devise:logout', function (e, user){
              console.log(user);
              self.user = {};
            });
        }
        ,function(data){
            console.log('error') ;
            console.log(data) ;
          }
        );

  }]);
