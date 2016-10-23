'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:countingManagementForm
 * @description
 * # countingManagementForm
 */
angular.module('angularAceAdminApp')
    .directive('countingManagementForm', function () {
        return {
            templateUrl: 'template/DailyManagement/CountingManagement/countingManagementForm.html',
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

                    /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                     *                          获取数据
                     ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                     */
                    // 获取部门列表
                    DailyManagementService.CountingManagement_GetOrganizationTree().then(function (data) {
                        if (data.status) {
                            $scope.deptList = data.obj;
                        } else {
                            CommonService.showMessageModal('部门列表获取失败: \n' + data.errMsg, function () {
                                $scope.modalViewConf.show = false;
                            });
                        }
                    });
                    // 获取路队列表
                    DailyManagementService.CountingManagement_GetTeamList().then(function (data) {
                        if (data.status) {
                            $scope.teamList = data.obj;
                            $scope.teamList.unshift({name: '无', id: null});
                        } else {
                            CommonService.showMessageModal('路队列表获取失败: \n' + data.errMsg, function () {
                                $scope.modalViewConf.show = false;
                            });
                        }
                    });

                    $scope.onQuery = function (item) {
                        DailyManagementService.CountingManagement_FindUserByNameCN({nameCN: item.driverName}).then(function (data) {
                            if (data.status) {
                                $scope.driverList = CommonService.cloneObject($filter('countingManagementFilter').SerializationDriverArray(data.obj));
                                // $scope.$apply();
                            } else {
                                CommonService.showMessageModal('驾驶员列表获取失败: \n' + data.errMsg, function () {
                                    $scope.modalViewConf.show = false;
                                });
                            }
                        });
                    };


                    /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                     *                          计算价格
                     ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                     */

                    $scope.getValidMoney = function () {
                        var validMoney = parseInt($scope.formObject.paperMoney ? $scope.formObject.paperMoney : 0) + parseInt($scope.formObject.coinMoney ? $scope.formObject.coinMoney : 0) - parseInt($scope.formObject.fakeMoney ? $scope.formObject.fakeMoney : 0);
                        $scope.formObject.validMoney = validMoney >= 0 ? validMoney : 0;
                    };


                    /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                     *                          提交表单
                     ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                     */

                    $scope.submitForm = function () {
                        if (verifyForm()) {
                            if (!$scope.formObject.recordId) {

                                DailyManagementService.CountingManagement_AddCounting($filter('countingManagementFilter').SerializationCountingFormObject($scope.formObject)).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '添加成功' : '添加失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            } else {
                                DailyManagementService.CountingManagement_EditCounting($filter('countingManagementFilter').SerializationCountingFormObject($scope.formObject)).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '修改成功' : '修改失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            }
                        }
                    };

                    function verifyForm() {
                        return $scope.countingManagementForm.$valid && $scope.formObject.dept;
                    }

                    $scope.verifyMoneyCount = function () {
                        var count = 0;
                        angular.forEach($scope.formObject.distributedList, function (item) {
                            count += parseInt(item.money);
                        });
                        return count == parseInt($scope.formObject.validMoney);
                    };

                    $scope.addDriverItem = function () {
                        $scope.formObject.distributedList.push({driver: '', driverName: '', money: 0});
                    }

                }
            ]
        };
    });
