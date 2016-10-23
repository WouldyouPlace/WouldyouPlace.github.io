'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:vehicleChargesQuery
 * @description
 * # vehicleChargesQuery
 */
angular.module('angularAceAdminApp')
    .directive('vehicleChargesQuery', function () {
        return {
            templateUrl: 'template/DailyManagement/VehicleCharges/vehicleChargesQuery.html',
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
