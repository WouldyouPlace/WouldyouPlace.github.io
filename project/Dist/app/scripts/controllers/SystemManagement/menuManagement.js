'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:MenuManagementCtrl
 * @description
 * # MenuManagementCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
    .controller('MenuManagementCtrl', [
        '$scope',
        '$q',
        'SystemManagementService',
        'CommonService',
        'MenuList',
        function ($scope, $q, SystemManagementService, CommonService, MenuList) {
            CommonService.hideMessageModal();

            setListVal(MenuList);
            // 表单模型
            $scope.getFormObjEmpty = function () {
                $scope.formObject = {
                    id: '',         // 菜单索引
                    name: '',       // 菜单名称
                    url: '',        // 菜单链接
                    img: '',        // 图标
                    parentId: '',   // 父节点
                    state: '',      // 状态
                    orderNum: ''    // 权值
                };
            };
            $scope.getFormObjEmpty();
            $scope.closeModalView = function () {
                $scope.modalViewConf.show = false;
                $scope.modalViewConf_del.show = false;
                $scope.getFormObjEmpty();
            };
            // 模态框配置
            $scope.modalViewConf = {
                title: '',
                show: false,
                modalFooterBlock: false
            };

            $scope.modalViewConf_del = {
                title: '删除菜单',
                show: false,
                modalFooterBlock: false
            };

            /**
             * 判断是含有子节点
             * 有返回false, 否则返回true
             * @param item
             */
            $scope.isLeaf = function (item) {
                return !item.children || !item.children.length;
            };

            // 添加菜单
            $scope.addMenu = function () {
                $scope.modalViewConf.title = '添加菜单项';
                $scope.modalViewConf.show = true;
            };

            // 修改菜单
            $scope.editMenu = function (item) {
                // console.log('Edit: ' + JSON.stringify(item));
                $scope.formObject = {
                    id: item.id,            // 菜单索引
                    name: item.title,       // 菜单名称
                    url: item.link,         // 菜单链接
                    img: item.icon,         // 图标
                    parentId: item.pid,     // 父节点
                    state: item.state.toString(),      // 状态
                    orderNum: item.orderNum // 权值
                };
                $scope.modalViewConf.title = '修改菜单项';
                $scope.modalViewConf.show = true;
            };

            // 删除菜单
            $scope.delMenu = function (item) {
                // console.log('Delete: ' + JSON.stringify(item));

                $scope.formObject = {
                    id: item.id,            // 菜单索引
                    name: item.title,       // 菜单名称
                    url: item.link,         // 菜单链接
                    img: item.icon,         // 图标
                    parentId: item.pid,     // 父节点
                    state: item.state.toString(),      // 状态
                    orderNum: item.orderNum // 权值
                };
                $scope.modalViewConf_del.show = true;
            };

            $scope.updateList = function () {
                SystemManagementService.SystemManagement_GetMenuList().then(function (data) {
                    setListVal(data);
                });
            };

            function setListVal(data) {
                if (data.status) {
                    $scope.menuList = data.obj;
                } else {
                    CommonService.showMessageModal('获取菜单列表失败: \n' + data.errMsg.toString());
                }
            }
        }]);
