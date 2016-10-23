'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:mainAppManagementForm
 * @description
 * # mainAppManagementForm
 */
angular.module('angularAceAdminApp')
    .directive('mainAppManagementForm', function () {
        return {
            templateUrl: 'template/DailyManagement/MainAppManagement/mainAppManagementForm.html',
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
                            
                                DailyManagementService.MainAppManagement_AddMainApp($scope.formObject).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '上传成功' : '上传失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                           
                        }
                    };

                    $scope.verifyForm = function () {
                        return $scope.mainAppManagementForm.$valid && $scope.formObject.upLoadFile;
                    }

                }
            ]
        };
    });
