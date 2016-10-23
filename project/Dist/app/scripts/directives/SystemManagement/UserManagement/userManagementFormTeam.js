'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:userManagementFormTeam
 * @description
 * # userManagementFormTeam
 */
angular.module('angularAceAdminApp')
    .directive('userManagementFormTeam', function () {
        return {
            templateUrl: 'template/SystemManagement/UserManagement/userManagementFormTeam.html',
            restrict: 'A',
            scope: {
                teamObject: '=',
                teamList: '='
            },
            replace: true,
            controller: [
                '$scope',
                function ($scope) {
                    $scope.setTeamObj = function (item) {
                        $scope.teamObject = item;
                    };

                    $scope.isSelectObj = function (item) {
                        return item.id == $scope.teamObject.id;
                    };
                }
            ]
        };
    });
