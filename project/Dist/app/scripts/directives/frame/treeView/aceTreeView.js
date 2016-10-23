'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:aceTreeView
 * @description
 * # aceTreeView
 */
angular.module('angularAceAdminApp')
  .directive('aceTreeView', function () {
    return {
      templateUrl: 'template/frame/treeView/aceTreeView.html',
      restrict: 'EA',
      replace: true,
      scope: {
        'treeViewList': '='
      },
      link: [
        'scope',
        'element',
        'attrs',
        function (scope, element, attrs) {

        }],
      controller: [
        '$scope',
        '$rootScope',
        function ($scope, $rootScope) {


          /**
           * 判断是含有子节点
           * 有返回false, 否则返回true
           * @param item
           */
          $scope.isLeaf = function (item) {
            return !item.children || !item.children.length;
          };

          /**
           * 设置选中状态
           * 将选中项的 activeStatus 设置为 true, 其他所有项的 activeStatus 设置为 false
           * @param item
           */
          $scope.goItemPage = function (item) {
            if ($scope.isLeaf(item)) {
              setAllActiveStatusFalse($scope.treeViewList);
              item.activeStatus = true;
              $rootScope.$broadcast('updateNavStatus', $scope.treeViewList);
            }
          };

          /**
           * 将数组中所有的 activeStatus 设置为false
           * 判断是否存在子节点, 如果存在则递归调用自身, 参数为子节点
           * 若不存在子节点, 则将自身的 activeStatus 设置为false
           * @param arrayList
           */
          function setAllActiveStatusFalse(arrayList) {
            angular.forEach(arrayList, function (item) {
              if (!$scope.isLeaf(item)) {
                setAllActiveStatusFalse(item.children);
              } else {
                item.activeStatus = false;
              }
            });
          }

          setAllActiveStatusFalse($scope.treeViewList);
        }
      ]
    };
  });
