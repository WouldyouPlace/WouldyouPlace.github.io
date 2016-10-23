'use strict';

/**
 * @ngdoc filter
 * @name angularAceAdminApp.filter:departRegressFilter
 * @function
 * @description
 * # departRegressFilter
 * Filter in the angularAceAdminApp.
 */
angular.module('angularAceAdminApp')
    .filter('departRegressFilter', [
        '$filter',
        function ($filter) {

            var SerializationDepartRegressList = function (input) {
                return $.map(input, function (item) {
                    return {
                        id: item.id,
                        cBusCode: item.cBusCode,
                        driverId: item.driverId,
                        steward: item.steward,
                        offDateTime: new Date(item.offDateTime),
                        station: item.station,
                        money: parseFloat(item.money),
                        mileage: parseFloat(item.mileage),
                        backDateTime: new Date(item.backDateTime),
                        remark: item.remark,
                        operator: item.operator
                    }
                });
            };

            var SerializationDepartRegressFormObject = function (input) {
                return {
                    id: input.id,
                    cBusCode: input.cBusCode,
                    driverId: input.driverId,
                    steward: input.steward,
                    offDateTime: $filter('date')(input.offDateTime, 'yyyy-MM-dd HH:mm:ss'),
                    station: input.station,
                    money: input.money,
                    mileage: input.mileage,
                    backDateTime: $filter('date')(input.backDateTime, 'yyyy-MM-dd HH:mm:ss'),
                    remark: input.remark,
                    operator: input.operator
                };
            };
            
            var SerializationDepartRegressQueryObject = function (input) {
                return {
                    cBusCode: input.cBusCode,
                    driverId: input.driverId,
                    steward: input.steward,
                    offDateTime: $filter('date')(input.offDateTime, 'yyyy-MM-dd HH:mm:ss'),
                    backDateTime: $filter('date')(input.backDateTime, 'yyyy-MM-dd HH:mm:ss'),
                    remark: input.remark,
                    operator: input.operator
                };
            };



            return {
                SerializationDepartRegressList: SerializationDepartRegressList,
                SerializationDepartRegressFormObject: SerializationDepartRegressFormObject,
                SerializationDepartRegressQueryObject: SerializationDepartRegressQueryObject
            };
        }]
    );
