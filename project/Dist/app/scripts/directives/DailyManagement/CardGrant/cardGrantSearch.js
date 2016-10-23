'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:cardGrantSearch
 * @description
 * # cardGrantSearch
 */
angular.module('angularAceAdminApp')
    .directive('cardGrantSearch', function () {
        return {
            templateUrl: 'template/DailyManagement/CardGrant/cardGrantSearch.html',
            restrict: 'EA',
            scope: {
                queryObject: '=',
                modalViewConf: '=',
                resetQuery: '&',
                updateList: '&'
            },
            controller: [
                '$scope',
                'DailyManagementService',
                'CommonService',
                function ($scope, DailyManagementService, CommonService) {

                    DailyManagementService.CardGrant_GetGroupList().then(function (data) {
                        if (data.status) {
                            $scope.groupList = data.obj;
                        } else {
                            CommonService.showMessageModal('群组列表获取失败: \n' + data.errMsg, function () {
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
