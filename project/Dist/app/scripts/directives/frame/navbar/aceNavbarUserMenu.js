'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:aceNavbarUserMenu
 * @description
 * # aceNavbarUserMenu
 */
angular.module('angularAceAdminApp')
  .directive('aceNavbarUserMenu', function () {
    return {
      templateUrl: 'template/frame/navbar/aceNavbarUserMenu.html',
      restrict: 'EA',
      replace: true,
      scope: {
        userInfo: '=',
        changePassword: '&',
        signOut: '&'
      },
      controller: [
        '$scope',
        function ($scope) {
          
        }
      ]
    };
  });
