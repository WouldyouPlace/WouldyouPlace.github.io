'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:ScheduleManagementCtrl
 * @description
 * # ScheduleManagementCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
    .controller('ScheduleManagementCtrl', [
        '$scope',
        '$filter',
        'DailyManagementService',
        'CommonService',
        'ScheduleList',
        function ($scope, $filter, DailyManagementService, CommonService, ScheduleList) {
            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          数值初始化
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            CommonService.hideMessageModal();
            // 车站列表数组
            setListVal(ScheduleList);

            $scope.scheduleStateList = DailyManagementService.ScheduleManagement_GetScheduleStatusArray();

            initEmptyFormObject();

            // 查询条件对象
            $scope.resetQuery = function () {
                $scope.queryObject = {
                    lineId: '',
                    numberDate: '',
                    busId: '',
                    driver: '',
                    beginStationId: '',
                    endStationId: ''
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
                title: '删除排班',
                show: false,
                modalFooterBlock: false
            };
            // 查询模态框
            $scope.modalViewConf_query = {
                title: '查询排班',
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
                    beginStation: "",
                    beginStationId: "",
                    beginTime: "",
                    busId: "",
                    coreBus: "",
                    coreLine: "",
                    driver: "",
                    endStation: "",
                    endStationId: "",
                    endTime: "",
                    lineId: "",
                    numberDate: "",
                    numberStatus: "",
                    remark: "",
                    steward: ""
                }
            }

            initEmptyFormObject();

            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          增删改查
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            $scope.addItem = function () {
                $scope.modalViewConf.title = '添加排班';
                $scope.modalViewConf.show = true;
            };

            $scope.editItem = function (item) {
                $scope.modalViewConf.title = '修改排班';
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
                    scheduale: $filter('scheduleManagementFilter').SerializationScheduleQueryObject($scope.queryObject),
                    page: {
                        pageNo: $scope.paginationConf.currentPage,
                        pageSize: $scope.paginationConf.itemsPerPage
                    }
                };
                DailyManagementService.ScheduleManagement_GetScheduleList(searchVal).then(function (data) {
                    setListVal(data);
                });
            };

            function setListVal(data) {
                if (data.status) {
                    $scope.tableDataList = $filter('scheduleManagementFilter').SerializationScheduleListData(data.obj.result);
                    // 翻页配置
                    $scope.paginationConf = {
                        currentPage: data.obj.pageNo,
                        itemsPerPage: data.obj.pageSize,
                        totalItems: data.obj.totalCount
                    };
                } else {
                    CommonService.showMessageModal('获取排班列表失败: \n' + data.errMsg.toString());
                }
            }


            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          判断
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */

            $scope.getScheduleStatus = function (item) {
                var returnVal = "";
                for (var i = 0; i < $scope.scheduleStateList.length; i++) {
                    if (item.numberStatus == $scope.scheduleStateList[i].id) {
                        returnVal = $scope.scheduleStateList[i].name;
                        break;
                    }
                }
                return returnVal;
            };


        }
    ]);
