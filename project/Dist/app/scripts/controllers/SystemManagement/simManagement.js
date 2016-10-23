'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:SimManagementCtrl
 * @description
 * # SimManagementCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
    .controller('SimManagementCtrl', [
        '$scope',
        '$filter',
        'SystemManagementService',
        'CommonService',
        'SimList',
        function ($scope, $filter, SystemManagementService, CommonService, SimList) {
            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          数值初始化
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            CommonService.hideMessageModal();
            // 列表数组
            setListVal(SimList);

            // Device列表
            SystemManagementService.SimManagement_GetDevice().then(function (data) {
                if (data.status) {
                    $scope.deviceList = data.obj;
                    $scope.deviceList.unshift({name: '无', id: ''});
                } else {
                    CommonService.showMessageModal('设备列表获取失败: \n' + data.errMsg, function () {
                        $scope.modalViewConf.show = false;
                    });
                }
            });

            initEmptyFormObject();

            // 查询条件对象
            $scope.resetQuery = function () {
                $scope.queryObject = {
                    dBuyDate: "",
                    iDevId: "",
                    iSIMCode: ""
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
                title: '删除Sim卡',
                show: false,
                modalFooterBlock: false
            };
            // 查询模态框
            $scope.modalViewConf_query = {
                title: '查询Sim卡',
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
                    dBuyDate: "",
                    iDevId: "",
                    iSIMCode: "",
                    iSIMId: ""
                }
            }

            initEmptyFormObject();

            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          增删改查
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            $scope.addItem = function () {
                $scope.modalViewConf.title = '添加Sim卡';
                $scope.modalViewConf.show = true;
            };

            $scope.editItem = function (item) {
                $scope.modalViewConf.title = '修改Sim卡';
                $scope.formObject = CommonService.cloneObject(item);
                $scope.modalViewConf.show = true;
            };

            $scope.delItem = function (item) {
                $scope.formObject = CommonService.cloneObject(item);
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
                    SIMInfo: $filter('SimManagementFilter').SerializationSimQueryObject($scope.queryObject),
                    page: {
                        pageNo: $scope.paginationConf.currentPage,
                        pageSize: $scope.paginationConf.itemsPerPage
                    }
                };
                SystemManagementService.SimManagement_GetSimList(searchVal).then(function (data) {
                    setListVal(data);
                });
            };

            function setListVal(data) {
                if (data.status) {
                    $scope.tableDataList = $filter('SimManagementFilter').SerializationSimList(data.obj.result);
                    // 翻页配置
                    $scope.paginationConf = {
                        currentPage: data.obj.pageNo,
                        itemsPerPage: data.obj.pageSize,
                        totalItems: data.obj.totalCount
                    };
                } else {
                    CommonService.showMessageModal('获取Sim卡列表失败: \n' + data.errMsg.toString());
                }
            }

            $scope.getDeviceName = function (item) {

                return $scope.deviceList && (function (item) {
                    for (var i = 0; i < $scope.deviceList.length; i++) {
                        if ($scope.deviceList[i].id == item.iDevId) {
                            return $scope.deviceList[i].name;
                        }
                    }
                })(item);

            }


        }
    ]);
