'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:menuTreeDel
 * @description
 * # menuTreeDel
 */
angular.module('angularAceAdminApp')
    .directive('menuTreeDel', function () {
        return {
            templateUrl: 'template/SystemManagement/MenuManagement/menuTreeDel.html',
            restrict: 'A',
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
                    $scope.deleteMenu = function () {
                        SystemManagementService.SystemManagement_DelMenu($scope.formObject.id).then(function (data) {
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
