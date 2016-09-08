var app = angular.module("qb", ["ngRoute"]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when("/home", {
        templateUrl: "app/home/home.tpl.html",
        controller: "HomeCtrl"
    });

    $routeProvider.otherwise({redirectTo: '/home'});
}]);

app.controller('AppCtrl', ['$scope', function ($scope) {
    $scope.title = "App";
}]);

app.controller('HeaderCtrl', ['$scope', function ($scope) {
    $scope.title = "Header";
}]);