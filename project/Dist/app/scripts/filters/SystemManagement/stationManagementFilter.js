'use strict';

/**
 * @ngdoc filter
 * @name angularAceAdminApp.filter:stationManagementFilter
 * @function
 * @description
 * # stationManagementFilter
 * Filter in the angularAceAdminApp.
 */
angular.module('angularAceAdminApp')
    .filter('stationManagementFilter', function () {

        var FormDataFilter = function (input) {
            var obj = {
                content: input.content,
                delFlag: input.delFlag,
                id: input.id,
                latitude: input.latitude,
                longitude: input.longitude,
                name: input.name,
                // regionCode: input.region.regionCode
                regionCode: input.regionCode
            };
            return obj;
        };

        return {
            FormDataFilter: FormDataFilter
        }
    });
