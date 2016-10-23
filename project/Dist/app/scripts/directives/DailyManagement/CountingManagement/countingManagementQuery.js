'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:countingManagementQuery
 * @description
 * # countingManagementQuery
 */
angular.module('angularAceAdminApp')
    .directive('countingManagementQuery', function () {
        return {
            templateUrl: 'template/DailyManagement/CountingManagement/countingManagementQuery.html',
            restrictUrl: 'EA',
            scope: {
                queryObject: '=',
                modalViewConf: '=',
                resetQuery: '&',
                updateList: '&'
            },
            controller: [
                '$scope',
                'SystemManagementService',
                'DailyManagementService',
                'CommonService',
                function ($scope, SystemManagementService, DailyManagementService, CommonService) {
                    $scope.deptList = [];
                    $scope.teamList = [];


                    $scope.searchList = function () {
                        $scope.modalViewConf.show = false;
                        $scope.updateList();
                    };

                    // 获取部门列表
                    SystemManagementService.UserManagement_GetDeptList().then(function (data) {
                        if (data.status) {
                            $scope.deptList = data.obj;
                        } else {
                            CommonService.showMessageModal('部门列表获取失败: \n' + data.errMsg, function () {
                                $scope.modalViewConf.show = false;
                            });
                        }
                    });
                    // 获取路队列表
                    SystemManagementService.UserManagement_GetTeamList().then(function (data) {
                        if (data.status) {
                            $scope.teamList = data.obj;
                        } else {
                            CommonService.showMessageModal('路队列表获取失败: \n' + data.errMsg, function () {
                                $scope.modalViewConf.show = false;
                            });
                        }
                    });


                }
            ]
        };
    });
