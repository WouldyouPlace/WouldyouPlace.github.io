/**
 * Created by Manster on 7/15/16.
 */
/**
 * 接口列表 : 日常管理
 */

 // 管理卡发放
 function CardGrant() {
     var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

     var GetCardList = SERVER_PATH + 'coreStaffCardService/list';
     var AddCard = SERVER_PATH + 'sysUserService/add';
     var GetGroupList = SERVER_PATH + 'coreGroupService/getGroup';

     return {
         GetCardList: GetCardList,
         AddCard: AddCard,
         GetGroupList: GetGroupList
     }

 }

 // 考勤管理
 function AttendanceManagement() {
     var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

     var GetAttendanceList = SERVER_PATH + 'attendanceService/list';

     return {
         GetAttendanceList: GetAttendanceList
     }

 }

 // 点钞管理
function CountingManagement() {
    var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

    var GetCountingList = SERVER_PATH + 'cashRecordsService/list';
    var AddCounting = SERVER_PATH + 'cashRecordsService/add';
    var EditCounting = SERVER_PATH + 'cashRecordsService/update';
    var DelCounting = SERVER_PATH + 'cashRecordsService/delete';
    var GetCountingDetail = SERVER_PATH + 'cashRecordsService/detail';
    var GetOrganizationTree = SERVER_PATH + 'coreOrganizationService/getOrganizationTree';
    var GetTeamList = SERVER_PATH + 'routesRanksService/getRoutesRanks';
    var FindUserByNameCN = SERVER_PATH + 'routesRanksService/getRoutesRanks';


    return {
        GetCountingList: GetCountingList,
        AddCounting: AddCounting,
        EditCounting: EditCounting,
        DelCounting: DelCounting,
        GetCountingDetail: GetCountingDetail,
        GetOrganizationTree: GetOrganizationTree,
        GetTeamList: GetTeamList,
        FindUserByNameCN: FindUserByNameCN
    }
}

// 排班管理
function ScheduleManagement() {
    var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

    var GetScheduleList = SERVER_PATH + 'schedualeService/list';
    var AddSchedule = SERVER_PATH + 'schedualeService/add';
    var UpdateSchedule = SERVER_PATH + 'schedualeService/update';
    var DeleteSchedule = SERVER_PATH + 'schedualeService/delete';
    var IsBusIdValid = SERVER_PATH + 'schedualeService/IsBusId';
    var GetUserName = SERVER_PATH + 'schedualeService/getUserName';
    var GetStation = SERVER_PATH + 'stationService/getStation';
    var GetLine = SERVER_PATH + 'coreLineService/getLine';

    return {
        GetScheduleList: GetScheduleList,
        AddSchedule: AddSchedule,
        UpdateSchedule: UpdateSchedule,
        DeleteSchedule: DeleteSchedule,
        IsBusIdValid: IsBusIdValid,
        GetUserName: GetUserName,
        GetStation: GetStation,
        GetLine: GetLine
    }

}

// Sim卡欠费警报
function SimArrearsWarning() {
    var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

    var GetWarningList = SERVER_PATH + 'SIMWarningService/list';

    return {
        GetWarningList: GetWarningList
    }
}

// 采集中心管理
function CollectionCenterManagement() {
    var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

    var GetCollectionList = SERVER_PATH + 'coreCollectionService/list';
    var AddCollection = SERVER_PATH + 'coreCollectionService/add';
    var EditCollection = SERVER_PATH + 'coreCollectionService/update';
    var DelCollection = SERVER_PATH + 'coreCollectionService/delete';
    var GetDeptTreeList = SERVER_PATH + 'coreOrganizationService/getOrganizationTree';
    var GetTeamList = SERVER_PATH + 'routesRanksService/getRoutesRanks';

    return {
        GetCollectionList: GetCollectionList,
        AddCollection: AddCollection,
        EditCollection: EditCollection,
        DelCollection: DelCollection,
        GetDeptTreeList: GetDeptTreeList,
        GetTeamList: GetTeamList
    }
}

