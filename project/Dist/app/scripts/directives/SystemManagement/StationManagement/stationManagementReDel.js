'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:stationManagementReDel
 * @description
 * # stationManagementReDel
 */
angular.module('angularAceAdminApp')
    .directive('stationManagementReDel', function () {
        return {
            templateUrl: 'template/SystemManagement/StationManagement/stationManagementReDel.html',
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
                    $scope.reDelete = function () {
                        SystemManagementService.StationManagement_ReDelStation($scope.formObject.id).then(function (data) {
                            CommonService.showMessageModal(data.status ? '撤销删除成功' : '撤销删除失败: ' + data.errMsg.toString(), function () {
                                $scope.modalViewConf.show = false;
                                $scope.updateList();
                            });
                        });
                    }
                }
            ]
        };
    });
