'use strict';

/**
 * @ngdoc filter
 * @name angularAceAdminApp.filter:WhiteListFilter
 * @function
 * @description
 * # WhiteListFilter
 * Filter in the angularAceAdminApp.
 */
angular.module('angularAceAdminApp')
  .filter('WhiteListFilter', function () {
      var SerializationWhiteList = function (input) {
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
          SerializationWhiteList: SerializationWhiteList
      }
  });
