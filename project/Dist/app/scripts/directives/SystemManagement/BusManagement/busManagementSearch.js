'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:busManagementSearch
 * @description
 * # busManagementSearch
 */
angular.module('angularAceAdminApp')
    .directive('busManagementSearch', function () {
        return {
            templateUrl: 'template/SystemManagement/BusManagement/busManagementSearch.html',
            restrict: 'EA',
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

                    $scope.busTypeList = SystemManagementService.BusManagement_GetBusTypeList();

                    $scope.searchList = function () {
                        $scope.modalViewConf.show = false;
                        $scope.updateList();
                    };

                }
            ]
        };
    });
