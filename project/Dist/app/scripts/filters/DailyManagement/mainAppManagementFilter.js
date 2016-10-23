'use strict';

/**
 * @ngdoc filter
 * @name angularAceAdminApp.filter:MainAppManagementFilter
 * @function
 * @description
 * # MainAppManagementFilter
 * Filter in the angularAceAdminApp.
 */
angular.module('angularAceAdminApp')
    .filter('MainAppManagementFilter', function () {

        var SerializationAppList = function (input) {
            return $.map(input, function (item) {
                return {
                    iDataFileId: item.iDataFileId,
                    iFileType: item.iFileType,
                    cFileName: item.cFileName,
                    cURL: item.cURL,
                    dtSync: new Date(item.dtSync),
                    iIsSync: parseInt(item.iIsSync),
                    cVersion: item.cVersion
                }
            });
        };

        return {
            SerializationAppList: SerializationAppList
        };
    });
