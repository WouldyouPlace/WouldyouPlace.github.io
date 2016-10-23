'use strict';

/**
 * @ngdoc filter
 * @name angularAceAdminApp.filter:PsamManagementFilter
 * @function
 * @description
 * # PsamManagementFilter
 * Filter in the angularAceAdminApp.
 */
angular.module('angularAceAdminApp')
    .filter('PsamManagementFilter', [
        '$filter',
        function ($filter) {

        var SerializationPsamList = function (input) {
            return $.map(input, function (item) {
                return {
                    iPSAMId: item.iPSAMId,
                    iPSAMCode: item.iPSAMCode,
                    cIssuerCode: item.cIssuerCode,
                    dIssueTime: new Date(item.dIssueTime),
                    device: item.device,
                    iCardStatus: parseInt(item.iCardStatus),
                    iDevId: item.iDevId,
                    iKeyVerNo: item.iKeyVerNo,
                    iSAMNum: item.iSAMNum,
                    iSAMVerNo: item.iSAMVerNo
                }
            });
        };

        var SerializationPsamFormObject = function (input) {
            return {
                iPSAMId: input.iPSAMId,
                iPSAMCode: input.iPSAMCode,
                cIssuerCode: input.cIssuerCode,
                dIssueTime: $filter('date')(input.dIssueTime, 'yyyy-MM-dd'),
                device: input.device,
                iCardStatus: input.iCardStatus,
                iDevId: input.iDevId,
                iKeyVerNo: input.iKeyVerNo,
                iSAMNum: input.iSAMNum,
                iSAMVerNo: input.iSAMVerNo
            }
        };

        var SerializationPsamQueryObject = function (input) {
            return {
                iDevId: input.iDevId,
                cIssuerCode: input.cIssuerCode,
                dIssueTime: $filter('date')(input.dIssueTime, 'yyyy-MM-dd'),
                iCardStatus: input.iCardStatus,
                iSAMNum: input.iSAMNum,
            }
        };

        return {
            SerializationPsamList: SerializationPsamList,
            SerializationPsamFormObject: SerializationPsamFormObject,
            SerializationPsamQueryObject: SerializationPsamQueryObject
        };
    }]);
