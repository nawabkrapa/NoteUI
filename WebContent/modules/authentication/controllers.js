'use strict';
  
angular.module('Authentication')
  
.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        AuthenticationService.ClearCredentials();
  
        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response,status) {
                if(status==200) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/');
                    $scope.notes = response;
                } else {
                    $scope.error = 'User credentials are incorrect';
                    $scope.dataLoading = false;
                }
            });
        };
    }]);