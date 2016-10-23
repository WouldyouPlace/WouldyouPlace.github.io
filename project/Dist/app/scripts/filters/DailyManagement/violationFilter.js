'use strict';

/**
 * @ngdoc filter
 * @name angularAceAdminApp.filter:violationFilter
 * @function
 * @description
 * # violationFilter
 * Filter in the angularAceAdminApp.
 */
angular.module('angularAceAdminApp')
    .filter('violationFilter', [
        '$filter',
        function ($filter) {

            var SerializationViolationList = function (input) {
                return $.map(input, function (item) {
                    return {
                        id: item.id,
                        cBusCode: item.cBusCode,
                        driverId: item.driverId,
                        violationProject: item.violationProject,
                        violationDate: new Date(item.violationDate),
                        violationPlace: item.violationPlace,
                        money: parseInt(item.money),
                        points: parseInt(item.points),
                        note: item.note,
                        account: item.account,
                        registrar: item.registrar
                    }
                });
            };

            var SerializationViolationFormObject = function (input) {
                return {
                    id: input.id,
                    cBusCode: input.cBusCode,
                    driverId: input.driverId,
                    violationProject: input.violationProject,
                    violationDate: $filter('date')(input.violationDate, 'yyyy-MM-dd HH:mm:ss'),
                    violationPlace: input.violationPlace,
                    money: parseInt(input.money),
                    points: parseInt(input.points),
                    note: input.note,
                    account: input.account,
                    registrar: input.registrar
                }
            };

            var SerializationViolationQueryObject = function (input) {
                return {
                    cBusCode: input.cBusCode,
                    driverId: input.driverId,
                    violationProject: input.violationProject,
                    violationDate: $filter('date')(input.violationDate, 'yyyy-MM-dd HH:mm:ss')
                }
            };


            return {
                SerializationViolationList: SerializationViolationList,
                SerializationViolationFormObject: SerializationViolationFormObject,
                SerializationViolationQueryObject: SerializationViolationQueryObject
            }
        }
    ]);
