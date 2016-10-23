'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:collectionCenterManagementQuery
 * @description
 * # collectionCenterManagementQuery
 */
angular.module('angularAceAdminApp')
    .directive('collectionCenterManagementQuery', function () {
        return {
            templateUrl: 'template/DailyManagement/CollectionCenterManagement/collectionCenterManagementQuery.html',
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
                    $scope.deptList = []; // 部门列表
                    $scope.teamList = []; // 路队列表


                    // 部门列表
                    DailyManagementService.CollectionCenterManagement_GetDeptTreeList().then(function (data) {
                        if (data.status) {
                            $scope.deptList = data.obj;
                        } else {
                            CommonService.showMessageModal('部门列表获取失败: \n' + data.errMsg, function () {
                                $scope.modalViewConf.show = false;
                            });
                        }
                    });

                    // 路队列表
                    DailyManagementService.CollectionCenterManagement_GetTeamList().then(function (data) {
                        if (data.status) {
                            $scope.teamList = data.obj;
                        } else {
                            CommonService.showMessageModal('路队列表获取失败: \n' + data.errMsg, function () {
                                $scope.modalViewConf.show = false;
                            });
                        }
                    });

                    $scope.searchList = function () {
                        $scope.modalViewConf.show = false;
                        $scope.updateList();
                    };


                }
            ]
        };
    });
