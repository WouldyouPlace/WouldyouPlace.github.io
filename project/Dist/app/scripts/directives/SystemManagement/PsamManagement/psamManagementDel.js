'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:psamManagementDel
 * @description
 * # psamManagementDel
 */
angular.module('angularAceAdminApp')
    .directive('psamManagementDel', function () {
        return {
            templateUrl: 'template/SystemManagement/PsamManagement/psamManagementDel.html',
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
                        SystemManagementService.PsamManagement_DelPasm($scope.formObject.iPSAMId).then(function (data) {
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
