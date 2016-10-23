'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
    .controller('MainCtrl', [
        '$scope',
        '$rootScope',
        'navDataList',
        'CommonService',
        function ($scope, $rootScope, navDataList, CommonService) {

            $rootScope.showMessageModal = function (message, callback) {
                if (callback) {
                    callback();
                }
                $scope.modalViewConf.message = message;
                $scope.modalViewConf.show = true;
            };

            $rootScope.hideMessageModal = function () {
                $scope.modalViewConf.show = false;
            };

            CommonService.hideMessageModal();

            if (navDataList.status) {
                // 树形菜单列表
                $scope.treeViewList = navDataList.obj;
            } else {
                CommonService.showMessageModal('获取菜单列表失败: \n' + navDataList.errMsg.toString());
            }

            // 更新页面标题的监听
            $scope.$on('updatePageHeaderTitle', function (event, pageHeaderInfo) {
                $scope.pageHeader = pageHeaderInfo;
            });

            // 导航栏 Title & Icon (Font Awesome)
            $scope.navbarInfo = {
                title: '公交运营管理系统',
                icon: 'fa-bus'
            };

            // 用户基本信息
            $scope.userInfo = {
                username: 'Manster'
            };

            // 修改密码
            $scope.changePassword = function () {
                console.log('change password');
            };

            // 退出登录
            $scope.signOut = function () {
                console.log('sign out');
            };

            $scope.modalViewConf = {
                title: '提示',
                show: false,
                modalFooterBlock: true,
                message: ''
            };

            // $rootScope.$on('showModalViewMessage', function (event, message) {
            //     $scope.modalViewConf.message = message;
            //     $scope.modalViewConf.show = true;
            // });

        }]);
