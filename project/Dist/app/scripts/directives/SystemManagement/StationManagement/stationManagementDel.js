'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:stationManagementDel
 * @description
 * # stationManagementDel
 */
angular.module('angularAceAdminApp')
    .directive('stationManagementDel', function () {
        return {
            templateUrl: 'template/SystemManagement/StationManagement/stationManagementDel.html',
            restrict: 'EA',
            scope: {
                formObject: '=',
                modalViewConf: '=',
                updateList: '&'
            },
            controller: [
                '$scope',
                'SystemManagementService',
                'CommonService',
                function ($scope, SystemManagementService, CommonService) {
                    $scope.delete = function () {
                        SystemManagementService.StationManagement_DelStation($scope.formObject.id).then(function (data) {
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
