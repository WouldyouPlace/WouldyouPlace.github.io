'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:mainAppManagementDel
 * @description
 * # mainAppManagementDel
 */
angular.module('angularAceAdminApp')
    .directive('mainAppManagementDel', function () {
        return {
            templateUrl: 'template/DailyManagement/MainAppManagement/mainAppManagementDel.html',
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
                        DailyManagementService.MainAppManagement_DelMainApp({
                            iDataFileId: $scope.formObject.iDataFileId
                        }).then(function (data) {
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
