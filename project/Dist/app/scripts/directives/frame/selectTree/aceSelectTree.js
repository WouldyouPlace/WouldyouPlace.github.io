'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:aceSelectTree
 * @description
 * # aceSelectTree
 */
angular.module('angularAceAdminApp')
    .directive('aceSelectTree', function () {
        return {
            templateUrl: 'template/frame/selectTree/aceSelectTree.html',
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

                    /**
                     * 判断是含有子节点
                     * 有返回false, 否则返回true
                     * @param item
                     */
                    $scope.isLeaf = function (item) {
                        return !item.children || !item.children.length;
                    };

                    $scope.setBindObj = function (item) {
                        $scope.bindObject = item;
                    };

                    $scope.isSelectObj = function (item) {
                        return item[$scope.keyId] == $scope.bindObject[$scope.keyId];
                    };
                }
            ]
        };
    });
