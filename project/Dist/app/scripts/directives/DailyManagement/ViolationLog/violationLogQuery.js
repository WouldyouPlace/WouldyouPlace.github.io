'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:violationLogQuery
 * @description
 * # violationLogQuery
 */
angular.module('angularAceAdminApp')
    .directive('violationLogQuery', function () {
        return {
            templateUrl: 'template/DailyManagement/ViolationLog/violationLogQuery.html',
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
