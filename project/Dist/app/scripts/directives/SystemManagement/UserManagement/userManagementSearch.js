'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:userManagementSearch
 * @description
 * # userManagementSearch
 */
angular.module('angularAceAdminApp')
    .directive('userManagementSearch', function () {
        return {
            templateUrl: 'template/SystemManagement/UserManagement/userManagementSearch.html',
            restrictUrl: 'A',
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
                    $scope.deptList = [];
                    $scope.teamList = [];
                    $scope.roleList = [];


                    $scope.searchUser = function () {
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

                    // 用户角色名列表
                    SystemManagementService.UserManagement_GetRoleList().then(function (data) {
                        if (data.status) {
                            $scope.roleList = data.obj;
                        } else {
                            CommonService.showMessageModal('用户角色列表取失败: \n' + data.errMsg, function () {
                                $scope.modalViewConf.show = false;
                            });
                        }
                    });
                    
                    
                }
            ]
        };
    });
