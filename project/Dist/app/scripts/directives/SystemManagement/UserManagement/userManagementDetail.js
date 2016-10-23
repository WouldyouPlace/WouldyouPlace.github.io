'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:userManagementDetail
 * @description
 * # userManagementDetail
 */
angular.module('angularAceAdminApp')
    .directive('userManagementDetail', function () {
        return {
            templateUrl: 'template/SystemManagement/UserManagement/userManagementDetail.html',
            restrict: 'A',
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
