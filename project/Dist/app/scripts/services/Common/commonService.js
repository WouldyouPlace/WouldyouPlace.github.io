'use strict';

/**
 * @ngdoc service
 * @name angularAceAdminApp.CommonService
 * @description
 * # CommonService
 * Service in the angularAceAdminApp.
 */
angular.module('angularAceAdminApp')
    .factory('CommonService', [
        '$rootScope',
        '$cookies',
        '$state',
        function ($rootScope, $cookies) {

            var showMessageModal = function (msg, callback) {
                $rootScope.showMessageModal(msg, callback);
            };

            var hideMessageModal = function () {
                $('.modal-backdrop.fade.in').remove();
            };

            var getStateArray = function () {
                return [
                    {
                        name: "禁用",
                        value: 0
                    }, {
                        name: "启用",
                        value: 1
                    }

                ];
            };

            var cloneObject = function (obj) {
                var o, obj;
                if (obj.constructor == Object) {
                    o = new obj.constructor();
                } else {
                    o = new obj.constructor(obj.valueOf());
                }
                for (var key in obj) {
                    if (o[key] != obj[key]) {
                        if (typeof(obj[key]) == 'object') {
                            o[key] = cloneObject(obj[key]);
                        } else {
                            o[key] = obj[key];
                        }
                    }
                }
                o.toString = obj.toString;
                o.valueOf = obj.valueOf;
                return o;
            };

            var setUserCookies = function (obj) {
                var date = new Date();
                date.setTime(date.getTime() + 30 * 60 * 1000);
                $cookies.putObject('busUser', obj, {
                    expires: date
                })
            };

            var getUserCookies = function () {
                return $cookies.getObject('busUser');
            };

            var removeUserCookies = function () {
                $cookies.remove('busUser');
            };

            var checkUserState = function () {
                if (!getUserCookies()) {
                    $state.go('login');
                }
            };

            return {
                showMessageModal: showMessageModal,
                hideMessageModal: hideMessageModal,
                getStateArray: getStateArray,
                cloneObject: cloneObject,
                setUserCookies: setUserCookies,
                getUserCookies: getUserCookies,
                removeUserCookies: removeUserCookies,
                checkUserState: checkUserState
            }

        }
    ]);
