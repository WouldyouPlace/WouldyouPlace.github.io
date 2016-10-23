'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:DepartRegressCtrl
 * @description
 * # DepartRegressCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
  .controller('DepartRegressCtrl', [
      '$scope',
      '$filter',
      'DailyManagementService',
      'CommonService',
      'DepartRegressList',
      function ($scope, $filter, DailyManagementService, CommonService, DepartRegressList) {
          /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           *                          数值初始化
           ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           */
          CommonService.hideMessageModal();
          // 列表数组
          setListVal(DepartRegressList);

          initEmptyFormObject();

          // 查询条件对象
          $scope.resetQuery = function () {
              $scope.queryObject = {
                  cBusCode: "",
                  driverId: "",
                  steward: "",
                  offDateTime: "",
                  backDateTime: "",
                  remark: "",
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
          // 查询模态框
          $scope.modalViewConf_query = {
              title: '查询出场回场记录',
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
                  id: "",
                  cBusCode: "",
                  driverId: "",
                  steward: "",
                  offDateTime: "",
                  station: "",
                  money: "",
                  mileage: "",
                  backDateTime: "",
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
              $scope.modalViewConf.title = '添加出场回场记录';
              $scope.modalViewConf.show = true;
          };

          $scope.editItem = function (item) {
              $scope.modalViewConf.title = '修改出场回场记录';
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

          // 更新数组
          $scope.updateList = function () {
              var searchVal = {
                  departRegress: $filter('departRegressFilter').SerializationDepartRegressQueryObject($scope.queryObject),
                  page: {
                      pageNo: $scope.paginationConf.currentPage,
                      pageSize: $scope.paginationConf.itemsPerPage
                  }
              };
              DailyManagementService.DepartRegress_GetDepartRegressList(searchVal).then(function (data) {
                  setListVal(data);
              });
          };

          function setListVal(data) {
              if (data.status) {
                  $scope.tableDataList = $filter('departRegressFilter').SerializationDepartRegressList(data.obj.result);
                  // 翻页配置
                  $scope.paginationConf = {
                      currentPage: data.obj.pageNo,
                      itemsPerPage: data.obj.pageSize,
                      totalItems: data.obj.totalCount
                  };
              } else {
                  CommonService.showMessageModal('获取出场回场记录列表失败: \n' + data.errMsg.toString());
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
