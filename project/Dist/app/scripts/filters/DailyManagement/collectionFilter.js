'use strict';

/**
 * @ngdoc filter
 * @name angularAceAdminApp.filter:CollectionFilter
 * @function
 * @description
 * # CollectionFilter
 * Filter in the angularAceAdminApp.
 */
angular.module('angularAceAdminApp')
  .filter('CollectionFilter', function () {

      var SerializationCollectionList = function (input) {
          return $.map(input, function (item) {
              return {
                  cCcId: item.cCcId,
                  cCcName: item.cCcName,
                  centerIP: item.centerIP,
                  comment: item.comment,
                  describe: item.describe,
                  address: item.address,
                  dept: {
                      title: item.dept.name,
                      id: item.dept.id
                  },
                  deptOID: item.dept ? item.dept.id : "",
                  line: item.line,
                  lineName: item.line ? item.line.name : "",
                  phone: item.phone,
                  team: item.team,
                  teamOID: item.team.id
              }
          });
      };

      var SerializationCollectionQueryObject = function (input) {
          return {
              cCcName: input.cCcName,
              deptOID: input.dept.id,
              teamOID : input.teamOID,
              lineId: input.lineId,
              phone: input.phone,
              centerIP: input.centerIP
          }
      };

      var SerializationCollectionFormObject = function (input) {
          return {
              cCcId: input.cCcId,
              cCcName: input.cCcName,
              deptOID: input.dept.id,
              teamOID: input.teamOID,
              lineId: input.lineName,
              phone: input.phone,
              centerIP: input.centerIP
          }
      };

    return {
        SerializationCollectionList: SerializationCollectionList,
        SerializationCollectionQueryObject: SerializationCollectionQueryObject,
        SerializationCollectionFormObject: SerializationCollectionFormObject
    }
  });
