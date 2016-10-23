'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:StationManagementCtrl
 * @description
 * # StationManagementCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
    .controller('StationManagementCtrl', [
        '$scope',
        'SystemManagementService',
        'CommonService',
        'StationList',
        function ($scope, SystemManagementService, CommonService, StationList) {
            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          数值初始化
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            CommonService.hideMessageModal();
            // 车站列表数组
            setListVal(StationList);

            initEmptyFormObject();

            // 查询条件对象
            $scope.resetQuery = function () {
                $scope.queryObject = {
                    name: '',
                    content: '',
                    delFlag: ''
                };
            };

            $scope.resetQuery();

            // 模态框配置
            $scope.modalViewConf = {
                title: '',
                show: false,
                modalFooterBlock: false
            };
            // 删除模态框
            $scope.modalViewConf_del = {
                title: '删除车站',
                show: false,
                modalFooterBlock: false
            };
            // 查询模态框
            $scope.modalViewConf_query = {
                title: '查询车站',
                show: false,
                modalFooterBlock: false
            };
            // 撤销删除模态框
            $scope.modalViewConf_reDel = {
                title: '撤销删除',
                show: false,
                modalFooterBlock: false
            };

            $scope.closeModalView = function () {
                $scope.modalViewConf.show = false;
                // $scope.modalViewConf_query.show = false;
                $scope.modalViewConf_del.show = false;
                $scope.modalViewConf_reDel.show = false;
                initEmptyFormObject();
            };

            function initEmptyFormObject() {
                $scope.formObject = {
                    id: '',
                    regionCode: '',
                    name: '',
                    longitude: '',
                    latitude: '',
                    content: '',
                    delFlag: '',
                    region: {}
                }
            }

            initEmptyFormObject();

            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          增删改查
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            $scope.addStation = function () {
                $scope.modalViewConf.title = '添加车站';
                $scope.modalViewConf.show = true;
            };

            $scope.editStation = function (item) {
                $scope.modalViewConf.title = '修改车站';
                $scope.formObject = CommonService.cloneObject(item);
                $scope.modalViewConf.show = true;
            };

            $scope.delStation = function (item) {
                $scope.formObject = CommonService.cloneObject(item);
                $scope.modalViewConf_del.show = true;
            };

            $scope.reDelStation = function (item) {
                $scope.formObject = CommonService.cloneObject(item);
                $scope.modalViewConf_reDel.show = true;
            };

            $scope.searchStation = function () {
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
                    station: CommonService.cloneObject($scope.queryObject),
                    page: {
                        pageNo: $scope.paginationConf.currentPage,
                        pageSize: $scope.paginationConf.itemsPerPage
                    }
                };
                SystemManagementService.StationManagement_GetStationList(searchVal).then(function (data) {
                    setListVal(data);
                });
            };

            function setListVal(data) {
                if (data.status) {
                    $scope.stationList = data.obj.result;
                    // 翻页配置
                    $scope.paginationConf = {
                        currentPage: data.obj.pageNo,
                        itemsPerPage: data.obj.pageSize,
                        totalItems: data.obj.totalCount
                    };
                } else {
                    CommonService.showMessageModal('获取车站列表失败: \n' + data.errMsg.toString());
                }
            }


            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          判断
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */

            $scope.isStationDel = function (item) {
                return parseInt(item.delFlag) == 0;
            };

            $scope.getStationStatus = function (item) {
                return parseInt(item.delFlag) == 0 ? "已删除" : "可用";
            };


        }
    ]);
