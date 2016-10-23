'use strict';

/**
 * @ngdoc filter
 * @name angularAceAdminApp.filter:SimManagementFilter
 * @function
 * @description
 * # SimManagementFilter
 * Filter in the angularAceAdminApp.
 */
angular.module('angularAceAdminApp')
    .filter('SimManagementFilter', [
        '$filter',
        function ($filter) {

            // 序列化SimList
            var SerializationSimList = function (input) {
                return $.map(input, function (item) {
                    return {
                        dBuyDate: new Date(item.dBuyDate),
                        iDevId: item.iDevId,
                        iSIMCode: item.iSIMCode,
                        iSIMId: item.iSIMId
                    }
                });
            };

            var SerializationSimFormObject = function (input) {
                return {
                    dBuyDate: $filter('date')(input.dBuyDate, 'yyyy-MM-dd'),
                    iDevId: input.iDevId,
                    iSIMCode: input.iSIMCode,
                    iSIMId: input.iSIMId
                }
            };

            var SerializationSimQueryObject = function (input) {
                return {
                    dBuyDate: $filter('date')(input.dBuyDate, 'yyyy-MM-dd'),
                    iDevId: input.iDevId,
                    iSIMCode: input.iSIMCode
                }
            };

            return {
                SerializationSimList: SerializationSimList,
                SerializationSimFormObject: SerializationSimFormObject,
                SerializationSimQueryObject: SerializationSimQueryObject
            }
        }
    ]);
