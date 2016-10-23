'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:aceSelect
 * @description
 * # aceSelect
 */
angular.module('angularAceAdminApp')
    .directive('aceSelect', function () {
        return {
            templateUrl: 'template/frame/select/aceSelect.html',
            restrict: 'A',
            scope: {
                bindObject: '=',
                bindArray: '=',
                keyTitle: '@',
                keyId: '@'
            },
            replace: true,
            controller: [
                '$scope',
                'SystemManagementService',
                'CommonService',
                function ($scope, SystemManagementService, CommonService) {

                    $scope.setBindObj = function (item) {
                        $scope.bindObject = item;
                    };

                    $scope.isSelectObj = function (item) {
                        // return item[$scope.keyId] == $scope.bindObject[$scope.keyId];
                        return $scope.bindObject ? item[$scope.keyId] == $scope.bindObject[$scope.keyId] : false;
                    };
                }
            ]
        };
    });
