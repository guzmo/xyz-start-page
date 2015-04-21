var xyz = angular.module('xyz', ['ngResource']);

var apiUrl = 'http://localhost:9000/';

xyz.factory('Modules', function ($resource, $http) {
    if (typeof(apiUrl) != "undefined") return $resource(apiUrl+'modules', {});
    return $resource('modules', {});
});

xyz.controller('XYZController', function ($scope, Modules) {

    $scope.modules = Modules.query();

    $scope.getMyCtrlScope = function() {
        return $scope;
    };

    $scope.getModules = function() {
        return $scope.modules;
    };



})
