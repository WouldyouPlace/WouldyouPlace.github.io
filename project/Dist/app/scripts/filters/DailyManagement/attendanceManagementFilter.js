'use strict';

/**
 * @ngdoc filter
 * @name angularAceAdminApp.filter:attendanceManagementFilter
 * @function
 * @description
 * # attendanceManagementFilter
 * Filter in the angularAceAdminApp.
 */
angular.module('angularAceAdminApp')
    .filter('attendanceManagementFilter', [
        '$filter',
        function ($filter) {

            var SerializationSearchObject = function (input) {
                return {
                    name: input.name,
                    line: input.line,
                    dtTime: !input.dtTime ? null : $filter('date')(input.dtTime, 'yyyy-MM-dd'),
                };
            };

            return {
                SerializationSearchObject: SerializationSearchObject
            }


        }]);
