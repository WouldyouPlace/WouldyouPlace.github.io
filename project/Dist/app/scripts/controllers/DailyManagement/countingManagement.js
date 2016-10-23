'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:CountingManagementCtrl
 * @description
 * # CountingManagementCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
    .controller('CountingManagementCtrl', [
        '$scope',
        '$filter',
        'DailyManagementService',
        'CommonService',
        'CountingList',
        function ($scope, $filter, DailyManagementService, CommonService, CountingList) {
            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          数值初始化
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            CommonService.hideMessageModal();
            // 车站数组
            setListVal(CountingList);

            initEmptyFormObject();

            // 查询条件对象
            $scope.resetQuery = function () {
                $scope.queryObject = {
                    tradeDate: '',
                    dept: '',
                    team: '',
                    recordTime: ''
                };
            };

            $scope.resetQuery();

            // 模态框配置
            $scope.modalViewConf = {
                title: '',
                show: false,
                size: 'large',
                modalFooterBlock: false
            };

            // 详情框配置
            $scope.modalViewConf_detail = {
                title: '点钞详情',
                show: false,
                size: 'large',
                modalFooterBlock: false
            };

            // 删除模态框配置
            $scope.modalViewConf_del = {
                title: '',
                show: false,
                modalFooterBlock: false
            };

            // 查询模态框
            $scope.modalViewConf_query = {
                title: '点钞查询',
                show: false,
                modalFooterBlock: false
            };

            $scope.closeModalView = function () {
                $scope.modalViewConf.show = false;
                $scope.modalViewConf_del.show = false;
                $scope.modalViewConf_query.show = false;
                $scope.modalViewConf_detail.show = false;
                initEmptyFormObject();
            };

            function initEmptyFormObject() {
                $scope.formObject = {
                    recordId: '',
                    busId: '',
                    moneyBagNum: '',
                    tradeDate: '',
                    dept: '',
                    team: '',
                    lineId: '',
                    iLineCode: '',
                    recordTime: '',
                    paperMoney: '',
                    coinMoney: '',
                    fakeMoney: '',
                    validMoney: '',
                    remark: '',
                    distributedList: [{driver: '', money: ''}]
                };
            }

            initEmptyFormObject();

            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          增删改查
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            $scope.addItem = function () {
                $scope.modalViewConf.title = '添加点钞信息';
                $scope.modalViewConf.show = true;
            };

            $scope.editItem = function (item) {
                $scope.modalViewConf.title = '修改点钞信息';
                $scope.formObject = CommonService.cloneObject(item);
                $scope.modalViewConf.show = true;
            };

            $scope.delItem = function (item) {
                $scope.modalViewConf_del.title = '删除点钞信息';
                $scope.formObject = CommonService.cloneObject(item);
                $scope.modalViewConf_del.show = true;
            };

            $scope.detailItem = function (item) {
                $scope.formObject = CommonService.cloneObject(item);
                // DailyManagementService.CountingManagement_GetCountingDetail({recordId: item.recordId}).then(function (data) {
                //     if (data.status) {
                //         $scope.formObject = data.obj;
                //         $scope.modalViewConf_detail.show = true;
                //     } else {
                //         CommonService.showMessageModal('点钞详情获取失败: \n' + data.errMsg);
                //     }
                // });
                $scope.modalViewConf_detail.show = true;
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
                    cashRecords: $filter('countingManagementFilter').SerializationCountingRequestObject($scope.queryObject),
                    page: {
                        pageNo: $scope.paginationConf.currentPage,
                        pageSize: $scope.paginationConf.itemsPerPage
                    }
                };
                DailyManagementService.CountingManagement_GetCountingList(searchVal).then(function (data) {
                    setListVal(data);
                });
            };

            function setListVal(data) {
                if (data.status) {
                    $scope.countingList = $filter('countingManagementFilter').SerializationCountingList(data.obj.result);
                    // 翻页配置
                    $scope.paginationConf = {
                        currentPage: data.obj.pageNo,
                        itemsPerPage: data.obj.pageSize,
                        totalItems: data.obj.totalCount
                    };
                } else {
                    CommonService.showMessageModal('获取公交列表失败: \n' + data.errMsg.toString());
                }
            }


            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          判断
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */


            $scope.bindObj = {};

            $scope.onQuery = function () {
                DailyManagementService.CountingManagement_GetTeamList().then(function (data) {
                    if (data.status) {
                        $scope.teamList = data.obj;
                    } else {
                        CommonService.showMessageModal('查询结果获取失败: \n' + data.errMsg, function () {
                            // $scope.modalViewConf.show = false;
                        });
                    }
                });
            }
        }]
    );
