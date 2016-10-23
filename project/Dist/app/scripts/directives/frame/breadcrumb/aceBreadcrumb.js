'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:aceBreadcrumb
 * @description
 * # aceBreadcrumb
 */
angular.module('angularAceAdminApp')
  .directive('aceBreadcrumb', function () {
    return {
      templateUrl: 'template/frame/breadcrumb/aceBreadcrumb.html',
      restrict: 'EA',
      replace: true,
      controller: [
        '$scope',
        function ($scope) {
          $scope.breadcrumbsArray = [];

          $scope.$on('updateNavStatus', function (event, treeViewList) {
            $scope.breadcrumbsArray = [];
            getBreadcrumbs(treeViewList);
            $scope.breadcrumbsArray.reverse();
            $scope.$broadcast('updatePageHeaderTitle', $scope.breadcrumbsArray[$scope.breadcrumbsArray.length - 1]);
          });

          /**
           * 判断是含有子节点
           * 有返回false, 否则返回true
           * @param item
           */
          function isLeaf(item) {
            return !item.children || !item.children.length;
          }

          /**
           * 遍历数据并组装 breadcrumbs
           * @param arrayList
           */
          function getBreadcrumbs(arrayList) {
            for (var i = 0; i < arrayList.length; i++) {
              if (!isLeaf(arrayList[i]) && getBreadcrumbs(arrayList[i].children)) {
                return true;
              } else if (arrayList[i].activeStatus || $scope.breadcrumbsArray.length != 0) {
                $scope.breadcrumbsArray[$scope.breadcrumbsArray.length] = arrayList[i];
                return false;
              }
            }
          }

        }
      ]
    };
  });
