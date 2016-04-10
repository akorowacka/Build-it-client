app.controller("loginCtrl", function($scope, $mdDialog, $cookies, $rootScope) {
    $scope.showLogin = function(ev) {
        $mdDialog.show({
            controller: DialogLoginController,
            parent: angular.element(document.body),
            templateUrl: '/app/components/login/dialogLogin.html',
            clickOutsideToClose: true,
            targetEvent: ev,
            openFrom: '#header',
            closeTo: {
                left: 1500
            }
        });
    };

    $scope.logOut = function() {
        $cookies.remove('user');
        $rootScope.isLogged = false;
    };

    $rootScope.$watch('isLogged', function() {
        if($cookies.getObject('user')) {
            $scope.user = $cookies.getObject('user');
            $scope.userDefaultAvatar = $scope.user.email[0].toUpperCase();
            $scope.isLogged = true;
        }
        else {
            $scope.isLogged = false;
        }
    });
});

function DialogLoginController($scope, $mdDialog, Restangular, $rootScope, $cookies) {
    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.login = function() {
        if ($scope.userlogin) {
            Restangular.one('users').getList().then(function(users) {
                var userWithId = _.find(users, function(user) {
                    return user.email === $scope.userlogin;
                });

                if(userWithId.password === $scope.userpass) {
                    $scope.isLoginIncorrect = false;
                    $cookies.putObject('user' , userWithId);
                    $scope.hide();
                    $rootScope.isLogged = true;
                }
                else {
                    $scope.isLoginIncorrect = true;
                }
            });
        }

    };

    $scope.register = function() {
        if ($scope.newUserLogin) {
            Restangular.one('users').getList().then(function(users) {
                $scope.isAlreadyRegistered = _.find(users, function(user) {
                    return user.email === $scope.newUserLogin;
                });

                if (!$scope.isAlreadyRegistered && $scope.registerForm.$valid) {
                    var newUser = {
                        name: $scope.newUserName,
                        email: $scope.newUserLogin,
                        surname: $scope.newUserSurname,
                        address: $scope.newUserAddress,
                        password: $scope.newUserPass
                    };

                    Restangular.all('users').post(newUser).then(function() {
                        $scope.userAddedSuccessfully = true;
                    }, function() {
                        console.log('error');
                    });
                }
            });
        }
    };
}
