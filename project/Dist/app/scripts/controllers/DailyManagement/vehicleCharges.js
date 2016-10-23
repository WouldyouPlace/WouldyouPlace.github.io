'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:VehicleChargesCtrl
 * @description
 * # VehicleChargesCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
    .controller('VehicleChargesCtrl', [
        '$scope',
        '$filter',
        'DailyManagementService',
        'CommonService',
        'VehicleChargesList',
        function ($scope, $filter, DailyManagementService, CommonService, VehicleChargesList) {
            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          数值初始化
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            CommonService.hideMessageModal();
            // 列表数组
            setListVal(VehicleChargesList);


            initEmptyFormObject();

            // 查询条件对象
            $scope.resetQuery = function () {
                $scope.queryObject = {
                    cBusCode: "",
                    registerName: "",
                    datetime: "",
                    operator: ""
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
                title: '删除车辆规费',
                show: false,
                modalFooterBlock: false
            };
            // 查询模态框
            $scope.modalViewConf_query = {
                title: '查询车辆规费',
                show: false,
                modalFooterBlock: false
            };

            $scope.closeModalView = function () {
                $scope.modalViewConf.show = false;
                $scope.modalViewConf_query.show = false;
                $scope.modalViewConf_del.show = false;
                initEmptyFormObject();
            };

            function initEmptyFormObject() {
                $scope.formObject = {
                    id: "",
                    cBusCode: "",
                    registerName: "",
                    datetime: "",
                    address: "",
                    payedMoney: "",
                    totalMoney: "",
                    account: "",
                    remark: "",
                    operator: ""
                }
            }

            initEmptyFormObject();

            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          增删改查
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            $scope.addItem = function () {
                $scope.modalViewConf.title = '添加车辆规费';
                $scope.modalViewConf.show = true;
            };

            $scope.editItem = function (item) {
                $scope.modalViewConf.title = '修改车辆规费';
                angular.copy(item, $scope.formObject);
                $scope.modalViewConf.show = true;
            };

            $scope.delItem = function (item) {
                angular.copy(item, $scope.formObject);
                $scope.modalViewConf_del.show = true;
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
                    charges: $filter('VehicleChargesFilter').SerializationChargesQueryObject($scope.queryObject),
                    page: {
                        pageNo: $scope.paginationConf.currentPage,
                        pageSize: $scope.paginationConf.itemsPerPage
                    }
                };
                DailyManagementService.VehicleCharges_GetChargesList(searchVal).then(function (data) {
                    setListVal(data);
                });
            };

            function setListVal(data) {
                if (data.status) {
                    $scope.tableDataList = $filter('VehicleChargesFilter').SerializationChargesList(data.obj.result);
                    // 翻页配置
                    $scope.paginationConf = {
                        currentPage: data.obj.pageNo,
                        itemsPerPage: data.obj.pageSize,
                        totalItems: data.obj.totalCount
                    };
                } else {
                    CommonService.showMessageModal('获取车辆规费列表失败: \n' + data.errMsg.toString());
                }
            }


        }
    ]);
