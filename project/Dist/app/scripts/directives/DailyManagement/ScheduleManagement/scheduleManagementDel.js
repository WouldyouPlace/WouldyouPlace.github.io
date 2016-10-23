'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:scheduleManagementDel
 * @description
 * # scheduleManagementDel
 */
angular.module('angularAceAdminApp')
    .directive('scheduleManagementDel', function () {
        return {
            templateUrl: 'template/DailyManagement/ScheduleManagement/scheduleManagementDel.html',
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
                        DailyManagementService.ScheduleManagement_DeleteSchedule($scope.formObject.id).then(function (data) {
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
