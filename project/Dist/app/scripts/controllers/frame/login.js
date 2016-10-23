'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
    .controller('LoginCtrl', [
        '$scope',
        '$state',
        'UserServices',
        'CommonService',
        function ($scope, $state, UserServices, CommonService) {
            $scope.loginInfo = {
                'title': 'Angular Ace Admin'
            };

            $scope.userInfo = {
                loginName: '',
                password: ''
            };

            $scope.code = "";

            $scope.login = function () {
                var login = {
                    user: $scope.userInfo,
                    code: $scope.code
                };

                UserServices.User_Login(login).then(function (data) {
                    if (data.status) {
                        CommonService.setUserCookies(data.obj);
                        $state.go('main');
                    } else {
                        alert('请检查用户名和密码是否正确');
                        CommonService.showMessageModal('登录失败: \n' + data.errMsg, function () {
                            $scope.userInfo = {
                                loginName: '',
                                password: ''
                            };
                        });
                    }
                });

            };
        }]);
