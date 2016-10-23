'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:RoleManagementCtrl
 * @description
 * # RoleManagementCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
    .controller('RoleManagementCtrl', [
        '$scope',
        'SystemManagementService',
        'CommonService',
        'RoleList',
        function ($scope, SystemManagementService, CommonService, RoleList) {
            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          初始化
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            CommonService.hideMessageModal();
            // 角色列表数组
            setListVal(RoleList);
            // 查询条件对象
            $scope.resetQuery = function () {
                $scope.queryObject = {
                    nameCN: "",
                    level: "",
                    remark: ""
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
                title: '删除角色',
                show: false,
                modalFooterBlock: false
            };
            // 查询模态框
            $scope.modalViewConf_query = {
                title: '查询角色',
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
                    id: '',
                    nameCN: '',
                    level: '',
                    orderNum: '',
                    remark: '',
                    valid: '',
                    privilege: ''
                }
            }

            initEmptyFormObject();

            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          增删改查
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            $scope.addRole = function () {
                $scope.modalViewConf.title = '添加角色';
                $scope.modalViewConf.show = true;
            };

            $scope.editRole = function (item) {
                $scope.modalViewConf.title = '修改角色';
                $scope.formObject = CommonService.cloneObject(item);
                $scope.modalViewConf.show = true;
            };

            $scope.delRole = function (item) {
                $scope.formObject = CommonService.cloneObject(item);
                $scope.modalViewConf_del.show = true;
            };

            $scope.userDetail = function (item) {
                $scope.formObject = CommonService.cloneObject(item);
                $scope.modalViewConf_detail.show = true;
            };

            $scope.searchRole = function () {
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

            // 更新用户数组
            $scope.updateList = function () {
                var searchVal = {
                    role: CommonService.cloneObject($scope.queryObject),
                    page: {
                        pageNo: $scope.paginationConf.currentPage,
                        pageSize: $scope.paginationConf.itemsPerPage
                    }
                };
                SystemManagementService.RoleManagement_GetRoleList(searchVal).then(function (data) {
                    setListVal(data);
                });
            };

            function setListVal(data) {
                if (data.status) {
                    $scope.roleList = data.obj.result;
                    // 翻页配置
                    $scope.paginationConf = {
                        currentPage: data.obj.pageNo,
                        itemsPerPage: data.obj.pageSize,
                        totalItems: data.obj.totalCount
                    };
                } else {
                    CommonService.showMessageModal('获取角色列表失败: \n' + data.errMsg.toString());
                }
            }


            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          判断
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */

            $scope.getRoleState = function (item) {
                return parseInt(item.valid) == 1 ? "启用" : "禁用";
            }
        }
    ]);
