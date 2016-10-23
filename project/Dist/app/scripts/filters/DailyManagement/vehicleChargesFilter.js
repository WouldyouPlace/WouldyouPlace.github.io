'use strict';

/**
 * @ngdoc filter
 * @name angularAceAdminApp.filter:VehicleChargesFilter
 * @function
 * @description
 * # VehicleChargesFilter
 * Filter in the angularAceAdminApp.
 */
angular.module('angularAceAdminApp')
    .filter('VehicleChargesFilter', [
            '$filter',
            'CommonService',
            function ($filter, CommonService) {

                var SerializationChargesList = function (input) {
                    return $.map(input, function (item) {
                        return {
                            id: item.id,
                            cBusCode: item.cBusCode,
                            registerName: item.registerName,
                            datetime: new Date(item.datetime),
                            address: item.address,
                            payedMoney: parseFloat(item.payedMoney),
                            totalMoney: parseFloat(item.totalMoney),
                            account: item.account,
                            remark: item.remark,
                            operator: item.operator
                        }
                    });
                };

                var SerializationChargesFormObject = function (input) {
                    return {
                        id: input.id,
                        cBusCode: input.cBusCode,
                        registerName: input.registerName,
                        datetime: $filter('date')(input.datetime, 'yyyy-MM-dd'),
                        address: input.address,
                        payedMoney: input.payedMoney,
                        totalMoney: input.totalMoney,
                        account: input.account,
                        remark: input.remark,
                        operator: CommonService.getUserCookies().id
                    }
                };

                var SerializationChargesQueryObject = function (input) {
                    return {
                        cBusCode: input.cBusCode,
                        registerName: input.registerName,
                        datetime: $filter('date')(input.datetime, 'yyyy-MM-dd'),
                        operator: input.operator
                    }
                };

                return {
                    SerializationChargesList: SerializationChargesList,
                    SerializationChargesFormObject: SerializationChargesFormObject,
                    SerializationChargesQueryObject: SerializationChargesQueryObject
                }
            }
        ]
    );
