'use strict';

/**
 * @ngdoc filter
 * @name angularAceAdminApp.filter:CommonFilter
 * @function
 * @description
 * # CommonFilter
 * Filter in the angularAceAdminApp.
 */
angular.module('angularAceAdminApp')
    .filter('CommonFilter', function () {

        var isMaleOrFemale = function (input) {
            return parseInt(input) == 0 ? "男" : "女";
        };

        return {
            isMaleOrFemale: isMaleOrFemale
        }
    });
