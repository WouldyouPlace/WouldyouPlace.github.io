'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:AttendanceManagementCtrl
 * @description
 * # AttendanceManagementCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
    .controller('AttendanceManagementCtrl', [
        '$scope',
        '$filter',
        'DailyManagementService',
        'CommonService',
        'AttendanceList',
        function ($scope, $filter, DailyManagementService, CommonService, AttendanceList) {
            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          数值初始化
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            CommonService.hideMessageModal();
            // 车站列表数组
            setListVal(AttendanceList);

            // 查询条件对象
            $scope.resetQuery = function () {
                $scope.queryObject = {
                    line: '',
                    dtTime: '',
                    name: ''
                };
            };

            $scope.resetQuery();

            // 查询模态框
            $scope.modalViewConf_query = {
                title: '查询考勤',
                show: false,
                modalFooterBlock: false
            };

            $scope.closeModalView = function () {
                $scope.modalViewConf.show = false;
                $scope.modalViewConf_query.show = false;
            };


            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          增删改查
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */

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
                    attendance: $filter('attendanceManagementFilter').SerializationSearchObject($scope.queryObject),
                    page: {
                        pageNo: $scope.paginationConf.currentPage,
                        pageSize: $scope.paginationConf.itemsPerPage
                    }
                };
                DailyManagementService.AttendanceManagement_GetAttendanceList(searchVal).then(function (data) {
                    setListVal(data);
                });
            };

            function setListVal(data) {
                if (data.status) {
                    $scope.attendanceList = data.obj.result;
                    // 翻页配置
                    $scope.paginationConf = {
                        currentPage: data.obj.pageNo,
                        itemsPerPage: data.obj.pageSize,
                        totalItems: data.obj.totalCount
                    };
                } else {
                    CommonService.showMessageModal('考勤列表获取失败: \n' + data.errMsg.toString());
                }
            }


        }
    ]);
