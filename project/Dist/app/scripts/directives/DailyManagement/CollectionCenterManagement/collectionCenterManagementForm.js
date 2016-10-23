'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:collectionCenterManagementForm
 * @description
 * # collectionCenterManagementForm
 */
angular.module('angularAceAdminApp')
    .directive('collectionCenterManagementForm', function () {
        return {
            templateUrl: 'template/DailyManagement/CollectionCenterManagement/collectionCenterManagementForm.html',
            restrict: 'EA',
            scope: {
                formObject: '=',
                modalViewConf: '=',
                updateList: '&'
            },
            controller: [
                '$scope',
                '$filter',
                'DailyManagementService',
                'CommonService',
                function ($scope, $filter, DailyManagementService, CommonService) {
                    $scope.deptList = []; // 部门列表
                    $scope.teamList = []; // 路队列表


                    // 部门列表
                    DailyManagementService.CollectionCenterManagement_GetDeptTreeList().then(function (data) {
                        if (data.status) {
                            $scope.deptList = data.obj;
                        } else {
                            CommonService.showMessageModal('部门列表获取失败: \n' + data.errMsg, function () {
                                $scope.modalViewConf.show = false;
                            });
                        }
                    });

                    // 路队列表
                    DailyManagementService.CollectionCenterManagement_GetTeamList().then(function (data) {
                        if (data.status) {
                            $scope.teamList = data.obj;
                        } else {
                            CommonService.showMessageModal('路队列表获取失败: \n' + data.errMsg, function () {
                                $scope.modalViewConf.show = false;
                            });
                        }
                    });

                    $scope.submitForm = function () {
                        if (verifyForm()) {
                            if (!$scope.formObject.cCcId) {

                                DailyManagementService.CollectionCenterManagement_AddCollection($filter('CollectionFilter').SerializationCollectionFormObject($scope.formObject)).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '添加成功' : '添加失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            } else {
                                DailyManagementService.CollectionCenterManagement_EditCollection($filter('CollectionFilter').SerializationCollectionFormObject($scope.formObject)).then(function (data) {
                                    CommonService.showMessageModal(data.status ? '修改成功' : '修改失败: \n' + data.errMsg, function () {
                                        $scope.updateList();
                                        $scope.modalViewConf.show = false;
                                    })
                                });
                            }
                        }
                    };

                    function verifyForm() {
                        return $scope.collectionForm.$valid && $scope.formObject.dept;
                    }

                }
            ]
        };
    });
