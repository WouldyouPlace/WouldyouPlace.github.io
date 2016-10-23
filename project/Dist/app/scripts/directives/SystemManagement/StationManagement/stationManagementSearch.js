'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:stationManagementSearch
 * @description
 * # stationManagementSearch
 */
angular.module('angularAceAdminApp')
    .directive('stationManagementSearch', function () {
        return {
            templateUrl: 'template/SystemManagement/StationManagement/stationManagementSearch.html',
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

                    $scope.delFlagArray = [
                        {
                            name: '已删除',
                            id: 0
                        },
                        {
                            name: '可用',
                            id: 1
                        }
                    ];

                    $scope.searchStation = function () {
                        $scope.modalViewConf.show = false;
                        $scope.updateList();
                    };

                }
            ]
        };
    });
