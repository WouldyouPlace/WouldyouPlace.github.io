'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:WhiteListCtrl
 * @description
 * # WhiteListCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
  .controller('WhiteListCtrl', [
      '$scope',
      '$filter',
      'DailyManagementService',
      'CommonService',
      'WhiteList',
      function ($scope, $filter, DailyManagementService, CommonService, WhiteList) {
          /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           *                          数值初始化
           ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           */
          CommonService.hideMessageModal();
          // 列表数组
          setListVal(WhiteList);

          initEmptyFormObject();

          // 删除模态框
          $scope.modalViewConf_del = {
              title: '删除白名单',
              show: false,
              modalFooterBlock: false
          };

          $scope.closeModalView = function () {
              $scope.modalViewConf_del.show = false;
              initEmptyFormObject();
          };

          function initEmptyFormObject() {
              $scope.formObject = {
                  iDataFileId: "",
                  iFileType: "",
                  cFileName: "",
                  cURL: "",
                  dtSync: "",
                  iIsSync: "",
                  cVersion: ""
              }
          }


          /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           *                          增删改查
           ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           */

          $scope.collectionWhiteList = function () {
              DailyManagementService.WhiteList_CollectionWhiteList({
                  "iFileType": 5
              }).then(function (data) {
                  CommonService.showMessageModal(data.status ? '采集成功' : '采集失败: \n' + data.errMsg, function () {
                      $scope.updateList();
                  })
              });
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
                      "iFileType": 5
                  },
                  page: {
                      pageNo: $scope.paginationConf.currentPage,
                      pageSize: $scope.paginationConf.itemsPerPage
                  }
              };
              DailyManagementService.WhiteList_GetWhiteList(searchVal).then(function (data) {
                  setListVal(data);
              });
          };

          function setListVal(data) {
              if (data.status) {
                  $scope.tableDataList = $filter('WhiteListFilter').SerializationWhiteList(data.obj.result);
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

          /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           *                          判断
           ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           */

          $scope.getState = function (item) {
              return item.iIsSync == 0 ? "未同步" : "已同步";
          }


      }
  ]);
