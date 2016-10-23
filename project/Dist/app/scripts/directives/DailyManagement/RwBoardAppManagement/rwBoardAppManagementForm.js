'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:rwBoardAppManagementForm
 * @description
 * # rwBoardAppManagementForm
 */
angular.module('angularAceAdminApp')
    .directive('rwBoardAppManagementForm', function () {
        return {
            templateUrl: 'template/DailyManagement/RwBoardAppManagement/rwBoardAppManagementForm.html',
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

                            DailyManagementService.RwBoardAppManagement_AddRwBoardApp($scope.formObject).then(function (data) {
                                CommonService.showMessageModal(data.status ? '上传成功' : '上传失败: \n' + data.errMsg, function () {
                                    $scope.updateList();
                                    $scope.modalViewConf.show = false;
                                })
                            });

                        }
                    };

                    $scope.verifyForm = function () {
                        return $scope.rwBoardAppManagementForm.$valid && $scope.formObject.upLoadFile;
                    }

                }
            ]
        };
    });
