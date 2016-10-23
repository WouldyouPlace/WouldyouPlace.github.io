'use strict';

/**
 * @ngdoc service
 * @name angularAceAdminApp.UserServices
 * @description
 * # UserServices
 * Service in the angularAceAdminApp.
 */
angular.module('angularAceAdminApp')
    .factory('UserServices', [
        '$http',
        '$q',
        function ($http, $q) {
            var SERVER_INTERFACE = SERVER_CONFIGURATION().getInterface().FrameInterface();
            var defer = $q.defer();

            function requestDataFormServer(data, url) {
                $http({
                    method: 'get',
                    data: data,
                    url: url
                })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
                return defer.promise;
            }

            // 登录
            var User_Login = function (data) {
                return requestDataFormServer(data, SERVER_INTERFACE.UserInterface.User_Login);
            };

            return {
                User_Login: User_Login
            }

        }]);
