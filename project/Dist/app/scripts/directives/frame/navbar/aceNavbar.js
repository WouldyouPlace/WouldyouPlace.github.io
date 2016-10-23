'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:aceNavbar
 * @description
 * # aceNavbar
 */
angular.module('angularAceAdminApp')
  .directive('aceNavbar', function () {
    return {
      templateUrl: 'template/frame/navbar/aceNavbar.html',
      restrict: 'EA',
      scope: {
        navbarInfo: '=',
        userInfo: '=',
        changePassword: '&',
        signOut: '&'
      },
      controller: [
        '$scope',
        function ($scope) {
          $scope.isShowIcon = function () {
            return $scope.navbarInfo.icon ? true : false;
          };
        }
      ]
    };
  });
