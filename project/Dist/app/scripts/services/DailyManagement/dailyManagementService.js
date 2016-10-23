'use strict';

/**
 * @ngdoc service
 * @name angularAceAdminApp.DailyManagementService
 * @description
 * # DailyManagementService
 * Service in the angularAceAdminApp.
 */
angular.module('angularAceAdminApp')
    .factory('DailyManagementService', [
        '$http',
        '$q',
        'Upload',
        function ($http, $q, Upload) {
            var SERVER_INTERFACE = SERVER_CONFIGURATION().getInterface().DailyManagementInterface();

            function requestDataFormServer(defer, data, url) {
                $http({
                    method: 'POST',
                    data: data,
                    url: url
                })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
                return defer.promise;
            }

            function requestDataFormServerWithFile(defer, data, url) {

                Upload.upload({
                    url: url,
                    data: data
                }).then(function (resp) {
                    defer.reject(resp);
                }, function (resp) {
                    defer.reject(resp);
                }, function (evt) {
                    // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    // angular.forEach(evt.config.data.files, function (item) {
                    //     console.log('progress: ' + progressPercentage + '% ' + item.name);
                    // });
                });

                return defer.promise;
            }

            /**
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          管理卡发放
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */

            //管理卡发放 -> 获得员工卡信息列表
            function CardGrant_GetCardInfoList(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.CardGrant.GetCardList);
            }

            //管理卡发放 -> 添加新员工卡
            function CardGrant_AddCard(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.CardGrant.AddCard);
            }

            //管理卡发放 -> 获取群组列表
            function CardGrant_GetGroupList() {
                var defer = $q.defer();
                return requestDataFormServer(defer, null, SERVER_INTERFACE.CardGrant.GetGroupList);
            }

            /**
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          考勤管理
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */

            //考勤管理 -> 查询考勤信息
            function AttendanceManagement_GetAttendanceList(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.AttendanceManagement.GetAttendanceList);
            }

            /**
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          点钞管理
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */

            function CountingManagement_GetCountingList(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.CountingManagement.GetCountingList);
            }

            function CountingManagement_AddCounting(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.CountingManagement.AddCounting);
            }

            function CountingManagement_EditCounting(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.CountingManagement.EditCounting);
            }

            function CountingManagement_DelCounting(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.CountingManagement.DelCounting);
            }

            function CountingManagement_GetCountingDetail(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.CountingManagement.GetCountingDetail);
            }

            function CountingManagement_GetOrganizationTree() {
                var defer = $q.defer();
                return requestDataFormServer(defer, null, SERVER_INTERFACE.CountingManagement.GetOrganizationTree);
            }

            function CountingManagement_GetTeamList() {
                var defer = $q.defer();
                return requestDataFormServer(defer, null, SERVER_INTERFACE.CountingManagement.GetTeamList);
            }

            function CountingManagement_FindUserByNameCN(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.CountingManagement.FindUserByNameCN);
            }

            /**
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          排班管理
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */

            function ScheduleManagement_GetScheduleList(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.ScheduleManagement.GetScheduleList);
            }

            function ScheduleManagement_AddSchedule(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.ScheduleManagement.AddSchedule);
            }

            function ScheduleManagement_UpdateSchedule(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.ScheduleManagement.UpdateSchedule);
            }

            function ScheduleManagement_DeleteSchedule(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.ScheduleManagement.DeleteSchedule);
            }

            function ScheduleManagement_IsBusIdValid(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.ScheduleManagement.IsBusIdValid);
            }

            function ScheduleManagement_GetUserName(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.ScheduleManagement.GetUserName);
            }

            function ScheduleManagement_GetStation(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.ScheduleManagement.GetStation);
            }

            function ScheduleManagement_GetLine() {
                var defer = $q.defer();
                return requestDataFormServer(defer, null, SERVER_INTERFACE.ScheduleManagement.GetLine);
            }

            function ScheduleManagement_GetScheduleStatusArray() {
                return [
                    {
                        id: 0,
                        name: '异常'
                    },
                    {
                        id: 1,
                        name: '正常'
                    }
                ];
            }

            /**
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          Sim卡欠费警报
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */

            function SimArrearsWarning_GetWarningList(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.SimArrearsWarning.GetWarningList);
            }

            /**
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          采集中心管理
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */

            function CollectionCenterManagement_GetCollectionList(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.CollectionCenterManagement.GetCollectionList);
            }

            function CollectionCenterManagement_AddCollection(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.CollectionCenterManagement.AddCollection);
            }

            function CollectionCenterManagement_EditCollection(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.CollectionCenterManagement.EditCollection);
            }

            function CollectionCenterManagement_DelCollection(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.CollectionCenterManagement.DelCollection);
            }

            function CollectionCenterManagement_GetDeptTreeList() {
                var defer = $q.defer();
                return requestDataFormServer(defer, null, SERVER_INTERFACE.CollectionCenterManagement.GetDeptTreeList);
            }

            function CollectionCenterManagement_GetTeamList() {
                var defer = $q.defer();
                return requestDataFormServer(defer, null, SERVER_INTERFACE.CollectionCenterManagement.GetTeamList);
            }

            /**
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          违章登记
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */

            function ViolationLog_GetViolationList(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.ViolationLog.GetViolationList);
            }
            function ViolationLog_AddViolation(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.ViolationLog.AddViolation);
            }
            function ViolationLog_EditViolation(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.ViolationLog.EditViolation);
            }

            /**
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          出场回场登记
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */

            function DepartRegress_GetDepartRegressList(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.DepartRegress.GetDepartRegressList);
            }

            function DepartRegress_AddDepartRegress(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.DepartRegress.AddDepartRegress);
            }

            function DepartRegress_EditDepartRegress(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.DepartRegress.EditDepartRegress);
            }


            /**
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                  数据采集与设置 -> 参数管理
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */

            function ParamManagement_GetParamList() {
                var defer = $q.defer();
                return requestDataFormServer(defer, null, SERVER_INTERFACE.ParamManagement.GetParamList);
            }

            function ParamManagement_GetParamDetail(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.ParamManagement.GetParamDetail);
            }

            function ParamManagement_AddParam(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.ParamManagement.AddParam);
            }

            function ParamManagement_EditParam(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.ParamManagement.EditParam);
            }

            function ParamManagement_DelParam(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.ParamManagement.DelParam);
            }

            /**
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          车辆规费
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */

            function VehicleCharges_GetChargesList(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.VehicleCharges.GetChargesList);
            }

            function VehicleCharges_AddCharges(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.VehicleCharges.AddCharges);
            }

            function VehicleCharges_EditCharges(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.VehicleCharges.EditCharges);
            }

            function VehicleCharges_DelCharges(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.VehicleCharges.DelCharges);
            }

            /**
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                   数据采集与设置 -> 主程序管理
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */

            function MainAppManagement_GetMainAppList(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.MainAppManagement.GetMainAppList);
            }

            function MainAppManagement_AddMainApp(data) {
                var defer = $q.defer();
                return requestDataFormServerWithFile(defer, data, SERVER_INTERFACE.MainAppManagement.AddMainApp);
            }

            function MainAppManagement_DelMainApp(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.MainAppManagement.DelMainApp);
            }

            /**
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                   数据采集与设置 -> 白名单管理
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */

            function WhiteList_GetWhiteList(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.WhiteList.GetWhiteList);
            }

            function WhiteList_CollectionWhiteList(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.WhiteList.CollectionWhiteList);
            }

            function WhiteList_DelWhiteList(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.WhiteList.DelWhiteList);
            }

            /**
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                   数据采集与设置 -> 读写板程序管理
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */

            function RwBoardAppManagement_GetRwBoardAppList(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.RwBoardAppManagement.GetRwBoardAppList);
            }

            function RwBoardAppManagement_AddRwBoardApp(data) {
                var defer = $q.defer();
                return requestDataFormServerWithFile(defer, data, SERVER_INTERFACE.RwBoardAppManagement.AddRwBoardApp);
            }

            function RwBoardAppManagement_DelRwBoardApp(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.RwBoardAppManagement.DelRwBoardApp);
            }


            /**
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                   数据采集与设置 -> 黑名单管理
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */

            function BlacklistManagement_GetBlacklist(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.BlacklistManagement.GetBlacklist);
            }

            function BlacklistManagement_CollectionBlacklist(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.BlacklistManagement.CollectionBlacklist);
            }

            function BlacklistManagement_DelBlacklist(data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.BlacklistManagement.DelBlacklist);
            }

            return {
                // 管理卡发放
                CardGrant_GetCardInfoList: CardGrant_GetCardInfoList,
                CardGrant_AddCard: CardGrant_AddCard,
                CardGrant_GetGroupList: CardGrant_GetGroupList,
                // 考勤管理
                AttendanceManagement_GetAttendanceList: AttendanceManagement_GetAttendanceList,
                // 点钞管理
                CountingManagement_GetCountingList: CountingManagement_GetCountingList,
                CountingManagement_AddCounting: CountingManagement_AddCounting,
                CountingManagement_EditCounting: CountingManagement_EditCounting,
                CountingManagement_DelCounting: CountingManagement_DelCounting,
                CountingManagement_GetCountingDetail: CountingManagement_GetCountingDetail,
                CountingManagement_GetOrganizationTree: CountingManagement_GetOrganizationTree,
                CountingManagement_GetTeamList: CountingManagement_GetTeamList,
                CountingManagement_FindUserByNameCN: CountingManagement_FindUserByNameCN,
                // 排班管理
                ScheduleManagement_GetScheduleList: ScheduleManagement_GetScheduleList,
                ScheduleManagement_AddSchedule: ScheduleManagement_AddSchedule,
                ScheduleManagement_UpdateSchedule: ScheduleManagement_UpdateSchedule,
                ScheduleManagement_DeleteSchedule: ScheduleManagement_DeleteSchedule,
                ScheduleManagement_IsBusIdValid: ScheduleManagement_IsBusIdValid,
                ScheduleManagement_GetUserName: ScheduleManagement_GetUserName,
                ScheduleManagement_GetStation: ScheduleManagement_GetStation,
                ScheduleManagement_GetLine: ScheduleManagement_GetLine,
                ScheduleManagement_GetScheduleStatusArray: ScheduleManagement_GetScheduleStatusArray,
                // Sim卡欠费报警
                SimArrearsWarning_GetWarningList: SimArrearsWarning_GetWarningList,
                // 采集中心管理
                CollectionCenterManagement_GetCollectionList: CollectionCenterManagement_GetCollectionList,
                CollectionCenterManagement_AddCollection: CollectionCenterManagement_AddCollection,
                CollectionCenterManagement_EditCollection: CollectionCenterManagement_EditCollection,
                CollectionCenterManagement_DelCollection: CollectionCenterManagement_DelCollection,
                CollectionCenterManagement_GetDeptTreeList: CollectionCenterManagement_GetDeptTreeList,
                CollectionCenterManagement_GetTeamList: CollectionCenterManagement_GetTeamList,
                // 违章登记
                ViolationLog_GetViolationList: ViolationLog_GetViolationList,
                ViolationLog_AddViolation: ViolationLog_AddViolation,
                ViolationLog_EditViolation: ViolationLog_EditViolation,
                // 出场回场登记
                DepartRegress_GetDepartRegressList: DepartRegress_GetDepartRegressList,
                DepartRegress_AddDepartRegress: DepartRegress_AddDepartRegress,
                DepartRegress_EditDepartRegress: DepartRegress_EditDepartRegress,
                // 数据采集与设置 -> 参数管理
                ParamManagement_GetParamList: ParamManagement_GetParamList,
                ParamManagement_GetParamDetail: ParamManagement_GetParamDetail,
                ParamManagement_AddParam: ParamManagement_AddParam,
                ParamManagement_EditParam: ParamManagement_EditParam,
                ParamManagement_DelParam: ParamManagement_DelParam, 
                // 车辆规费
                VehicleCharges_GetChargesList: VehicleCharges_GetChargesList,
                VehicleCharges_AddCharges: VehicleCharges_AddCharges,
                VehicleCharges_EditCharges: VehicleCharges_EditCharges,
                VehicleCharges_DelCharges: VehicleCharges_DelCharges,
                // 数据采集与设置 -> 主程序管理
                MainAppManagement_GetMainAppList: MainAppManagement_GetMainAppList,
                MainAppManagement_AddMainApp: MainAppManagement_AddMainApp,
                MainAppManagement_DelMainApp: MainAppManagement_DelMainApp,
                // 数据采集与设置 -> 白名单管理
                WhiteList_GetWhiteList: WhiteList_GetWhiteList,
                WhiteList_CollectionWhiteList: WhiteList_CollectionWhiteList,
                WhiteList_DelWhiteList: WhiteList_DelWhiteList,
                // 数据采集与设置 -> 读写板程序管理
                RwBoardAppManagement_GetRwBoardAppList: RwBoardAppManagement_GetRwBoardAppList,
                RwBoardAppManagement_AddRwBoardApp: RwBoardAppManagement_AddRwBoardApp,
                RwBoardAppManagement_DelRwBoardApp: RwBoardAppManagement_DelRwBoardApp,
                // 数据采集与设置 -> 黑名单管理
                BlacklistManagement_GetBlacklist: BlacklistManagement_GetBlacklist,
                BlacklistManagement_CollectionBlacklist: BlacklistManagement_CollectionBlacklist,
                BlacklistManagement_DelBlacklist: BlacklistManagement_DelBlacklist
            };

        }]);
