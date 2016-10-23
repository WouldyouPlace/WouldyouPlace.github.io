'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:violationLogForm
 * @description
 * # violationLogForm
 */
angular.module('angularAceAdminApp')
    .directive('violationLogForm', function () {
        return {
            templateUrl: 'template/DailyManagement/ViolationLog/violationLogForm.html',
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
                        if (verifyForm()) {
                            if (!$scope.formObject.id) {

                                DailyManagementService.ViolationLog_AddViolation($filter('violationFilter').SerializationViolationFormObject($scope.formObject)).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '添加成功' : '添加失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            } else {
                                DailyManagementService.ViolationLog_EditViolation($filter('violationFilter').SerializationViolationFormObject($scope.formObject)).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '修改成功' : '修改失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            }
                        }
                    };

                    function verifyForm() {
                        return $scope.violationForm.$valid && $scope.formObject.violationDate;
                    }

                }
            ]
        };
    });
