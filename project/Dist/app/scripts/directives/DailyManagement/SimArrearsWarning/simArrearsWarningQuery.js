'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:simArrearsWarningQuery
 * @description
 * # simArrearsWarningQuery
 */
angular.module('angularAceAdminApp')
    .directive('simArrearsWarningQuery', function () {
        return {
            templateUrl: 'template/DailyManagement/SimArrearsWarning/simArrearsWarningQuery.html',
            restrict: 'EA',
            scope: {
                queryObject: '=',
                modalViewConf: '=',
                resetQuery: '&',
                updateList: '&'
            },
            controller: [
                '$scope',
                '$filter',
                'DailyManagementService',
                'CommonService',
                function ($scope, $filter, DailyManagementService, CommonService) {

                    $scope.searchList = function () {
                        $scope.modalViewConf.show = false;
                        $scope.updateList();
                    };
                    
                }
            ]
        };
    });
