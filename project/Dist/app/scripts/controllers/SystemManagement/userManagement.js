'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:UserManagementCtrl
 * @description
 * # UserManagementCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
    .controller('UserManagementCtrl', [
        '$scope',
        '$filter',
        'SystemManagementService',
        'CommonService',
        'UserList',
        function ($scope, $filter, SystemManagementService, CommonService, UserList) {
            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          数值初始化
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            CommonService.hideMessageModal();
            // 用户列表数组
            setListVal(UserList);

            initEmptyFormObject();

            // 查询条件对象
            $scope.resetQuery = function () {
                $scope.queryObject = {
                    nameCN: '',
                    dept: '',
                    team: '',
                    role: '',
                    jobNumber: '',
                    sex: ''
                };
            };
            
            $scope.resetQuery();

            // 模态框配置
            $scope.modalViewConf = {
                title: '',
                show: false,
                size: 'large',
                modalFooterBlock: false
            };
            // 删除模态框
            $scope.modalViewConf_del = {
                title: '删除用户',
                show: false,
                modalFooterBlock: false
            };
            // 查询模态框
            $scope.modalViewConf_query = {
                title: '查询用户',
                show: false,
                modalFooterBlock: false
            };
            // 详细信息模态框
            $scope.modalViewConf_detail = {
                title: '用户详细信息',
                show: false,
                size: 'large',
                modalFooterBlock: true
            };

            $scope.closeModalView = function () {
                $scope.modalViewConf.show = false;
                $scope.modalViewConf_del.show = false;
                initEmptyFormObject();
            };

            function initEmptyFormObject() {
                $scope.formObject = {
                    OID: '',
                    nameCN: '',
                    loginName: '',
                    password: '',
                    sex: '',
                    state: '',
                    salt: '',
                    phone: '',
                    dept: '',
                    group: '',
                    team: '',
                    birthday: '',
                    cardID: '',
                    address: '',
                    tel: '',
                    license: '',
                    licensingDate: '',
                    carType: '',
                    validBeginDate: '',
                    validYear: '',
                    jobNumber: '',
                    location: '',
                    remark: '',
                    role: '',
                    carNum: [{}]
                }
            }

            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          增删改查
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            $scope.addUser = function () {
                $scope.modalViewConf.title = '添加用户';
                $scope.modalViewConf.show = true;
            };

            $scope.editUser = function (item) {
                $scope.modalViewConf.title = '修改用户';
                $scope.formObject = CommonService.cloneObject(item);
                $scope.formObject.dept.title = $scope.formObject.dept.name;
                $scope.modalViewConf.show = true;
            };

            $scope.delUser = function (item) {
                $scope.formObject = CommonService.cloneObject(item);
                $scope.modalViewConf_del.show = true;
            };

            $scope.userDetail = function (item) {
                SystemManagementService.UserManagement_GetUserDetailById(item.OID).then(function (data) {
                    if (data.status) {
                        $scope.formObject = data.obj;
                    } else {
                        CommonService.showMessageModal('用户详细信息获取失败: \n' + data.errMsg, function () {
                            initEmptyFormObject();
                        });
                    }
                });
                $scope.modalViewConf_detail.show = true;
            };

            $scope.searchUser = function () {
                $scope.modalViewConf_query.show = true;
            };


            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          设置监听
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            $scope.$watch('paginationConf', function (newValue, oldValue) {
                if ((newValue.currentPage + newValue.itemsPerPage) != (oldValue.currentPage + oldValue.itemsPerPage)) {
                    $scope.updateList();
                }
            }, true);

            // 更新用户数组
            $scope.updateList = function () {
                var searchVal = {
                    user: $filter('UserManagementFilter_SerializationSearchObject')($scope.queryObject),
                    page: {
                        pageNo: $scope.paginationConf.currentPage,
                        pageSize: $scope.paginationConf.itemsPerPage
                    }
                };

                SystemManagementService.UserManagement_GetUserList(searchVal).then(function (data) {
                    setListVal(data);
                });
            };

            function setListVal(data) {
                if (data.status) {
                    $scope.userList = data.obj.result;
                    // 翻页配置
                    $scope.paginationConf = {
                        currentPage: data.obj.pageNo,
                        itemsPerPage: data.obj.pageSize,
                        totalItems: data.obj.totalCount
                    };
                } else {
                    CommonService.showMessageModal('获取用户列表失败: \n' + data.errMsg.toString());
                }
            }

            /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          判断
             ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            $scope.getSex = function (item) {
                return parseInt(item.sex) == 0 ? "男" : "女";
            };

            $scope.getUserState = function (item) {
                return parseInt(item.state) == 1 ? "启用" : "禁用";
            }


        }
    ]);
