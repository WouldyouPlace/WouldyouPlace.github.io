'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:attendanceManagementSearch
 * @description
 * # attendanceManagementSearch
 */
angular.module('angularAceAdminApp')
    .directive('attendanceManagementSearch', function () {
        return {
            templateUrl: 'template/DailyManagement/AttendanceManagement/attendanceManagementSearch.html',
            restrict: 'EA',
            scope: {
                queryObject: '=',
                modalViewConf: '=',
                resetQuery: '&',
                updateList: '&'
            },
            controller: [
                '$scope',
                'SystemManagementService',
                'CommonService',
                function ($scope, SystemManagementService, CommonService) {

                    $scope.searchList = function () {
                        $scope.modalViewConf.show = false;
                        $scope.updateList();
                    };

                }
            ]
        };
    });
