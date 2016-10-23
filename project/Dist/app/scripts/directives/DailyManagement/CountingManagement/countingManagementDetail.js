'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:countingManagementDetail
 * @description
 * # countingManagementDetail
 */
angular.module('angularAceAdminApp')
    .directive('countingManagementDetail', function () {
        return {
            templateUrl: 'template/DailyManagement/CountingManagement/countingManagementDetail.html',
            restrict: 'EA',
            scope: {
                formObject: '=',
                modalViewConf: '='
            },
            controller: [
                '$scope',
                function ($scope) {


                    /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                     *                          判断
                     ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                     */
                    $scope.getSex = function (item) {
                        return parseInt(item.sex) == 0 ? "男" : "女";
                    };

                    $scope.getUserState = function (item) {
                        return parseInt(item.state) == 1 ? "启用" : "禁用";
                    }
                }
            ]
        };
    });
