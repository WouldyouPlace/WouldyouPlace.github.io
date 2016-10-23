'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:busManagementForm
 * @description
 * # busManagementForm
 */
angular.module('angularAceAdminApp')
    .directive('busManagementForm', function () {
        return {
            templateUrl: 'template/SystemManagement/BusManagement/busManagementForm.html',
            restrict: 'EA',
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

                    $scope.delFlagArray = [
                        {
                            name: '已删除',
                            id: 1
                        },
                        {
                            name: '可用',
                            id: 0
                        }
                    ];

                    $scope.busTypeList = SystemManagementService.BusManagement_GetBusTypeList();

                    $scope.submitForm = function () {
                        if ($scope.busManagementForm.$valid) {
                            if (!$scope.formObject.iBusId) {

                                SystemManagementService.BusManagement_AddBus($scope.formObject).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '添加成功' : '添加失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            } else {
                                SystemManagementService.BusManagement_EditBus($scope.formObject).then(function (data) {
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
