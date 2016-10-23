'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:acePagination
 * @description
 * # acePagination
 */
angular.module('angularAceAdminApp')
    .directive('acePagination', function () {
        return {
            templateUrl: 'template/frame/acePagination/acePagination.html',
            restrict: 'EA',
            replace: true,
            scope: {
                'paginationConf': '=',
                'paginationClick': '&'
            },
            controller: [
                '$scope',
                function ($scope) {
                    // 分页数组
                    $scope.pageArray = [];
                    // 总页数
                    setTotalPage();
                    // 分页配置
                    $scope.paginationConf = {
                        currentPage: $scope.paginationConf.currentPage || 1,
                        itemsPerPage: $scope.paginationConf.itemsPerPage || 10,
                        totalItems: $scope.paginationConf.totalItems
                    };

                    // 每页显示条目
                    $scope.itemsPerPageOption = [10, 15, 20, 50, 100];

                    // 点击页码
                    $scope.pageClick = function (page) {
                        $scope.paginationConf.currentPage = page;
                        $scope.paginationClick();
                    };

                    // 上一页
                    $scope.prevPage = function () {
                        
                        if (isCurrentValid($scope.paginationConf.currentPage + 1, null)) {
                            $scope.paginationConf.currentPage--;
                            $scope.paginationClick();
                        }
                    };

                    // 下一页
                    $scope.nextPage = function () {
                        
                        if (isCurrentValid($scope.paginationConf.currentPage - 1, null)) {
                            $scope.paginationConf.currentPage++;
                            $scope.paginationClick();
                        }
                    };

                    $scope.onPageChange = function () {
                        if (isCurrentValid($scope.paginationConf.currentPage, null)) {
                            $scope.paginationClick();
                        }
                    };

                    $scope.$watch('paginationConf', function (newValue, oldValue) {

                        /**
                         * 当显示条目数量改变时, 重新计算并更新总页数, 然后判断当前页码是否合法, 若不合法则将当前的页码重置为最后一页的页数
                         */
                        whenItemsPerPageChange(newValue, oldValue, function (newValue, oldValue) {
                            if (!isCurrentValid(newValue, oldValue)) {
                                $scope.paginationConf.currentPage = $scope.totalPage;
                            }
                        });

                        if (isCurrentValid(newValue, oldValue)) {
                            // 当前结束页码
                            var pageNum = (parseInt(newValue.currentPage / 10) + 1) * 10 - 1 > $scope.totalPage ? $scope.totalPage : (parseInt(newValue.currentPage / 10) + 1) * 10 - 1;
                            // 当前开始页码
                            var index = pageNum - pageNum % 10 < 10 ? 1 : pageNum - pageNum % 10;

                            $scope.pageArray = [];

                            for (; index <= pageNum; index++) {
                                $scope.pageArray.push(index);
                            }
                        } else {
                            newValue.currentPage = oldValue.currentPage;
                        }

                    }, true);

                    /**
                     * 当显示条目数量改变时, 重新计算并更新总页数, 并执行回调函数
                     * @param newValue
                     * @param oldValue
                     * @param callback
                     */
                    function whenItemsPerPageChange(newValue, oldValue, callback) {
                        if (newValue.itemsPerPage != oldValue.itemsPerPage) {
                            setTotalPage();
                            callback(newValue, oldValue);
                        }
                    }

                    /**
                     * 判断页码是否合法
                     * @param newVal
                     * @param oldVal
                     * @returns {boolean}
                     */
                    function isCurrentValid(newVal, oldVal) {
                        return newVal.currentPage >= 1 && newVal.currentPage <= $scope.totalPage;
                    }

                    /**
                     * 更新总页码
                     */
                    function setTotalPage() {
                        // $scope.totalPage = $scope.paginationConf.totalItems % $scope.paginationConf.itemsPerPage > 0 ? parseInt($scope.paginationConf.totalItems / $scope.paginationConf.itemsPerPage) + 1 : ($scope.paginationConf.totalItems / $scope.paginationConf.itemsPerPage);
                        $scope.totalPage = Math.ceil($scope.paginationConf.totalItems / $scope.paginationConf.itemsPerPage);
                    }
                }
            ]
        };
    });
