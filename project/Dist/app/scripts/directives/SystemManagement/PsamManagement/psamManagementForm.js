'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:psamManagementForm
 * @description
 * # psamManagementForm
 */
angular.module('angularAceAdminApp')
    .directive('psamManagementForm', function () {
        return {
            templateUrl: 'template/SystemManagement/PsamManagement/psamManagementForm.html',
            restrict: 'EA',
            scope: {
                formObject: '=',
                modalViewConf: '=',
                updateList: '&'
            },
            controller: [
                '$scope',
                '$filter',
                'SystemManagementService',
                'CommonService',
                function ($scope, $filter, SystemManagementService, CommonService) {

                    $scope.verifyPsamState = false;
                    $scope.stateArray = SystemManagementService.PsamManagement_GetStateArray();

                    // SimCode验证状态
                    $scope.verifySimCode = function () {
                        if ($scope.psamManagementForm.iPSAMCode.$valid) {
                            SystemManagementService.PsamManagement_IsUsePSAMCode($scope.formObject.iPSAMCode).then(function (data) {
                                $scope.verifyPsamState = data.status;
                            });
                        }
                    };

                    // Device列表
                    SystemManagementService.SimManagement_GetDevice().then(function (data) {
                        if (data.status) {
                            $scope.deviceList = data.obj;
                            $scope.deviceList.unshift({name: '无', id: ''});
                        } else {
                            CommonService.showMessageModal('设备列表获取失败: \n' + data.errMsg, function () {
                                $scope.modalViewConf.show = false;
                            });
                        }
                    });


                    // 当输入框改变时重置验证状态
                    $scope.onPsamCodeChanged = function () {
                        $scope.verifyPsamState = false;
                    };


                    $scope.$watch('modalViewConf.show', function (newValue, oldValue) {
                        if(newValue && $scope.formObject.iPSAMId) {
                            $scope.verifyPsamState = true;
                        } else {
                            $scope.verifyPsamState = false;
                        }
                    }, true);

                    $scope.submitForm = function () {
                        if ($scope.verifyForm()) {
                            if (!$scope.formObject.iPSAMId) {

                                SystemManagementService.PsamManagement_AddPasm($filter('PsamManagementFilter').SerializationPsamFormObject($scope.formObject)).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '添加成功' : '添加失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            } else {
                                SystemManagementService.PsamManagement_EditPasm($filter('PsamManagementFilter').SerializationPsamFormObject($scope.formObject)).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '修改成功' : '修改失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            }
                        }
                    };

                    $scope.verifyForm = function () {
                        return $scope.psamManagementForm.$valid && $scope.verifyPsamState && $scope.formObject.dIssueTime;
                    }

                }
            ]
        };
    });
