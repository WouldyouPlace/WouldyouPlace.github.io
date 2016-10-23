'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:ViolationLogCtrl
 * @description
 * # ViolationLogCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
  .controller('ViolationLogCtrl', [
      '$scope',
      '$filter',
      'DailyManagementService',
      'CommonService',
      'ViolationList',
      function ($scope, $filter, DailyManagementService, CommonService, ViolationList) {
          /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           *                          数值初始化
           ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           */
          CommonService.hideMessageModal();
          // 列表数组
          setListVal(ViolationList);

          initEmptyFormObject();

          // 查询条件对象
          $scope.resetQuery = function () {
              $scope.queryObject = {
                  cBusCode: "",
                  driverId: "",
                  violationProject: "",
                  violationDate: ""
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
              title: '查询违章记录',
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
                  violationProject: "",
                  violationDate: "",
                  violationPlace: "",
                  money: "",
                  points: "",
                  note: "",
                  account: "",
                  registrar: ""
              }
          }

          initEmptyFormObject();

          /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           *                          增删改查
           ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           */
          $scope.addItem = function () {
              $scope.modalViewConf.title = '添加违章记录';
              $scope.modalViewConf.show = true;
          };

          $scope.editItem = function (item) {
              $scope.modalViewConf.title = '修改违章记录';
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
                  peccancy: $filter('violationFilter').SerializationViolationQueryObject($scope.queryObject),
                  page: {
                      pageNo: $scope.paginationConf.currentPage,
                      pageSize: $scope.paginationConf.itemsPerPage
                  }
              };
              DailyManagementService.ViolationLog_GetViolationList(searchVal).then(function (data) {
                  setListVal(data);
              });
          };

          function setListVal(data) {
              if (data.status) {
                  $scope.tableDataList = $filter('violationFilter').SerializationViolationList(data.obj.result);
                  // 翻页配置
                  $scope.paginationConf = {
                      currentPage: data.obj.pageNo,
                      itemsPerPage: data.obj.pageSize,
                      totalItems: data.obj.totalCount
                  };
              } else {
                  CommonService.showMessageModal('获取违章记录列表失败: \n' + data.errMsg.toString());
              }
          }


      }
  ]);
