'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:stationManagementForm
 * @description
 * # stationManagementForm
 */
angular.module('angularAceAdminApp')
    .directive('stationManagementForm', function () {
        return {
            templateUrl: 'template/SystemManagement/StationManagement/stationManagementForm.html',
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

                    SystemManagementService.StationManagement_GetRegionList().then(function (data) {
                        if (data.status) {
                            $scope.regionList = data.obj;
                        } else {
                            CommonService.showMessageModal('区域标识列表获取失败: \n' + data.errMsg, function () {
                                $scope.modalViewConf.show = false;
                            });
                        }
                    });

                    $scope.submitForm = function () {
                        if ($scope.stationManagementForm.$valid) {
                            if (!$scope.formObject.id) {

                                SystemManagementService.StationManagement_AddStation($scope.formObject).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '添加成功' : '添加失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            } else {
                                SystemManagementService.StationManagement_EditStation($scope.formObject).then(function (data) {
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
