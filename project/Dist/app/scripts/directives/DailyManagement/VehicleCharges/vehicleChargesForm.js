'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:vehicleChargesForm
 * @description
 * # vehicleChargesForm
 */
angular.module('angularAceAdminApp')
    .directive('vehicleChargesForm', function () {
        return {
            templateUrl: 'template/DailyManagement/VehicleCharges/vehicleChargesForm.html',
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

                                DailyManagementService.VehicleCharges_AddCharges($filter('VehicleChargesFilter').SerializationChargesFormObject($scope.formObject)).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '添加成功' : '添加失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            } else {
                                DailyManagementService.VehicleCharges_EditCharges($filter('VehicleChargesFilter').SerializationChargesFormObject($scope.formObject)).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '修改成功' : '修改失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            }
                        }
                    };

                    $scope.verifyForm = function () {
                        return $scope.vehicleChargesForm.$valid && $scope.formObject.datetime;
                    }

                }
            ]
        };
    });
