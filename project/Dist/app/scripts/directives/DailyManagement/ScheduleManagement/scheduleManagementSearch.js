'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:scheduleManagementSearch
 * @description
 * # scheduleManagementSearch
 */
angular.module('angularAceAdminApp')
    .directive('scheduleManagementSearch', function () {
        return {
            templateUrl: 'template/DailyManagement/ScheduleManagement/scheduleManagementSearch.html',
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
                    // 线路列表
                    DailyManagementService.ScheduleManagement_GetLine().then(function (data) {
                        if (data.status) {
                            $scope.lineList = data.obj;
                        } else {
                            CommonService.showMessageModal('线路列表获取失败: \n' + data.errMsg, function () {
                                $scope.modalViewConf.show = false;
                            });
                        }
                    });

                    $scope.onLineChanged = function () {

                        // 车站列表
                        DailyManagementService.ScheduleManagement_GetStation($scope.queryObject.lineId).then(function (data) {
                            if (data.status) {
                                $scope.stationList = data.obj;
                            } else {
                                CommonService.showMessageModal('车站列表获取失败: \n' + data.errMsg, function () {
                                    $scope.modalViewConf.show = false;
                                });
                            }
                        });
                    };

                    // 模糊查询
                    $scope.onQuery = function () {
                        DailyManagementService.ScheduleManagement_GetUserName($scope.queryObject.driver).then(function (data) {
                            if (data.status) {
                                $scope.queryList = $filter('scheduleManagementFilter').SerializationScheduleDriverList(data.obj);
                            }
                        });
                    };



                    $scope.searchList = function () {
                        $scope.modalViewConf.show = false;
                        $scope.updateList();
                    };


                }
            ]
        };
    });
