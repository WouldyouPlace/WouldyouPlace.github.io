'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:userManagementFormRole
 * @description
 * # userManagementFormRole
 */
angular.module('angularAceAdminApp')
    .directive('userManagementFormRole', function () {
        return {
            templateUrl: 'template/SystemManagement/UserManagement/userManagementFormRole.html',
            restrict: 'A',
            scope: {
                roleObject: '=',
                roleList: '='
            },
            replace: true,
            controller: [
                '$scope',
                function ($scope) {
                    $scope.setRoleObj = function (item) {
                        $scope.roleObject = item;
                    };

                    $scope.isSelectObj = function (item) {
                        return item.roleId == $scope.roleObject.roleId;
                    };
                }
            ]
        };
    });
