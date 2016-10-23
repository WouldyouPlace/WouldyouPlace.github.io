'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:RwBoardManagementCtrl
 * @description
 * # RwBoardManagementCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
  .controller('RwBoardManagementCtrl', [
      '$scope',
      '$filter',
      'DailyManagementService',
      'CommonService',
      'RwBoardList',
      function ($scope, $filter, DailyManagementService, CommonService, RwBoardList) {
          /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           *                          数值初始化
           ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           */
          CommonService.hideMessageModal();
          // 列表数组
          setListVal(RwBoardList);

          initEmptyFormObject();

          // 模态框配置
          $scope.modalViewConf = {
              title: '',
              show: false,
              modalFooterBlock: false
          };
          // 删除模态框
          $scope.modalViewConf_del = {
              title: '删除文件',
              show: false,
              modalFooterBlock: false
          };

          $scope.closeModalView = function () {
              $scope.modalViewConf.show = false;
              $scope.modalViewConf_del.show = false;
              initEmptyFormObject();
          };

          function initEmptyFormObject() {
              $scope.formObject = {
                  iFileType: 2,
                  upLoadFile: ""
              }
          }


          /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           *                          增删改查
           ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           */
          $scope.addItem = function () {
              $scope.modalViewConf.title = '上传文件';
              $scope.modalViewConf.show = true;
          };

          $scope.delItem = function (item) {
              angular.copy(item, $scope.formObject);
              $scope.modalViewConf_del.show = true;
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
                  dataFile: {
                      "iFileType": 2
                  },
                  page: {
                      pageNo: $scope.paginationConf.currentPage,
                      pageSize: $scope.paginationConf.itemsPerPage
                  }
              };
              DailyManagementService.RwBoardAppManagement_AddRwBoardApp(searchVal).then(function (data) {
                  setListVal(data);
              });
          };

          function setListVal(data) {
              if (data.status) {
                  $scope.tableDataList = $filter('MainAppManagementFilter').SerializationAppList(data.obj.result);
                  // 翻页配置
                  $scope.paginationConf = {
                      currentPage: data.obj.pageNo,
                      itemsPerPage: data.obj.pageSize,
                      totalItems: data.obj.totalCount
                  };
              } else {
                  CommonService.showMessageModal('获取读写板程序列表失败: \n' + data.errMsg.toString());
              }
          }

          /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           *                          判断
           ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           */

          $scope.getState = function (item) {
              return item.iIsSync == 0 ? "未同步" : "已同步";
          }


      }
  ]);
