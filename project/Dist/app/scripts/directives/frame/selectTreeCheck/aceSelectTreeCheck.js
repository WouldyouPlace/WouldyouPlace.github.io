'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:aceSelectTreeCheck
 * @description
 * # aceSelectTreeCheck
 */
angular.module('angularAceAdminApp')
    .directive('aceSelectTreeCheck', function () {
        return {
            templateUrl: 'template/frame/selectTreeCheck/aceSelectTreeCheck.html',
            restrict: 'A',
            scope: {
                bindArray: '=',
                checkedArray: '=',
                keyTitle: '@',
                keyId: '@',
                keyCheck: '@'
            },
            replace: true,
            link: function postLink(scope, element, attrs) {

            },
            controller: [
                '$scope',
                'SystemManagementService',
                'CommonService',
                function ($scope, SystemManagementService, CommonService) {


                    /**
                     * 判断是含有子节点
                     * 有返回false, 否则返回true
                     * @param item
                     */
                    $scope.isLeaf = function (item) {
                        return !item.children || !item.children.length;
                    };

                    $scope.setBindObj = function (item) {
                        $scope.bindObject = item;
                    };

                    $scope.isSelectObj = function (item) {
                        return item[$scope.keyId] == $scope.bindObject[$scope.keyId];
                    };

                    $scope.checkObj = function () {
                        // $scope.checkedArray = [];
                        $('.menu-item-title').bind("click", function (event) {
                            event.stopPropagation();
                        });
                        // getCheckedIds($scope.bindArray);
                    };

                    function getCheckedIds(item) {
                        angular.forEach(item, function (itemData) {
                            if (itemData[$scope.keyCheck]) {
                                $scope.checkedArray.push(itemData[$scope.keyId]);
                            }
                            if (itemData.children) {
                                getCheckedIds(itemData.children);
                            }
                        })
                    }

                    $scope.$watch('bindArray', function (newValue, oldValue) {
                        if (newValue != oldValue) {
                            $scope.checkedArray = [];
                            getCheckedIds($scope.bindArray);
                        }
                    }, true);
                }
            ]
        };
    });
