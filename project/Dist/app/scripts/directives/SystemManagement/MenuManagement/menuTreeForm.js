'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:menuTreeForm
 * @description
 * # menuTreeForm
 */
angular.module('angularAceAdminApp')
    .directive('menuTreeForm', function () {
        return {
            templateUrl: 'template/SystemManagement/MenuManagement/menuTreeForm.html',
            restrict: 'EA',
            scope: {
                formObject: '=',
                modalViewConf: '=',
                updateList: '&'
            },
            controller: [
                '$scope',
                'SystemManagementService',
                'CommonService',
                function ($scope, SystemManagementService, CommonService) {
                    
                    $scope.parentIdList = [];
                    // 父级菜单选项数组
                    SystemManagementService.SystemManagement_GetParentIdList().then(function (data) {
                        if (data.status) {
                            $scope.parentIdList = data.obj;
                        } else {
                            CommonService.showMessageModal('父级菜单项列表请求失败', function () {
                                $scope.modalViewConf.show = false;
                            })
                        }
                    });

                    // 提交表单
                    $scope.submitForm = function () {
                        if ($scope.menuTreeForm.$valid) {
                            // 若id未空 则未添加新菜单, 否则未修改菜单
                            if (!$scope.formObject.id) {
                                SystemManagementService.SystemManagement_AddMenu($scope.formObject).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '添加成功': '添加失败: ' + data.errMsg.toString(), function () {
                                        $scope.modalViewConf.show = false;
                                        $scope.updateList();
                                    })
                                });
                            } else {
                                SystemManagementService.SystemManagement_EditMenu($scope.formObject).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '修改成功': '修改失败: ' + data.errMsg.toString(), function () {
                                        $scope.modalViewConf.show = false;
                                        $scope.updateList();
                                    })
                                });
                            }
                        } else {
                            CommonService.showMessageModal('表单必选项未填写!', function () {
                                $scope.modalViewConf.show = false;
                            });
                        }
                    }

                }
            ]
        };
    });
