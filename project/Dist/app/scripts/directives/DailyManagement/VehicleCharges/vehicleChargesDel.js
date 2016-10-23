'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:vehicleChargesDel
 * @description
 * # vehicleChargesDel
 */
angular.module('angularAceAdminApp')
    .directive('vehicleChargesDel', function () {
        return {
            templateUrl: 'template/DailyManagement/VehicleCharges/vehicleChargesDel.html',
            restrict: 'EA',
            scope: {
                formObject: '=',
                modalViewConf: '=',
                updateList: '&'
            },
            controller: [
                '$scope',
                'DailyManagementService',
                'CommonService',
                function ($scope, DailyManagementService, CommonService) {
                    $scope.deleteItem = function () {
                        DailyManagementService.VehicleCharges_DelCharges($scope.formObject.id).then(function (data) {
                            CommonService.showMessageModal(data.status ? '删除成功' : '删除失败: ' + data.errMsg.toString(), function () {
                                $scope.modalViewConf.show = false;
                                $scope.updateList();
                            });
                        });
                    }
                }
            ]
        };
    });
