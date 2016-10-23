'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:CardGrantCtrl
 * @description
 * # CardGrantCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
    .controller('CardGrantCtrl', [
        '$scope',
        '$filter',
        'CommonService',
        'DailyManagementService',
        'CardInfoList',
        function ($scope, $filter, CommonService, DailyManagementService, CardInfoList) {
            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          数值初始化
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            CommonService.hideMessageModal();
            // 卡片列表数组
            setListVal(CardInfoList);

            // 查询条件对象
            $scope.resetQuery = function () {
                $scope.queryObject = {
                    nameCN: '',
                    lineName: '',
                    groupName: '',
                    cardNo: ''
                };
            };

            $scope.resetQuery();

            // 查询模态框
            $scope.modalViewConf_query = {
                title: '查询卡片',
                show: false,
                modalFooterBlock: false
            };

            $scope.closeModalView = function () {
                $scope.modalViewConf_query.show = false;
            };

            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          增删改查
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            $scope.addItem = function (item) {
                var dataObj = {
                    cardNo: "",
                    coreCard: {
                        cardNo: "",
                        cardType: 0
                    },
                    dtTime: $filter('date')(new Date(), "yyyy-MM-dd"),
                    userId: item.userId
                };
                DailyManagementService.CardGrant_AddCard(dataObj).then(function (data) {
                    CommonService.showMessageModal(data.status ? '发卡成功' : '发卡失败: \n' + data.errMsg, function () {
                        $scope.updateList();
                    });
                });
            };

            $scope.searchList = function () {
                $scope.modalViewConf_query.show = true;
            };

            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          设置监听
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            $scope.$watch('paginationConf', function (newValue, oldValue) {
                if (newValue.itemsPerPage != oldValue.itemsPerPage) {
                    $scope.updateList();
                }
            }, true);

            // 更新数组
            $scope.updateList = function () {
                var searchVal = {
                    card: CommonService.cloneObject($scope.queryObject),
                    page: {
                        pageNo: $scope.paginationConf.currentPage,
                        pageSize: $scope.paginationConf.itemsPerPage
                    }
                };
                DailyManagementService.CardGrant_GetCardInfoList(searchVal).then(function (data) {
                    setListVal(data);
                });
            };

            function setListVal(data) {
                if (data.status) {
                    $scope.cardList = data.obj.result;
                    // 翻页配置
                    $scope.paginationConf = {
                        currentPage: data.obj.pageNo,
                        itemsPerPage: data.obj.pageSize,
                        totalItems: data.obj.totalCount
                    };
                } else {
                    CommonService.showMessageModal('获取卡片列表失败: \n' + data.errMsg.toString());
                }
            }

            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          判断
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */



        }]);
