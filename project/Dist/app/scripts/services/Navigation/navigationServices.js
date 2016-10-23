'use strict';

/**
 * @ngdoc service
 * @name angularAceAdminApp.NavigationServices
 * @description
 * # NavigationServices
 * Service in the angularAceAdminApp.
 */
angular.module('angularAceAdminApp')
    .factory('NavigationServices', [
        '$http',
        '$q',
        function ($http, $q) {
            var defer = $q.defer();
            var SERVER_INTERFACE = SERVER_CONFIGURATION().getInterface().FrameInterface();

            // 获得导航数据
            var getNavigationData = function (data) {
                $http({
                    method: 'POST',
                    data: data,
                    url: SERVER_INTERFACE.NavigationInterface.GetNavigationList
                })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
                return defer.promise;
            };


            return {
                getNavigationData: getNavigationData
            }
        }
    ]);
