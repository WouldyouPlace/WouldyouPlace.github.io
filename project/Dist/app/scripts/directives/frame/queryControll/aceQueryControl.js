'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:aceQueryControl
 * @description
 * # aceQueryControl
 */
angular.module('angularAceAdminApp')
    .directive('aceQueryControl', function () {
        return {
            templateUrl: 'template/frame/queryControl/aceQueryControl.html',
            restrict: 'EA',
            scope: {
                bindObject: '=',
                bindArray: '=',
                keyTitle: '@',
                keyId: '@',
                onQuery: '&'
            },
            replace: true,
            link: function postLink(scope, element, attrs) {
                scope.showMenu = false;
                $(element).find('input').bind('focus', function () {
                    scope.$apply(function () {
                        scope.showMenu = true;
                    });
                });
                $(element).find('input').bind('blur', function () {
                    scope.$apply(function () {
                        scope.showMenu = false;
                    });
                });
            },
            controller: [
                '$scope',
                'SystemManagementService',
                'CommonService',
                function ($scope, SystemManagementService, CommonService) {

                    $scope.setBindObj = function (item) {
                        $scope.bindObject = CommonService.cloneObject(item);
                        $scope.bindArray = null;
                        $scope.showMenu = false;
                    };

                    $scope.$watch($scope.bindArray, function (newVal, oldVal) {
                        console.log(newVal);
                    });

                    $scope.isSelectObj = function (item) {
                        return item[$scope.keyId] == $scope.bindObject[$scope.keyId];
                    };
                }
            ]
        };
    });
