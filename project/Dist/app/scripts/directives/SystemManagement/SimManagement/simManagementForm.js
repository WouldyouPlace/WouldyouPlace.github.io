'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:simManagementForm
 * @description
 * # simManagementForm
 */
angular.module('angularAceAdminApp')
    .directive('simManagementForm', function () {
        return {
            templateUrl: 'template/SystemManagement/SimManagement/simManagementForm.html',
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

                    $scope.verifySimState = false;

                    // SimCode验证状态
                    $scope.verifySimCode = function () {
                        if ($scope.simManagementForm.iSIMCode.$valid) {
                            SystemManagementService.SimManagement_IsUseSIMCode($scope.formObject.iSIMCode).then(function (data) {
                                $scope.verifySimState = data.status;
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
                    $scope.onSimCodeChanged = function () {
                        $scope.verifySimState = false;
                    };


                    $scope.$watch('modalViewConf.show', function (newValue, oldValue) {
                        if (newValue && $scope.formObject.iSIMId) {
                            $scope.verifySimState = true;
                        } else {
                            $scope.verifySimState = false;
                        }
                    }, true);

                    $scope.submitForm = function () {
                        if (verifyForm()) {
                            if (!$scope.formObject.iSIMId) {

                                SystemManagementService.SimManagement_AddSim($filter('SimManagementFilter').SerializationSimFormObject($scope.formObject)).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '添加成功' : '添加失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            } else {
                                SystemManagementService.SimManagement_EditSim($filter('SimManagementFilter').SerializationSimFormObject($scope.formObject)).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '修改成功' : '修改失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            }
                        }
                    };

                    function verifyForm() {
                        return $scope.simManagementForm.$valid && $scope.verifySimState && $scope.formObject.dBuyDate;
                    }

                }
            ]
        };
    });
