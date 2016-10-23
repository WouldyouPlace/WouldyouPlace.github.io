'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:paramManagementForm
 * @description
 * # paramManagementForm
 */
angular.module('angularAceAdminApp')
    .directive('paramManagementForm', function () {
        return {
            templateUrl: 'template/DailyManagement/ParamManagement/paramManagementForm.html',
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

                    $scope.submitForm = function () {
                        if ($scope.verifyForm()) {
                            if (!$scope.formObject.id) {

                                DailyManagementService.ParamManagement_AddParam({iniParam: $scope.formObject}).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '添加成功' : '添加失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            } else {
                                DailyManagementService.ParamManagement_EditParam({iniParam: $scope.formObject}).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '修改成功' : '修改失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            }
                        }
                    };

                    $scope.verifyForm = function () {
                        return $scope.paramManagementForm.$valid;
                    }

                }
            ]
        };
    });
