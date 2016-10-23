'use strict';

/**
 * @ngdoc filter
 * @name angularAceAdminApp.filter:scheduleManagementFilter
 * @function
 * @description
 * # scheduleManagementFilter
 * Filter in the angularAceAdminApp.
 */
angular.module('angularAceAdminApp')
    .filter('scheduleManagementFilter', [
        '$filter',
        function ($filter) {

            var SerializationScheduleListData = function (input) {
                var returnVal = $.map(input, function (item) {
                    return {
                        id: item.id,
                        beginStation: item.beginStation,
                        beginStationId: item.beginStationId,
                        beginTime: new Date(item.beginTime),
                        busId: item.busId,
                        coreBus: item.coreBus,
                        coreLine: item.coreLine,
                        driver: {
                            name: item.driver
                        },
                        endStation: item.endStation,
                        endStationId: item.endStationId,
                        endTime: new Date(item.endTime),
                        lineId: item.lineId,
                        numberDate: new Date(item.numberDate),
                        numberStatus: item.numberStatus,
                        remark: item.remark,
                        steward: item.steward
                    }
                });
                return returnVal;
            };

            var SerializationScheduleDriverList = function (input) {
                return $.map(input, function (item) {
                    return {
                        name: item
                    }
                });
            };

            var SerializationScheduleFormObject = function (input) {
                return {
                    id : input.id,
                    lineId: input.lineId,
                    numberDate: $filter('date')(input.numberDate, 'yyyy-MM-dd'),
                    busId: input.busId,
                    driver: input.driver.name,
                    steward: input.steward,
                    beginStationId: input.beginStationId,
                    beginTime: $filter('date')(input.beginTime, 'yyyy-MM-dd HH:mm:ss'),
                    endStationId: input.endStationId,
                    endTime: $filter('date')(input.endTime, 'yyyy-MM-dd HH:mm:ss'),
                    numberStatus: input.numberStatus,
                    remark: input.remark
                }
            };

            var SerializationScheduleQueryObject = function (input) {
                return {
                    lineId: input.lineId,
                    numberDate: input.numberDate,
                    busId: input.busId,
                    driver: input.driver.name ? input.driver.name : '',
                    beginStationId: input.beginStationId,
                    endStationId: input.endStationId
                }
            };

            return {
                SerializationScheduleListData: SerializationScheduleListData,
                SerializationScheduleDriverList: SerializationScheduleDriverList,
                SerializationScheduleFormObject: SerializationScheduleFormObject,
                SerializationScheduleQueryObject: SerializationScheduleQueryObject
            }
        }]);
