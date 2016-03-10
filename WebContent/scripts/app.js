/**
 * 
 */'use strict';
 var app = angular.module('noteapp', ['ui.grid']);

 app.controller('NoteGrid', ['$scope', function ($scope) {

   $scope.myData = [
     {
         "firstName": "Cox",
         "lastName": "Carney",
         "company": "Enormo",
         "employed": true
     },
     {
         "firstName": "Lorraine",
         "lastName": "Wise",
         "company": "Comveyer",
         "employed": false
     },
     {
         "firstName": "Nancy",
         "lastName": "Waters",
         "company": "Fuelton",
         "employed": false
     }
 ];
 }]);
// declare modules
angular.module('Authentication', []);
//angular.module('NoteGrid', []);


 
angular.module('BasicHttpAuthExample', [
    'Authentication',
    'NoteGrid',
    'ngRoute',
    'ngCookies'
])
  
.config(['$routeProvider', function ($routeProvider) {
 
    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'modules/authentication/views/login.html'
        })
  
        .when('/', {
            controller: 'GridController',
            templateUrl: 'modules/home/views/notegrid.html'
        })
  
        .otherwise({ redirectTo: '/login' });
}])
  
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);