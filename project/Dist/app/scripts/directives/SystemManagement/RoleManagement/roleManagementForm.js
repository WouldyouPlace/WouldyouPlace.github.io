'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:roleManagementForm
 * @description
 * # roleManagementForm
 */
angular.module('angularAceAdminApp')
    .directive('roleManagementForm', function () {
        return {
            templateUrl: 'template/SystemManagement/RoleManagement/roleManagementForm.html',
            restrict: 'A',
            scope: {
                formObject: '=',
                modalViewConf: '=',
                updateList: '&'
            },
            controller: [
                '$scope',
                'SystemManagementService',
                'CommonService',
                function ($scope, SystemManagementService, CommonService) {
                    $scope.stateArray = CommonService.getStateArray();

                    $scope.$watch('modalViewConf', function (newValue, oldValue) {
                        if (newValue.show == true) {
                            if (!$scope.formObject.id) {
                                SystemManagementService.RoleManagement_GetPermissionTree().then(function (data) {
                                    if (data.status) {
                                        $scope.permissionList = data.obj;
                                    } else {
                                        CommonService.showMessageModal('权限列表获取失败: \n' + data.errMsg, function () {
                                            $scope.modalViewConf.show = false;
                                        });
                                    }
                                });
                            } else {
                                SystemManagementService.RoleManagement_GetRoleDetail($scope.formObject.id).then(function (data) {
                                    if (data.status) {
                                        $scope.permissionList = data.obj.privilege;
                                    } else {
                                        CommonService.showMessageModal('权限列表获取失败: \n' + data.errMsg, function () {
                                            $scope.modalViewConf.show = false;
                                        });
                                    }
                                });
                            }
                        }
                    }, true);

                    $scope.submitForm = function () {
                        if ($scope.roleManagementForm.$valid)
                        {
                            if (!$scope.formObject.id) {

                                SystemManagementService.RoleManagement_AddRole($scope.formObject).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '添加成功' : '添加失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            } else {
                                SystemManagementService.RoleManagement_EditRole($scope.formObject).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '修改成功' : '修改失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            }
                        }
                    };

                }
            ]
        };
    });
