'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:blacklistManagementDel
 * @description
 * # blacklistManagementDel
 */
angular.module('angularAceAdminApp')
    .directive('blacklistManagementDel', function () {
        return {
            templateUrl: 'template/DailyManagement/BlacklistManagement/blacklistManagementDel.html',
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
                        DailyManagementService.BlacklistManagement_DelBlacklist({
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
