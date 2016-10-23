'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:roleManagementFormDel
 * @description
 * # roleManagementFormDel
 */
angular.module('angularAceAdminApp')
  .directive('roleManagementFormDel', function () {
    return {
      templateUrl: 'template/SystemManagement/RoleManagement/roleManagementFormDel.html',
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
                $scope.deleteRole = function () {
                    SystemManagementService.RoleManagement_DelRole($scope.formObject.id).then(function (data) {
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
