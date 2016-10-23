/**
 * Created by Manster on 8/4/16.
 */

// 菜单管理
function MenuManagement() {
    var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

    var GetMenuList = SERVER_PATH + 'sysPrivilegeService/list';               // 获得菜单项
    var AddMenu = SERVER_PATH + 'sysPrivilegeService/add';                    // 添加菜单项
    var EditMenu = SERVER_PATH + 'sysPrivilegeService/update';                // 修改菜单项
    var DelMenu = SERVER_PATH + 'sysPrivilegeService/delete';                 // 删除菜单项
    var GetParentIdList = SERVER_PATH + 'sysPrivilegeService/getAllParentId'; // 获得父级菜单选项

    return {
        GetMenuList: GetMenuList,
        AddMenu: AddMenu,
        EditMenu: EditMenu,
        DelMenu: DelMenu,
        GetParentIdList: GetParentIdList
    }
}

// 用户管理
function UserManagement() {
    var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

    var GetUserList = SERVER_PATH + 'sysUserService/list';
    var AddUser = SERVER_PATH + 'sysUserService/add';
    var EditUser = SERVER_PATH + 'sysUserService/update';
    var DelUser = SERVER_PATH + 'sysUserService/delete';
    var GetUserDetailById = SERVER_PATH + 'sysUserService/detail';
    var GetDeptList = SERVER_PATH + 'coreOrganizationService/getOrganizationTree';
    var GetTeamList = SERVER_PATH + 'routesRanksService/getRoutesRanks';
    var GetRoleList = SERVER_PATH + 'sysRoleService/findRole';
    var GetGroupList = SERVER_PATH + 'coreGroupService/getGroup';

    return {
        GetUserList: GetUserList,
        AddUser: AddUser,
        EditUser: EditUser,
        DelUser: DelUser,
        GetUserDetailById: GetUserDetailById,
        GetDeptList: GetDeptList,
        GetTeamList: GetTeamList,
        GetRoleList: GetRoleList,
        GetGroupList: GetGroupList
    }
}

// 角色管理
function RoleManagement() {
    var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

    var GetRoleList = SERVER_PATH + 'sysRoleService/list';
    var AddRole = SERVER_PATH + 'sysRoleService/add';
    var EditRole = SERVER_PATH + 'sysRoleService/update';
    var DelRole = SERVER_PATH + 'sysRoleService/delete';
    var GetRoleDetail = SERVER_PATH + 'sysRoleService/detail';
    var GetPermissionTree = SERVER_PATH + 'sysRoleService/tree';

    return {
        GetRoleList: GetRoleList,
        AddRole: AddRole,
        EditRole: EditRole,
        DelRole: DelRole,
        GetRoleDetail: GetRoleDetail,
        GetPermissionTree: GetPermissionTree
    }

}

// 车站管理
function StationManagement() {
    var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

    var GetStationList = SERVER_PATH + 'stationService/list';
    var AddStation = SERVER_PATH + 'stationService/add';
    var EditStation = SERVER_PATH + 'stationService/update';
    var DelStation = SERVER_PATH + 'stationService/delete';
    var ReDelStation = SERVER_PATH + 'stationService/reDelete';
    var GetRegionList = SERVER_PATH + 'json/SystemManagement/StationManagement/StationManagement_RegionList.json';

    return {
        GetStationList: GetStationList,
        AddStation: AddStation,
        EditStation: EditStation,
        DelStation: DelStation,
        ReDelStation: ReDelStation,
        GetRegionList: GetRegionList
    }
}

// 公交车管理
function BusManagement() {
    var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

    var GetBusList = SERVER_PATH + 'coreBusService/list';
    var AddBus = SERVER_PATH + 'coreBusService/add';
    var EditBus = SERVER_PATH + 'coreBusService/update';

    return {
        GetBusList: GetBusList,
        AddBus: AddBus,
        EditBus: EditBus
    }
}

// Sim卡管理
function SimManagement() {
    var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

    var GetSimList = SERVER_PATH + 'SIMService/list';
    var AddSim = SERVER_PATH + 'SIMService/add';
    var EditSim = SERVER_PATH + 'SIMService/update';
    var DelSim = SERVER_PATH + 'SIMService/delete';
    var IsUseSIMCode = SERVER_PATH + 'SIMService/IsUseSIMCode';
    var GetDevice = SERVER_PATH + 'deviceService/getDevice';

    return {
        GetSimList: GetSimList,
        AddSim: AddSim,
        EditSim: EditSim,
        DelSim: DelSim,
        IsUseSIMCode: IsUseSIMCode,
        GetDevice: GetDevice
    }

}

// Psam卡管理
function PsamManagement() {
    var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

    var GetPsamList = SERVER_PATH + 'PSAMService/list';
    var AddPasm = SERVER_PATH + 'PSAMService/add';
    var EditPasm = SERVER_PATH + 'PSAMService/update';
    var DelPasm = SERVER_PATH + 'PSAMService/delete';
    var IsUsePSAMCode = SERVER_PATH + 'PSAMService/IsUsePSAMCode';
    var IsUseNum = SERVER_PATH + 'deviceService/getDevice';

    return {
        GetPsamList: GetPsamList,
        AddPasm: AddPasm,
        EditPasm: EditPasm,
        DelPasm: DelPasm,
        IsUsePSAMCode: IsUsePSAMCode,
        IsUseNum: IsUseNum
    }
}
