'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:whiteListDel
 * @description
 * # whiteListDel
 */
angular.module('angularAceAdminApp')
  .directive('whiteListDel', function () {
    return {
      templateUrl: 'template/DailyManagement/WhiteList/whiteListDel.html',
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
                    DailyManagementService.WhiteList_DelWhiteList({
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
