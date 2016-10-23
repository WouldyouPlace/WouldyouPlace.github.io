'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:CollectionCenterManagementCtrl
 * @description
 * # CollectionCenterManagementCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
    .controller('CollectionCenterManagementCtrl', [
        '$scope',
        '$filter',
        'DailyManagementService',
        'CommonService',
        'CollectionList',
        function ($scope, $filter, DailyManagementService, CommonService, CollectionList) {
            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          数值初始化
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            CommonService.hideMessageModal();
            // 列表数组
            setListVal(CollectionList);

            $scope.scheduleStateList = DailyManagementService.ScheduleManagement_GetScheduleStatusArray();

            initEmptyFormObject();

            // 查询条件对象
            $scope.resetQuery = function () {
                $scope.queryObject = {
                    cCcName: "",
                    dept: "",
                    teamOID : "",
                    lineId: "",
                    phone: "",
                    centerIP: ""
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
                title: '删除采集点',
                show: false,
                modalFooterBlock: false
            };
            // 查询模态框
            $scope.modalViewConf_query = {
                title: '查询采集点',
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
                    cCcId: "",
                    cCcName: "",
                    centerIP: "",
                    comment: "",
                    describe: "",
                    address: "",
                    dept: "",
                    deptOID: "",
                    line: "",
                    lineName: "",
                    phone: "",
                    team: "",
                    teamOID: ""
                }
            }

            initEmptyFormObject();

            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          增删改查
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            $scope.addItem = function () {
                $scope.modalViewConf.title = '添加采集点';
                $scope.modalViewConf.show = true;
            };

            $scope.editItem = function (item) {
                $scope.modalViewConf.title = '修改采集点';
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
                    collection: $filter('CollectionFilter').SerializationCollectionQueryObject($scope.queryObject),
                    page: {
                        pageNo: $scope.paginationConf.currentPage,
                        pageSize: $scope.paginationConf.itemsPerPage
                    }
                };
                DailyManagementService.CollectionCenterManagement_GetCollectionList(searchVal).then(function (data) {
                    setListVal(data);
                });
            };

            function setListVal(data) {
                if (data.status) {
                    $scope.tableDataList = $filter('CollectionFilter').SerializationCollectionList(data.obj.result);
                    // 翻页配置
                    $scope.paginationConf = {
                        currentPage: data.obj.pageNo,
                        itemsPerPage: data.obj.pageSize,
                        totalItems: data.obj.totalCount
                    };
                } else {
                    CommonService.showMessageModal('获取采集点列表失败: \n' + data.errMsg.toString());
                }
            }


        }
    ]);
