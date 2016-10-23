'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:simManagementDel
 * @description
 * # simManagementDel
 */
angular.module('angularAceAdminApp')
    .directive('simManagementDel', function () {
        return {
            templateUrl: 'template/SystemManagement/SimManagement/simManagementDel.html',
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
                    $scope.deleteItem = function () {
                        SystemManagementService.SimManagement_DelSim($scope.formObject.iSIMId).then(function (data) {
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
