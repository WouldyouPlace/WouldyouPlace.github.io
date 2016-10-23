'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:SimArrearsWarningCtrl
 * @description
 * # SimArrearsWarningCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
  .controller('SimArrearsWarningCtrl', [
      '$scope',
      '$filter',
      'DailyManagementService',
      'CommonService',
      'WarningList',
      function ($scope, $filter, DailyManagementService, CommonService, WarningList) {
          /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           *                          数值初始化
           ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           */
          CommonService.hideMessageModal();
          // 列表数组
          setListVal(WarningList);

          // 查询条件对象
          $scope.resetQuery = function () {
              $scope.queryObject = {
                  simCode: '',
                  devCode: '',
                  lineCode: '',
                  busCode: ''
              };
          };

          $scope.resetQuery();


          // 查询模态框
          $scope.modalViewConf_query = {
              title: '查询警报',
              show: false,
              modalFooterBlock: false
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
                  warning: CommonService.cloneObject($scope.queryObject),
                  page: {
                      pageNo: $scope.paginationConf.currentPage,
                      pageSize: $scope.paginationConf.itemsPerPage
                  }
              };
              DailyManagementService.SimArrearsWarning_GetWarningList(searchVal).then(function (data) {
                  setListVal(data);
              });
          };

          function setListVal(data) {
              if (data.status) {
                  $scope.warningList = data.obj.result;
                  // 翻页配置
                  $scope.paginationConf = {
                      currentPage: data.obj.pageNo,
                      itemsPerPage: data.obj.pageSize,
                      totalItems: data.obj.totalCount
                  };
              } else {
                  CommonService.showMessageModal('获取Sim卡欠费报警列表失败: \n' + data.errMsg.toString());
              }
          }




      }
  ]);
