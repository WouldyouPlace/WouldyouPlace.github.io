'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:OrganizationManagementCtrl
 * @description
 * # OrganizationManagementCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
    .controller('OrganizationManagementCtrl', [
        '$scope',
        'SystemManagementService',
        'CommonService',
        function ($scope, SystemManagementService, CommonService) {
            $scope.checkedStatus = false;
                $scope.toggleCheckStatus = function () {
                        $scope.checkedStatus = !$scope.checkedStatus;
                }
        }
    ]);
