'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:countingManagementDel
 * @description
 * # countingManagementDel
 */
angular.module('angularAceAdminApp')
    .directive('countingManagementDel', function () {
        return {
            templateUrl: 'template/DailyManagement/CountingManagement/countingManagementDel.html',
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
                        DailyManagementService.CountingManagement_DelCounting({
                                recordId: $scope.formObject.recordId
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
