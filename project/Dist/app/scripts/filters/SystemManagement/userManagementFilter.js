'use strict';

/**
 * @ngdoc filter
 * @name angularAceAdminApp.filter:UserManagementFilter
 * @function
 * @description
 * # UserManagementFilter
 * Filter in the angularAceAdminApp.
 */
angular.module('angularAceAdminApp')
    .filter('UserManagementFilter_SerializationFormObject', [
        '$filter',
        function ($filter) {
            return function (input) {

                var returnVal = {
                    OID: input.OID,
                    address: input.address,
                    birthday: !input.birthday ? null : $filter('date')(input.birthday, 'yyyy-MM-dd'),
                    cardID: input.cardID,
                    deptOID: input.dept.id,
                    jobNumber: input.jobNumber,
                    license: input.license,
                    licensingDate: !input.licensingDate ? null : $filter('date')(input.licensingDate, 'yyyy-MM-dd'),
                    location: input.location,
                    loginName: input.loginName,
                    nameCN: input.nameCN,
                    password: input.password,
                    phone: input.phone,
                    remark: input.remark,
                    roleId: !input.role ? null : input.role.id,
                    sex: input.sex,
                    state: input.state,
                    teamOID: !input.team ? null : input.team.id,
                    groupOID: !input.group ? null : input.group.id,
                    tel: input.tel,
                    validBeginDate: !input.validBeginDate ? null : $filter('date')(input.validBeginDate, 'yyyy-MM-dd'),
                    validYear: input.validYear,
                    carNum: input.carNum
                };

                return returnVal;
            };
        }]);


angular.module('angularAceAdminApp')
    .filter('UserManagementFilter_SerializationSearchObject', function () {
        return function (input) {

            var returnVal = {
                nameCN: input.nameCN,
                deptOID: input.dept.id,
                teamOID: input.team.id,
                roleId: input.role.roleId,
                jobNumber: input.jobNumber,
                sex: input.sex,
            };

            return returnVal;
        };
    });

