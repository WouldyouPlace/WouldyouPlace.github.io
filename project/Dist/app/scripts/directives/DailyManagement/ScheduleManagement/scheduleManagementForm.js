'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:scheduleManagementForm
 * @description
 * # scheduleManagementForm
 */
angular.module('angularAceAdminApp')
    .directive('scheduleManagementForm', function () {
        return {
            templateUrl: 'template/DailyManagement/ScheduleManagement/scheduleManagementForm.html',
            restrict: 'EA',
            scope: {
                formObject: '=',
                modalViewConf: '=',
                updateList: '&'
            },
            controller: [
                '$scope',
                '$filter',
                'DailyManagementService',
                'CommonService',
                function ($scope, $filter, DailyManagementService, CommonService) {
                    $scope.lineList = []; // 线路列表
                    $scope.stationList = []; // 车站列表
                    $scope.queryList = null; // 模糊查询
                    $scope.verifyBusIdResult = false; // 车号验证状态
                    $scope.numberStatusArray = DailyManagementService.ScheduleManagement_GetScheduleStatusArray(); // 路队状态


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
                        DailyManagementService.ScheduleManagement_GetStation($scope.formObject.lineId).then(function (data) {
                            if (data.status) {
                                $scope.stationList = data.obj;
                            } else {
                                CommonService.showMessageModal('车站列表获取失败: \n' + data.errMsg, function () {
                                    $scope.modalViewConf.show = false;
                                });
                            }
                        });
                    };

                    $scope.$watch('modalViewConf.show', function (newValue, oldValue) {
                        if (newValue && $scope.formObject.id) {
                            $scope.onLineChanged();
                        }
                    }, true);

                    // 模糊查询
                    $scope.onQuery = function () {
                        DailyManagementService.ScheduleManagement_GetUserName($scope.formObject.driver).then(function (data) {
                            if (data.status) {
                                $scope.queryList = $filter('scheduleManagementFilter').SerializationScheduleDriverList(data.obj);
                            }
                        });
                    };

                    // 车号验证状态
                    $scope.verifyBusId = function () {
                        DailyManagementService.ScheduleManagement_IsBusIdValid($scope.formObject.busId).then(function (data) {
                            $scope.verifyBusIdResult = data.status;
                        });
                    };

                    $scope.onBusIdChanged = function () {
                        $scope.verifyBusIdResult = false;
                    };

                    $scope.$watch('modalViewConf.show', function (newValue, oldValue) {
                        if (newValue && $scope.formObject.busId) {
                            $scope.verifyBusIdResult = true;
                        }
                    }, true);

                    $scope.submitForm = function () {
                        if (verifyForm()) {
                            if (!$scope.formObject.id) {

                                DailyManagementService.ScheduleManagement_AddSchedule($filter('scheduleManagementFilter').SerializationScheduleFormObject($scope.formObject)).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '添加成功' : '添加失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            } else {
                                DailyManagementService.ScheduleManagement_UpdateSchedule($filter('scheduleManagementFilter').SerializationScheduleFormObject($scope.formObject)).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '修改成功' : '修改失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            }
                        }
                    };

                    function verifyForm() {
                        return $scope.scheduleManagementForm.$valid && $scope.verifyBusIdResult;
                    }

                }
            ]
        };
    });
