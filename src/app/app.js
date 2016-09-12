'use strict';
// declare modules
var auth = angular.module('Authentication', []);
var home = angular.module('Home', []);

var app = angular.module("qb", ['Authentication', 'Home', 'ngRoute', 'ngCookies']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'app/modules/authentication/views/login.tpl.html'
        })

        .when('/', {
            controller: 'HomeController',
            templateUrl: 'app/modules/home/views/home.tpl.html'
        })

        .otherwise({redirectTo: '/'});
}]).run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/');
            }
        });
    }]);


app.controller('AppCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.title = "App";
    $scope.userName = $rootScope.globals.currentUser ? $rootScope.globals.currentUser.username : "";
}]);

app.controller('HeaderCtrl', ['$scope', '$location', 'AuthenticationService', function ($scope, $location, AuthenticationService) {
    $scope.title = "Header";
    $scope.logoutQb = function () {
        AuthenticationService.ClearCredentials();
        $location.path('/');        // TODO: This doesn't reload the page hence manually refresh after Login/Logout
    };
}]);


