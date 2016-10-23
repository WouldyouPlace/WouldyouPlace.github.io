'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:psamManagementQuery
 * @description
 * # psamManagementQuery
 */
angular.module('angularAceAdminApp')
    .directive('psamManagementQuery', function () {
        return {
            templateUrl: 'template/SystemManagement/PsamManagement/psamManagementQuery.html',
            restrict: 'EA',
            scope: {
                queryObject: '=',
                modalViewConf: '=',
                resetQuery: '&',
                updateList: '&'
            },
            controller: [
                '$scope',
                '$filter',
                'SystemManagementService',
                'CommonService',
                function ($scope, $filter, SystemManagementService, CommonService) {

                    $scope.stateArray = SystemManagementService.PsamManagement_GetStateArray();

                    // Device列表
                    SystemManagementService.SimManagement_GetDevice().then(function (data) {
                        if (data.status) {
                            $scope.deviceList = data.obj;
                            $scope.deviceList.unshift({name: '无', id: ''});
                        } else {
                            CommonService.showMessageModal('设备列表获取失败: \n' + data.errMsg, function () {
                                $scope.modalViewConf.show = false;
                            });
                        }
                    });

                    $scope.searchList = function () {
                        $scope.modalViewConf.show = false;
                        $scope.updateList();
                    };

                }
            ]
        };
    });
