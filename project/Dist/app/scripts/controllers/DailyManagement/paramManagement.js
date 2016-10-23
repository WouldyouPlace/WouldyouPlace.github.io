'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:ParamManagementCtrl
 * @description
 * # ParamManagementCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
    .controller('ParamManagementCtrl', [
        '$scope',
        '$filter',
        'DailyManagementService',
        'CommonService',
        'ParamList',
        function ($scope, $filter, DailyManagementService, CommonService, ParamList) {
            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          数值初始化
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            CommonService.hideMessageModal();
            // 列表数组
            setListVal(ParamList);

            initEmptyFormObject();

            // 模态框配置
            $scope.modalViewConf = {
                title: '',
                show: false,
                modalFooterBlock: false
            };
            // 删除模态框
            $scope.modalViewConf_del = {
                title: '删除参数',
                show: false,
                modalFooterBlock: false
            };
            // 详情模态框
            $scope.modalViewConf_detail = {
                title: '参数详情',
                show: false,
                modalFooterBlock: false
            };

            $scope.closeModalView = function () {
                $scope.modalViewConf.show = false;
                $scope.modalViewConf_del.show = false;
                $scope.modalViewConf_detail.show = false;
                initEmptyFormObject();
            };

            function initEmptyFormObject() {
                $scope.formObject = {
                    id: "",
                    name: "",
                    value: "",
                    nameCN: ""
                }
            }

            initEmptyFormObject();

            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          增删改查
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            $scope.addItem = function () {
                $scope.modalViewConf.title = '添加参数';
                $scope.modalViewConf.show = true;
            };

            $scope.editItem = function (item) {
                $scope.modalViewConf.title = '修改参数';
                angular.copy(item, $scope.formObject);
                $scope.modalViewConf.show = true;
            };

            $scope.detailItem = function (item) {
                angular.copy(item, $scope.formObject);
                // DailyManagementService.ParamManagement_GetParamDetail({id: item.id}).then(function (data) {
                //     if (data.status) {
                //         angular.copy(data.obj, $scope.formObject);
                //     } else {
                //         CommonService.showMessageModal('获取参数详情失败: \n' + data.errMsg.toString());
                //     }
                // });
                $scope.modalViewConf_detail.show = true;
            };

            $scope.delItem = function (item) {
                // $scope.formObject = CommonService.cloneObject(item);
                angular.copy(item, $scope.formObject);
                $scope.modalViewConf_del.show = true;
            };

            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          更新数组
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */

            // 更新数组
            $scope.updateList = function () {

                DailyManagementService.ParamManagement_GetParamList().then(function (data) {
                    setListVal(data);
                });
            };

            function setListVal(data) {
                if (data.status) {
                    $scope.tableDataList = angular.copy(data.obj);
                } else {
                    CommonService.showMessageModal('获取参数列表失败: \n' + data.errMsg.toString());
                }
            }


        }
    ]);
