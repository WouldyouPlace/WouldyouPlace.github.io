/**
 * Created by Manster on 7/15/16.
 */
function SERVER_CONFIGURATION() { //
    var CONFIG = {
        Path: 'localhost:63342/WouldyouPlace.github.io/project/Dist/app/'
    };

    /**
     * 获取服务器配置信息
     * @returns {{Path: string}}
     */
    function getServerConfig() {
        return CONFIG;
    }

    /**
     * 定义接口
     * @returns {{FrameInterface: FrameInterface, SystemManagementInterface: SystemManagementInterface, DailyManagementInterface: DailyManagementInterface, VehicleMonitoringInterface: VehicleMonitoringInterface, CustomerRetentionInterface: CustomerRetentionInterface, KPIInterface: KPIInterface}}
     */
    function getInterface() {

        // 框架
        function FrameInterface() {
            return {
                NavigationInterface: NavigationInterface(),
                UserInterface: UserInterface()
            };
        }


        // 系统管理
        function SystemManagementInterface() {
            return {
                MenuManagement: MenuManagement(),
                UserManagement: UserManagement(),
                RoleManagement: RoleManagement(),
                StationManagement: StationManagement(),
                BusManagement: BusManagement(),
                SimManagement: SimManagement(),
                PsamManagement: PsamManagement()
            };
        }

        // 日常管理
        function DailyManagementInterface() {
            return {
                CardGrant: CardGrant(),
                AttendanceManagement: AttendanceManagement(),
                CountingManagement: CountingManagement(),
                ScheduleManagement: ScheduleManagement(),
                SimArrearsWarning: SimArrearsWarning(),
                CollectionCenterManagement: CollectionCenterManagement(),
                ViolationLog: ViolationLog(),
                DepartRegress: DepartRegress(),
                ParamManagement: ParamManagement(),
                VehicleCharges: VehicleCharges(),
                MainAppManagement: MainAppManagement(),
                WhiteList: WhiteList(),
                RwBoardAppManagement: RwBoardAppManagement(),
                BlacklistManagement: BlacklistManagement()
            };
        }

        // 车辆监控
        function VehicleMonitoringInterface() {

        }

        // 客户维系
        function CustomerRetentionInterface() {

        }

        // KPI
        function KPIInterface() {

        }

        return {
            FrameInterface: FrameInterface,
            SystemManagementInterface: SystemManagementInterface,
            DailyManagementInterface: DailyManagementInterface,
            VehicleMonitoringInterface: VehicleMonitoringInterface,
            CustomerRetentionInterface: CustomerRetentionInterface,
            KPIInterface: KPIInterface
        }
    }

    return {
        getServerConfig: getServerConfig,
        getInterface: getInterface
    };
}
