'use strict';

/**
 * @ngdoc service
 * @name angularAceAdminApp.SystemManagementService
 * @description
 * # SystemManagementService
 * Service in the angularAceAdminApp.
 */
angular.module('angularAceAdminApp')
    .factory('SystemManagementService', [
        '$http',
        '$q',
        '$filter',
        function ($http, $q, $filter) {

            var SERVER_INTERFACE = SERVER_CONFIGURATION().getInterface().SystemManagementInterface();

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


            /**
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          菜单管理
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            var SystemManagement_GetMenuList = function () {
                var defer = $q.defer();
                return requestDataFormServer(defer, null, SERVER_INTERFACE.MenuManagement.GetMenuList);
            };

            var SystemManagement_AddMenu = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.MenuManagement.AddMenu);
            };

            var SystemManagement_EditMenu = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.MenuManagement.EditMenu);
            };

            var SystemManagement_DelMenu = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.MenuManagement.DelMenu);
            };

            var SystemManagement_GetParentIdList = function () {
                var defer = $q.defer();
                return requestDataFormServer(defer, null, SERVER_INTERFACE.MenuManagement.GetParentIdList);
            };

            /**
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          用户管理
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            var UserManagement_GetUserList = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.UserManagement.GetUserList);

            };

            var UserManagement_AddUser = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, $filter('UserManagementFilter_SerializationFormObject')(data), SERVER_INTERFACE.UserManagement.AddUser);
            };

            var UserManagement_EditUser = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, $filter('UserManagementFilter_SerializationFormObject')(data), SERVER_INTERFACE.UserManagement.EditUser);
            };

            var UserManagement_DelUser = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.UserManagement.DelUser);
            };

            var UserManagement_GetUserDetailById = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.UserManagement.GetUserDetailById);
            };

            var UserManagement_GetDeptList = function () {
                var defer = $q.defer();
                return requestDataFormServer(defer, null, SERVER_INTERFACE.UserManagement.GetDeptList);
            };

            var UserManagement_GetTeamList = function () {
                var defer = $q.defer();
                return requestDataFormServer(defer, null, SERVER_INTERFACE.UserManagement.GetTeamList);
            };

            var UserManagement_GetRoleList = function () {
                var defer = $q.defer();
                return requestDataFormServer(defer, null, SERVER_INTERFACE.UserManagement.GetRoleList);
            };

            var UserManagement_GetGroupList = function () {
                var defer = $q.defer();
                return requestDataFormServer(defer, null, SERVER_INTERFACE.UserManagement.GetGroupList);
            };



            /**
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          角色管理
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */

            var RoleManagement_GetRoleList = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.RoleManagement.GetRoleList);
            };

            var RoleManagement_AddRole = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.RoleManagement.AddRole);
            };

            var RoleManagement_EditRole = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.RoleManagement.EditRole);
            };

            var RoleManagement_DelRole = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.RoleManagement.DelRole);
            };

            var RoleManagement_GetRoleDetail = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.RoleManagement.GetRoleDetail);
            };

            var RoleManagement_GetPermissionTree = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.RoleManagement.GetPermissionTree);
            };



            /**
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          车站管理
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */

            var StationManagement_GetStationList = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.StationManagement.GetStationList);
            };

            var StationManagement_AddStation = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, $filter('stationManagementFilter').FormDataFilter(data), SERVER_INTERFACE.StationManagement.AddStation);
            };

            var StationManagement_EditStation = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, $filter('stationManagementFilter').FormDataFilter(data), SERVER_INTERFACE.StationManagement.EditStation);
            };

            var StationManagement_DelStation = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.StationManagement.DelStation);
            };

            var StationManagement_ReDelStation = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.StationManagement.ReDelStation);
            };

            var StationManagement_GetRegionList = function () {
                var defer = $q.defer();
                return requestDataFormServer(defer, null, SERVER_INTERFACE.StationManagement.GetRegionList);
            };



            /**
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          车站管理
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            var BusManagement_GetBusList = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.BusManagement.GetBusList);
            };

            var BusManagement_AddBus = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.BusManagement.AddBus);
            };

            var BusManagement_EditBus = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.BusManagement.EditBus);
            };

            var BusManagement_GetBusTypeList = function () {
                return [
                    {
                        id: 1,
                        name: "普通"
                    },
                    {
                        id: 2,
                        name: "有轨电车"
                    },
                    {
                        id: 3,
                        name: "无轨电车"
                    },
                    {
                        id: 4,
                        name: "天然气"
                    },
                    {
                        id: 5,
                        name: "电动"
                    },
                    {
                        id: 6,
                        name: "混合动力"
                    }
                ];
            };

            /**
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          Sim卡管理
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            var SimManagement_GetSimList = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.SimManagement.GetSimList);
            };
            var SimManagement_AddSim = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.SimManagement.AddSim);
            };
            var SimManagement_EditSim = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.SimManagement.EditSim);
            };
            var SimManagement_DelSim = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.SimManagement.DelSim);
            };
            var SimManagement_IsUseSIMCode = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.SimManagement.IsUseSIMCode);
            };
            // var SimManagement_IsUseDevId = function (data) {
            var SimManagement_GetDevice = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.SimManagement.GetDevice);
            };

            /**
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             *                          Psam卡管理
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             */
            var PsamManagement_GetPsamList = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.PsamManagement.GetPsamList);
            };
            var PsamManagement_AddPasm = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.PsamManagement.AddPasm);
            };
            var PsamManagement_EditPasm = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.PsamManagement.EditPasm);
            };
            var PsamManagement_DelPasm = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.PsamManagement.DelPasm);
            };
            var PsamManagement_IsUsePSAMCode = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.PsamManagement.IsUsePSAMCode);
            };
            var PsamManagement_IsUseNum = function (data) {
                var defer = $q.defer();
                return requestDataFormServer(defer, data, SERVER_INTERFACE.PsamManagement.IsUseNum);
            };
            var PsamManagement_GetStateArray = function () {
                return [
                    {
                        name: '异常',
                        id: 0
                    },
                    {
                        name: '正常',
                        id: 1
                    }
                ]
            };

            return {
                // 菜单管理
                SystemManagement_GetMenuList: SystemManagement_GetMenuList,
                SystemManagement_AddMenu: SystemManagement_AddMenu,
                SystemManagement_EditMenu: SystemManagement_EditMenu,
                SystemManagement_DelMenu: SystemManagement_DelMenu,
                SystemManagement_GetParentIdList: SystemManagement_GetParentIdList,
                // 用户管理
                UserManagement_GetUserList: UserManagement_GetUserList,
                UserManagement_AddUser: UserManagement_AddUser,
                UserManagement_EditUser: UserManagement_EditUser,
                UserManagement_DelUser: UserManagement_DelUser,
                UserManagement_GetUserDetailById: UserManagement_GetUserDetailById,
                UserManagement_GetDeptList: UserManagement_GetDeptList,
                UserManagement_GetTeamList: UserManagement_GetTeamList,
                UserManagement_GetRoleList: UserManagement_GetRoleList,
                UserManagement_GetGroupList: UserManagement_GetGroupList,
                // 角色管理
                RoleManagement_GetRoleList: RoleManagement_GetRoleList,
                RoleManagement_AddRole: RoleManagement_AddRole,
                RoleManagement_EditRole: RoleManagement_EditRole,
                RoleManagement_DelRole: RoleManagement_DelRole,
                RoleManagement_GetRoleDetail: RoleManagement_GetRoleDetail,
                RoleManagement_GetPermissionTree: RoleManagement_GetPermissionTree,
                // 车站管理
                StationManagement_GetStationList: StationManagement_GetStationList,
                StationManagement_AddStation: StationManagement_AddStation,
                StationManagement_EditStation: StationManagement_EditStation,
                StationManagement_DelStation: StationManagement_DelStation,
                StationManagement_ReDelStation: StationManagement_ReDelStation,
                StationManagement_GetRegionList: StationManagement_GetRegionList,
                // 公交车管理
                BusManagement_GetBusList: BusManagement_GetBusList,
                BusManagement_AddBus: BusManagement_AddBus,
                BusManagement_EditBus: BusManagement_EditBus,
                BusManagement_GetBusTypeList: BusManagement_GetBusTypeList,
                // Sim卡管理
                SimManagement_GetSimList: SimManagement_GetSimList,
                SimManagement_AddSim: SimManagement_AddSim,
                SimManagement_EditSim: SimManagement_EditSim,
                SimManagement_DelSim: SimManagement_DelSim,
                SimManagement_IsUseSIMCode: SimManagement_IsUseSIMCode,
                SimManagement_GetDevice: SimManagement_GetDevice,
                // Psam卡管理
                PsamManagement_GetPsamList: PsamManagement_GetPsamList,
                PsamManagement_AddPasm: PsamManagement_AddPasm,
                PsamManagement_EditPasm: PsamManagement_EditPasm,
                PsamManagement_DelPasm: PsamManagement_DelPasm,
                PsamManagement_IsUsePSAMCode: PsamManagement_IsUsePSAMCode,
                PsamManagement_IsUseNum: PsamManagement_IsUseNum,
                PsamManagement_GetStateArray: PsamManagement_GetStateArray
            }

        }]);
