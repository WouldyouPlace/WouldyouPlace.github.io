/**
 * Created by Manster on 7/15/16.
 */

/**
 * 接口列表 : 框架
 */

function NavigationInterface() {
    var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

    var GetNavigationList = SERVER_PATH + 'sysPrivilegeService/getRoleTree';

    return {
        GetNavigationList: GetNavigationList
    }
}