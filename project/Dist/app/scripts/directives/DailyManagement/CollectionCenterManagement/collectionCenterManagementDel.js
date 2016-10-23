'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:collectionCenterManagementDel
 * @description
 * # collectionCenterManagementDel
 */
angular.module('angularAceAdminApp')
    .directive('collectionCenterManagementDel', function () {
        return {
            templateUrl: 'template/DailyManagement/CollectionCenterManagement/collectionCenterManagementDel.html',
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
                        DailyManagementService.CollectionCenterManagement_DelCollection($scope.formObject.cCcId).then(function (data) {
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
