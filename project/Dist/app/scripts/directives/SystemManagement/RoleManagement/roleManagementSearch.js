'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:roleManagementSearch
 * @description
 * # roleManagementSearch
 */
angular.module('angularAceAdminApp')
    .directive('roleManagementSearch', function () {
        return {
            templateUrl: 'template/SystemManagement/RoleManagement/roleManagementSearch.html',
            restrictUrl: 'A',
            scope: {
                queryObject: '=',
                modalViewConf: '=',
                resetQuery: '&',
                updateList: '&'
            },
            controller: [
                '$scope',
                'SystemManagementService',
                'CommonService',
                function ($scope, SystemManagementService, CommonService) {

                    $scope.searchUser = function () {
                        $scope.modalViewConf.show = false;
                        $scope.updateList();
                    };

                }
            ]
        };
    });
