'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:userManagementFormDel
 * @description
 * # userManagementFormDel
 */
angular.module('angularAceAdminApp')
    .directive('userManagementFormDel', function () {
        return {
            templateUrl: 'template/SystemManagement/UserManagement/userManagementFormDel.html',
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
                    $scope.deleteUser = function () {
                        SystemManagementService.UserManagement_DelUser($scope.formObject.OID).then(function (data) {
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
