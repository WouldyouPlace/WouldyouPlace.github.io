'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:departRegressQuery
 * @description
 * # departRegressQuery
 */
angular.module('angularAceAdminApp')
    .directive('departRegressQuery', function () {
        return {
            templateUrl: 'template/DailyManagement/DepartRegress/departRegressQuery.html',
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
