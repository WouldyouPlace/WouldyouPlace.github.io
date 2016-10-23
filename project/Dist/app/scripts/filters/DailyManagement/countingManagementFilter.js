'use strict';

/**
 * @ngdoc filter
 * @name angularAceAdminApp.filter:countingManagementFilter
 * @function
 * @description
 * # countingManagementFilter
 * Filter in the angularAceAdminApp.
 */
angular.module('angularAceAdminApp')
    .filter('countingManagementFilter', [
            '$filter',
            function ($filter) {

                var SerializationDriverArray = function (input) {
                    var returnVal = $.map(input, function (item, index) {
                        return {
                            driver: item.OID,
                            driverName: item.nameCN
                        }
                    });
                    return returnVal;
                };

                var SerializationCountingList = function (input) {
                    if (!input) {
                        return input;
                    }
                    var returnVal = $.map(input, function (item, index) {
                        return {
                            bus: item.bus,
                            busId: item.busId,
                            coinMoney: item.coinMoney,
                            dept: {
                                address: item.dept.address,
                                cid: item.dept.cid,
                                code: item.dept.code,
                                id: item.dept.id,
                                title: item.dept.name,
                                note: item.dept.note,
                                phone: item.dept.phone,
                                pid: item.dept.pid
                            },
                            deptOID: item.deptOID,
                            distributedList: item.distributedList,
                            fakeMoney: item.fakeMoney,
                            line: {
                                id: item.line.lineId,
                                name: item.line.name,
                                iLineCode: item.line.iLineCode
                            },
                            lineId: item.lineId,
                            moneyBagNum: item.moneyBagNum,
                            paperMoney: item.paperMoney,
                            recordId: item.recordId,
                            recordTime: item.recordTime,
                            remark: item.remark,
                            team: item.team,
                            teamOID: item.teamOID,
                            tradeDate: item.tradeDate,
                            validMoney: item.validMoney
                        }
                    });

                    return returnVal;
                };

                var SerializationCountingFormObject = function (input) {
                    return {
                        recordId: input.recordId,//新增
                        //busId: input.busId,//不再传车辆id，改为传车辆编号，后台进行查询，如果不存在则返回错误信息。  by vern 2016-8-26
                        bus: {
                            cBusCode:input.bus.cBusCode
                        },
                        coinMoney: input.coinMoney,
                        deptOID: input.dept.id,
                        /*distributedList: input.distributedList,*/
                        fakeMoney: input.fakeMoney,
                        //lineId: input.lineId,//不再传线路id，改为传线路编号，后台进行查询，如果不存在则返回错误信息。  by vern 2016-8-26
                        line: {
                            iLineCode:input.line.iLineCode
                        },
                        moneyBagNum: input.moneyBagNum,
                        paperMoney: input.paperMoney,
                        recordTime: $filter('date')(input.recordTime, 'yyyy-MM-dd HH:mm:ss'),
                        remark: input.remark,
                        teamOID: input.team.id,
                        tradeDate: $filter('date')(input.tradeDate, 'yyyy-MM-dd'),
                        validMoney: input.validMoney
                    }
                };

                var SerializationCountingRequestObject = function (input) {
                    var returnVal = {
                        tradeDate: input.tradeDate ? $filter('date')(input.tradeDate, 'yyyy-MM-dd') : "",
                        deptOID: input.dept.id ? input.dept.id : "",
                        teamOID: input.team.id ? input.team.id : "",
                        recordTime: input.recordTime ? $filter('date')(input.recordTime, 'yyyy-MM-dd HH:mm:ss') : ""
                    };
                    return returnVal;
                };

                return {
                    SerializationDriverArray: SerializationDriverArray,
                    SerializationCountingList: SerializationCountingList,
                    SerializationCountingFormObject: SerializationCountingFormObject,
                    SerializationCountingRequestObject: SerializationCountingRequestObject
                }
            }
        ]
    );