// 事故违章登记
function ViolationLog() {
    var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

    var GetViolationList = SERVER_PATH + 'peccancyService/list'
    var AddViolation = SERVER_PATH + 'peccancyService/add';
    var EditViolation = SERVER_PATH + 'peccancyService/update';

    return {
        GetViolationList: GetViolationList,
        AddViolation: AddViolation,
        EditViolation: EditViolation
    }
}

// 出车回厂登记
function DepartRegress() {
    var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

    var GetDepartRegressList = SERVER_PATH + 'departRegressService/list';
    var AddDepartRegress = SERVER_PATH + 'departRegressService/add';
    var EditDepartRegress = SERVER_PATH + 'departRegressService/update';

    return {
        GetDepartRegressList: GetDepartRegressList,
        AddDepartRegress: AddDepartRegress,
        EditDepartRegress: EditDepartRegress
    }
}

// 数据采集与设置 -> 参数管理
function ParamManagement() {
    var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

    var GetParamList = SERVER_PATH + 'iniParamService/list';
    var GetParamDetail = SERVER_PATH + 'iniParamService/detail';
    var AddParam = SERVER_PATH + 'iniParamService/add';
    var EditParam = SERVER_PATH + 'iniParamService/update';
    var DelParam = SERVER_PATH + 'iniParamService/delete';

    return {
        GetParamList: GetParamList,
        GetParamDetail: GetParamDetail,
        AddParam: AddParam,
        EditParam: EditParam,
        DelParam: DelParam
    }
}

// 车辆规费登记
function VehicleCharges() {
    var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

    var GetChargesList = SERVER_PATH + 'chargeRegisterService/list';
    var AddCharges = SERVER_PATH + 'chargeRegisterService/add';
    var EditCharges = SERVER_PATH + 'chargeRegisterService/update';
    var DelCharges = SERVER_PATH + 'chargeRegisterService/delete';

    return {
        GetChargesList: GetChargesList,
        AddCharges: AddCharges,
        EditCharges: EditCharges,
        DelCharges: DelCharges
    }
}

// 主程序管理
function MainAppManagement() {
    var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

    var GetMainAppList = SERVER_PATH + 'dataFileService/list';
    var AddMainApp = SERVER_PATH + 'dataFileService/add';
    var DelMainApp = SERVER_PATH + 'dataFileService/delete';

    return {
        GetMainAppList: GetMainAppList,
        AddMainApp: AddMainApp,
        DelMainApp: DelMainApp
    }
}

// 白名单管理
function WhiteList() {
    var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

    var GetWhiteList= SERVER_PATH + 'dataFileService/list';
    var CollectionWhiteList = SERVER_PATH + 'dataFileService/collection';
    var DelWhiteList = SERVER_PATH + 'dataFileService/delete';

    return {
        GetWhiteList: GetWhiteList,
        CollectionWhiteList: CollectionWhiteList,
        DelWhiteList: DelWhiteList
    }
}

// 读写板程序管理
function RwBoardAppManagement() {
    var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

    var GetRwBoardAppList = SERVER_PATH + 'dataFileService/list';
    var AddRwBoardApp = SERVER_PATH + 'dataFileService/add';
    var DelRwBoardApp = SERVER_PATH + 'dataFileService/delete';

    return {
        GetRwBoardAppList: GetRwBoardAppList,
        AddRwBoardApp: AddRwBoardApp,
        DelRwBoardApp: DelRwBoardApp
    }
}

// 黑名单管理
function BlacklistManagement() {
    var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

    var GetBlacklist= SERVER_PATH + 'dataFileService/list';
    var CollectionBlacklist = SERVER_PATH + 'dataFileService/collection';
    var DelBlacklist = SERVER_PATH + 'dataFileService/delete';

    return {
        GetBlacklist: GetBlacklist,
        CollectionBlacklist: CollectionBlacklist,
        DelBlacklist: DelBlacklist
    }
}
