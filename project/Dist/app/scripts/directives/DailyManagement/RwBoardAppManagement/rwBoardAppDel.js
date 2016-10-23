'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:rwBoardAppDel
 * @description
 * # rwBoardAppDel
 */
angular.module('angularAceAdminApp')
  .directive('rwBoardAppDel', function () {
    return {
      templateUrl: 'template/DailyManagement/RwBoardAppManagement/rwBoardAppDel.html',
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
                    DailyManagementService.RwBoardAppManagement_DelRwBoardApp({
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
