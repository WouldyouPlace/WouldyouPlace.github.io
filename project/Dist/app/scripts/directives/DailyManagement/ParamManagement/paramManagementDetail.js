'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:paramManagementDetail
 * @description
 * # paramManagementDetail
 */
angular.module('angularAceAdminApp')
    .directive('paramManagementDetail', function () {
        return {
            templateUrl: 'template/DailyManagement/ParamManagement/paramManagementDetail.html',
            restrict: 'EA',
            scope: {
                formObject: '=',
                modalViewConf: '='
            },
            controller: [
                '$scope',
                function ($scope) {


                }
            ]
        };
    });
