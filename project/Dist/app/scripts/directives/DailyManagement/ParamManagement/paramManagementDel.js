'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:paramManagementDel
 * @description
 * # paramManagementDel
 */
angular.module('angularAceAdminApp')
    .directive('paramManagementDel', function () {
        return {
            templateUrl: 'template/DailyManagement/ParamManagement/paramManagementDel.html',
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
                        DailyManagementService.ParamManagement_DelParam({
                            id: $scope.formObject.id
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
