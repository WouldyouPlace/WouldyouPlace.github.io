'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:userManagementForm
 * @description
 * # userManagementForm
 */
angular.module('angularAceAdminApp')
    .directive('userManagementForm', function () {
        return {
            templateUrl: 'template/SystemManagement/UserManagement/userManagementForm.html',
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
                            $scope.teamList.unshift({name: '无', id: null});
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
                            CommonService.showMessageModal('用户角色列表获取失败: \n' + data.errMsg, function () {
                                $scope.modalViewConf.show = false;
                            });
                        }
                    });

                    // 用户群组列表
                    SystemManagementService.UserManagement_GetGroupList().then(function (data) {
                        if (data.status) {
                            $scope.groupList = data.obj;
                        } else {
                            CommonService.showMessageModal('用户群组列表获取失败: \n' + data.errMsg, function () {
                                $scope.modalViewConf.show = false;
                            });
                        }
                    });

                    $scope.stateArray = CommonService.getStateArray();

                    // 判断是否显示路队或部门的信息
                    $scope.deptOrTeam = function () {
                        return !($scope.formObject.dept || $scope.formObject.team.id);
                    };

                    // 判断是否显示路队必填项的提示信息
                    $scope.isBelongToTeam = function (item) {
                        return ($scope.formObject.team && $scope.formObject.team.id) && !item;
                    };

                    // 添加车牌号
                    $scope.addCarNumItem = function () {
                        $scope.formObject.carNum.push({num: ''});
                    };

                    // 提交表单
                    $scope.submitForm = function () {
                        if (isFormValid())
                        {
                            var carList = [];
                            // 删除空数组元素
                            angular.forEach($scope.formObject.carNum, function (data, index) {
                                if (data.num) {
                                    // $scope.formObject.carNum.splice(index, 1);
                                    carList.push({carNum: data.num});
                                }
                            });
                            $scope.formObject.carNum = carList;
                            if (!$scope.formObject.OID) {
                                SystemManagementService.UserManagement_AddUser($scope.formObject).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '添加成功' : '添加失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            } else {
                                SystemManagementService.UserManagement_EditUser($scope.formObject).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '修改成功' : '修改失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            }
                        }
                    };

                    // 验证表单是否通过
                    function isFormValid() {
                        return $scope.userManagementForm.$valid && !$scope.deptOrTeam() && $scope.formObject.role.id && ( !$scope.formObject.team.id || ($scope.formObject.license && $scope.formObject.licensingDate && $scope.formObject.carType && $scope.formObject.validBeginDate && $scope.formObject.validYear) );
                    }

                    

                }
            ]
        };
    });
