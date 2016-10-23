'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:BusManagementCtrl
 * @description
 * # BusManagementCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
    .controller('BusManagementCtrl', [
        '$scope',
        'SystemManagementService',
        'CommonService',
        'BusList',
        function ($scope, SystemManagementService, CommonService, BusList) {
            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          数值初始化
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            CommonService.hideMessageModal();
            // 车站列表数组
            setListVal(BusList);

            initEmptyFormObject();

            // 查询条件对象
            $scope.resetQuery = function () {
                $scope.queryObject = {
                    cBusCode: '',
                    iBusType: '',
                    iLineCode: ''
                };
            };

            $scope.resetQuery();

            // 模态框配置
            $scope.modalViewConf = {
                title: '',
                show: false,
                modalFooterBlock: false
            };
            // 查询模态框
            $scope.modalViewConf_query = {
                title: '查询车站',
                show: false,
                modalFooterBlock: false
            };

            $scope.closeModalView = function () {
                $scope.modalViewConf.show = false;
                $scope.modalViewConf_query.show = false;
                initEmptyFormObject();
            };

            function initEmptyFormObject() {
                $scope.formObject = {
                    id: '',
                    iBusId: '',
                    cBusCode: '',
                    iRegionCode: '',
                    cOrgCode: '',
                    iLineCode: '',
                    iBusType: '',
                    iDelFlag: ''
                };
            }

            initEmptyFormObject();

            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          增删改查
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            $scope.addItem = function () {
                $scope.modalViewConf.title = '添加公交车信息';
                $scope.modalViewConf.show = true;
            };

            $scope.editItem = function (item) {
                $scope.modalViewConf.title = '修改公交车信息';
                $scope.formObject = CommonService.cloneObject(item);
                $scope.modalViewConf.show = true;
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

            // 更新车站数组
            $scope.updateList = function () {
                var searchVal = {
                    bus: CommonService.cloneObject($scope.queryObject),
                    page: {
                        pageNo: $scope.paginationConf.currentPage,
                        pageSize: $scope.paginationConf.itemsPerPage
                    }
                };
                SystemManagementService.BusManagement_GetBusList(searchVal).then(function (data) {
                    setListVal(data);
                });
            };

            function setListVal(data) {
                if (data.status) {
                    $scope.busList = data.obj.result;
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

            $scope.isBusDel = function (item) {
                return parseInt(item.iDelFlag) == 0;
            };

            $scope.getBusStatus = function (item) {
                return parseInt(item.iDelFlag) == 1 ? "已删除" : "可用";
            };

            $scope.getBusType = function (item) {
                var returnVal = '';
                switch (item.iBusType) {
                    case 1:
                        returnVal = '普通';
                        break;
                    case 2:
                        returnVal = '有轨电车';
                        break;
                    case 3:
                        returnVal = '无轨电车';
                        break;
                    case 4:
                        returnVal = '天然气';
                        break;
                    case 5:
                        returnVal = '电动';
                        break;
                    case 6:
                        returnVal = '混合动力';
                        break;
                }
                return returnVal;
            }


        }
    ]);
