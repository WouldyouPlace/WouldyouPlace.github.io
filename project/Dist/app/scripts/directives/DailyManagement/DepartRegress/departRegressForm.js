'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:departRegressForm
 * @description
 * # departRegressForm
 */
angular.module('angularAceAdminApp')
    .directive('departRegressForm', function () {
        return {
            templateUrl: 'template/DailyManagement/DepartRegress/departRegressForm.html',
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

                                DailyManagementService.DepartRegress_AddDepartRegress($filter('departRegressFilter').SerializationDepartRegressFormObject($scope.formObject)).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '添加成功' : '添加失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            } else {
                                DailyManagementService.DepartRegress_EditDepartRegress($filter('departRegressFilter').SerializationDepartRegressFormObject($scope.formObject)).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '修改成功' : '修改失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            }
                        }
                    };

                    $scope.verifyForm = function () {
                        return $scope.departRegressForm.$valid && $scope.formObject.offDateTime && $scope.formObject.backDateTime;
                    }

                }
            ]
        };
    });
