angular.module('IM_module')
    .controller('AuthCtrl', [
        '$state',
        'Auth',
        'Upload',
        function($state, Auth, Upload) {
            var self = this;
            self.login = function() {
                Auth.login(self.user).then(function() {
                    //console.log(data);
                    $state.go('home');
                }, function(err) {
                    alert(JSON.stringify(err));
                });
            };

            self.isAuthenticated = function() {
                return Auth.isAuthenticated();
            }
            self.onFileSelect = function($files) {
                self.file = $files[0];
                console.log($files);
            }
            self.register = function() {
                Upload.upload({
                    url: '/owners.json',
                    method: 'POST',
                    fields: {
                        'owner[email]': self.user.email,
                        'owner[username]': self.user.username,
                        'owner[password]': self.user.password,
                        'owner[picture]': self.file
                    },
                    file: self.file,
                    sendFieldsAs: 'json'
                }).then(function(response, status, headers, config) {
                    // file is uploaded successfully
                    console.log(response.data);
										Auth._currentUser = response.data;
                    $state.go('home');
                });
                // Auth.register(self.user).then(function(){
                //   console.log(self.user)
                // });
            };

            self.reset = function() {
                Auth.sendResetPasswordInstructions(self.user).then(function() {
                    $state.go('home');
                });
            }

        }
    ]);
