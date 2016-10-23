'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:userManagementFormDeptTree
 * @description
 * # userManagementFormDeptTree
 */
angular.module('angularAceAdminApp')
    .directive('userManagementFormDeptTree', function () {
        return {
            templateUrl: 'template/SystemManagement/UserManagement/userManagementFormDeptTree.html',
            restrict: 'A',
            scope: {
                deptObject: '=',
                deptTree: '='
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

                    $scope.setDeptObj = function (item) {
                        $scope.deptObject = item;
                    };

                    $scope.isSelectObj = function (item) {
                        return item.id == $scope.deptObject.id;
                    };
                }
            ]
        };
    });
