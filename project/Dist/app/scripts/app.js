'use strict';

/**
 * @ngdoc overview
 * @name angularAceAdminApp
 * @description
 * # angularAceAdminApp
 *
 * Main module of the application.
 */
angular
    .module('angularAceAdminApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ui.router',
        'ngFileUpload'
    ])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$compileProvider',
        function ($stateProvider, $urlRouterProvider, $compileProvider) {
            // angular默认的安全协议为 https?|ftp|mailto , 在这里重新配置加入javascript (用于创建导航时下拉菜单时使用)
            // The angular default security protocol is : https?|ftp|mailto
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/);

            // 当页面路由没有定义时, 将页面跳转到登录页面
            // Redirect Url when route does not define in here
            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'views/frame/login.html',
                    controller: 'LoginCtrl'
                })
                .state('main', {
                    url: '/main',
                    templateUrl: 'views/frame/main.html',
                    controller: 'MainCtrl',
                    resolve: {
                        navDataList: [
                            'NavigationServices',
                            'CommonService',
                            '$q',
                            function (NavigationServices, CommonService, $q) {
                                var user = CommonService.getUserCookies();
                                var defer = $q.defer();
                                NavigationServices.getNavigationData({roleId: user.roleId}).then(function (data) {
                                    defer.resolve(data);
                                });
                                return defer.promise;
                            }
                        ]
                    }
                })
                // 系统管理 -> 菜单管理
                .state('main.menuManagement', {
                    url: '/SystemManagement/MenuManagement',
                    views: {
                        'content': {
                            templateUrl: 'views/SystemManagement/MenuManagement/menuManagement.html',
                            controller: 'MenuManagementCtrl',
                            resolve: {
                                'MenuList': [
                                    'SystemManagementService',
                                    '$q',
                                    function (SystemManagementService, $q) {
                                        var defer = $q.defer();
                                        SystemManagementService.SystemManagement_GetMenuList().then(function (data) {
                                            defer.resolve(data);
                                        });
                                        return defer.promise;
                                    }
                                ]
                            }
                        }
                    }
                })
                // 系统管理 -> 用户管理
                .state('main.userManagement', {
                    url: '/SystemManagement/UserManagement',
                    views: {
                        'content': {
                            templateUrl: 'views/SystemManagement/UserManagement/userManagement.html',
                            controller: 'UserManagementCtrl',
                            resolve: {
                                'UserList': [
                                    'SystemManagementService',
                                    '$q',
                                    function (SystemManagementService, $q) {
                                        var defer = $q.defer();
                                        var emptyObj = {
                                            page: {
                                                pageNo: 1,
                                                pageSize: 10
                                            },
                                            user: {
                                                OID: "",
                                                address: "",
                                                birthday: "",
                                                carNum: [],
                                                carType: "",
                                                cardID: "",
                                                dept: null,
                                                deptOID: "",
                                                group: {
                                                    cid: "",
                                                    code: "",
                                                    iLineId: "",
                                                    id: "",
                                                    name: "",
                                                    note: "",
                                                    pid: "",
                                                    routeId: ""
                                                },
                                                groupOID: "",
                                                jobNumber: "",
                                                license: "",
                                                licensingDate: "",
                                                location: "",
                                                loginName: "",
                                                nameCN: "",
                                                password: "",
                                                phone: "",
                                                remark: "",
                                                role: null,
                                                roleId: "",
                                                salt: "",
                                                sex: "",
                                                state: 0,
                                                team: null,
                                                teamOID: "",
                                                tel: "",
                                                validBeginDate: "",
                                                validYear: ""
                                            }
                                        };
                                        SystemManagementService.UserManagement_GetUserList(emptyObj).then(function (data) {
                                            defer.resolve(data);
                                        });
                                        return defer.promise;
                                    }
                                ]
                            }
                        }
                    }
                })
                // 系统管理 -> 角色管理
                .state('main.RoleManagement', {
                    url: '/SystemManagement/RoleManagement',
                    views: {
                        'content': {
                            templateUrl: 'views/SystemManagement/RoleManagement/roleManagement.html',
                            controller: 'RoleManagementCtrl',
                            resolve: {
                                'RoleList': [
                                    'SystemManagementService',
                                    '$q',
                                    function (SystemManagementService, $q) {
                                        var defer = $q.defer();
                                        var emptyObj = {
                                            role: {
                                                id: '',
                                                nameCN: '',
                                                level: '',
                                                orderNum: '',
                                                remark: '',
                                                valid: '',
                                                privilege: ''
                                            },
                                            page: {
                                                pageNo: 1,
                                                pageSize: 10
                                            }
                                        };
                                        SystemManagementService.RoleManagement_GetRoleList(emptyObj).then(function (data) {
                                            defer.resolve(data);
                                        });
                                        return defer.promise;
                                    }
                                ]
                            }
                        }
                    }
                })
                // 系统管理 -> 组织机构管理
                .state('main.OrganizationManagement', {
                    url: '/SystemManagement/OrganizationManagement',
                    views: {
                        'content': {
                            templateUrl: 'views/SystemManagement/OrganizationManagement/organizationManagement.html',
                            controller: 'OrganizationManagementCtrl'
                        }
                    }
                })
                // 系统管理 -> 车站管理
                .state('main.StationManagement', {
                    url: '/SystemManagement/StationManagement',
                    views: {
                        'content': {
                            templateUrl: 'views/SystemManagement/StationManagement/stationManagement.html',
                            controller: 'StationManagementCtrl',
                            resolve: {
                                'StationList': [
                                    'SystemManagementService',
                                    '$q',
                                    function (SystemManagementService, $q) {
                                        var defer = $q.defer();
                                        var emptyObj = {
                                            station: {
                                                id: '',
                                                regionCode: '',
                                                name: '',
                                                longitude: '',
                                                latitude: '',
                                                content: '',
                                                delFlag: '',
                                                region: ''
                                            },
                                            page: {
                                                pageNo: 1,
                                                pageSize: 10
                                            }
                                        };
                                        SystemManagementService.StationManagement_GetStationList(emptyObj).then(function (data) {
                                            defer.resolve(data);
                                        });
                                        return defer.promise;
                                    }
                                ]
                            }
                        }
                    }
                })
                // 系统管理 -> 公交车管理
                .state('main.BusManagement', {
                    url: '/SystemManagement/BusManagement',
                    views: {
                        'content': {
                            templateUrl: 'views/SystemManagement/BusManagement/busManagement.html',
                            controller: 'BusManagementCtrl',
                            resolve: {
                                'BusList': [
                                    'SystemManagementService',
                                    '$q',
                                    function (SystemManagementService, $q) {
                                        var defer = $q.defer();
                                        var emptyObj = {
                                            bus: {
                                                iBusId: '',
                                                cBusCode: '',
                                                iRegionCode: '',
                                                cOrgCode: '',
                                                iLineCode: '',
                                                iBusType: '',
                                                iDelFlag: ''
                                            },
                                            page: {
                                                pageNo: 1,
                                                pageSize: 10
                                            }
                                        };
                                        SystemManagementService.BusManagement_GetBusList(emptyObj).then(function (data) {
                                            defer.resolve(data);
                                        });
                                        return defer.promise;
                                    }
                                ]
                            }
                        }
                    }
                })
                // 日常管理 -> 考勤管理
                .state('main.AttendanceManagement', {
                    url: '/DailyManagement/AttendanceManagement',
                    views: {
                        'content': {
                            templateUrl: 'views/DailyManagement/AttendanceManagement/attendanceManagement.html',
                            controller: 'AttendanceManagementCtrl',
                            resolve: {
                                AttendanceList: [
                                    'DailyManagementService',
                                    '$q',
                                    function (DailyManagementService, $q) {
                                        var defer = $q.defer();
                                        var emptyObj = {
                                            attendance: {
                                                id: '',
                                                name: '',
                                                dtTrade: '',
                                                driverCode: '',
                                                busCode: ''
                                            },
                                            page: {
                                                pageNo: 1,
                                                pageSize: 10
                                            }
                                        };
                                        DailyManagementService.AttendanceManagement_GetAttendanceList(emptyObj).then(function (data) {
                                            defer.resolve(data);
                                        });
                                        return defer.promise;
                                    }
                                ]
                            }
                        }
                    }
                })
                // 日常管理 -> 管理卡发放
                .state('main.cardGrant', {
                    url: '/DailyManagement/CardGrant',
                    views: {
                        'content': {
                            templateUrl: 'views/DailyManagement/CardGrant/cardGrant.html', // 视图的路径
                            controller: 'CardGrantCtrl',    // 视图所对应的控制器
                            resolve: {  // 页面显示之前所需加载在的数据
                                CardInfoList: [
                                    'DailyManagementService',
                                    '$q',
                                    function (DailyManagementService, $q) {
                                        var defer = $q.defer();
                                        var emptyObj = {
                                            card: {
                                                cardNo: "",
                                                coreCard: {
                                                    cardNo: "",
                                                    cardType: 0
                                                },
                                                dtTime: "",
                                                groupName: "",
                                                lineName: "",
                                                nameCN: "",
                                                userId: ""
                                            },
                                            page: {
                                                pageNo: 1,
                                                pageSize: 10
                                            }
                                        };
                                        DailyManagementService.CardGrant_GetCardInfoList(emptyObj).then(function (data) {
                                            defer.resolve(data);
                                        });
                                        return defer.promise;
                                    }
                                ]
                            }
                        }
                    }
                })
                // 日常管理 -> 点钞
                .state('main.countingManagement', {
                    url: '/DailyManagement/CountingManagement',
                    views: {
                        'content': {
                            templateUrl: 'views/DailyManagement/CountingManagement/countingManagement.html', // 视图的路径
                            controller: 'CountingManagementCtrl',    // 视图所对应的控制器
                            resolve: {  // 页面显示之前所需加载在的数据
                                CountingList: [
                                    'DailyManagementService',
                                    '$q',
                                    function (DailyManagementService, $q) {
                                        var defer = $q.defer();
                                        var emptyObj = {
                                            cashRecords: {
                                                tradeDate: "",
                                                deptOID: "",
                                                teamOID: "",
                                                recordTime: ""
                                            },
                                            page: {
                                                pageNo: 1,
                                                pageSize: 10
                                            }
                                        };
                                        DailyManagementService.CountingManagement_GetCountingList(emptyObj).then(function (data) {
                                            defer.resolve(data);
                                        });
                                        return defer.promise;
                                    }
                                ]
                            }
                        }
                    }
                })
                .state('main.ScheduleManagement', {
                    url: '/DailyManagement/ScheduleManagement',
                    views: {
                        'content': {
                            templateUrl: 'views/DailyManagement/ScheduleManagement/scheduleManagement.html',
                            controller: 'ScheduleManagementCtrl',
                            resolve: {
                                ScheduleList: [
                                    'DailyManagementService',
                                    '$q',
                                    function (DailyManagementService, $q) {
                                        var defer = $q.defer();
                                        var emptyObj = {
                                            scheduale: {
                                                id: "",
                                                beginStation: "",
                                                beginStationId: "",
                                                beginTime: "",
                                                busId: "",
                                                coreBus: "",
                                                coreLine: "",
                                                driver: "",
                                                endStation: "",
                                                endStationId: "",
                                                endTime: "",
                                                lineId: "",
                                                numberDate: "",
                                                numberStatus: "",
                                                remark: "",
                                                steward: ""
                                            },
                                            page: {
                                                pageNo: 1,
                                                pageSize: 10
                                            }
                                        };
                                        DailyManagementService.ScheduleManagement_GetScheduleList(emptyObj).then(function (data) {
                                            defer.resolve(data);
                                        });
                                        return defer.promise;
                                    }
                                ]
                            }
                        }
                    }
                })
                .state('main.SimArrearsWarning', {
                    url: '/DailyManagement/SimArrearsWarning',
                    views: {
                        'content': {
                            templateUrl: 'views/DailyManagement/SimArrearsWarning/simArrearsWarning.html',
                            controller: 'SimArrearsWarningCtrl',
                            resolve: {
                                WarningList: [
                                    'DailyManagementService',
                                    '$q',
                                    function (DailyManagementService, $q) {
                                        var defer = $q.defer();
                                        var emptyObj = {
                                            warning: {
                                                simCode: '',
                                                devCode: '',
                                                lineCode: '',
                                                busCode: '',
                                                offDays: ''
                                            },
                                            page: {
                                                pageNo: 1,
                                                pageSize: 10
                                            }
                                        };
                                        DailyManagementService.SimArrearsWarning_GetWarningList(emptyObj).then(function (data) {
                                            defer.resolve(data);
                                        });
                                        return defer.promise;
                                    }
                                ]
                            }
                        }
                    }
                })
                .state('main.CollectionCenterManagement', {
                    url: '/DailyManagement/CollectionCenterManagement',
                    views: {
                        'content': {
                            templateUrl: 'views/DailyManagement/CollectionCenterManagement/collectionCenterManagement.html',
                            controller: 'CollectionCenterManagementCtrl',
                            resolve: {
                                CollectionList: [
                                    'DailyManagementService',
                                    '$q',
                                    function (DailyManagementService, $q) {
                                        var defer = $q.defer();
                                        var emptyObj = {
                                            collection: {
                                                address: "",
                                                cCcId: "",
                                                cCcName: "",
                                                centerIP: "",
                                                comment: "",
                                                dept: "",
                                                describe: "",
                                                line: "",
                                                phone: "",
                                                team: "",
                                                valid: ""
                                            },
                                            page: {
                                                pageNo: 1,
                                                pageSize: 10
                                            }
                                        };
                                        DailyManagementService.CollectionCenterManagement_GetCollectionList(emptyObj).then(function (data) {
                                            defer.resolve(data);
                                        });
                                        return defer.promise;
                                    }
                                ]
                            }
                        }
                    }
                })
                .state('main.SimManagement', {
                    url: '/SystemManagement/SimManagement',
                    views: {
                        'content': {
                            templateUrl: 'views/SystemManagement/SimManagement/simManagement.html',
                            controller: 'SimManagementCtrl',
                            resolve: {
                                SimList: [
                                    'SystemManagementService',
                                    '$q',
                                    function (SystemManagementService, $q) {
                                        var defer = $q.defer();
                                        var emptyObj = {
                                            SIMInfo: {
                                                dBuyDate: "",
                                                iDevId: "",
                                                iSIMCode: "",
                                                iSIMId: ""
                                            },
                                            page: {
                                                pageNo: 1,
                                                pageSize: 10
                                            }
                                        };
                                        SystemManagementService.SimManagement_GetSimList(emptyObj).then(function (data) {
                                            defer.resolve(data);
                                        });
                                        return defer.promise;
                                    }
                                ]
                            }
                        }
                    }
                })
                .state('main.ViolationLog', {
                    url: '/DailyManagement/ViolationLog',
                    views: {
                        'content': {
                            templateUrl: 'views/DailyManagement/ViolationLog/violationLog.html',
                            controller: 'ViolationLogCtrl',
                            resolve: {
                                ViolationList: [
                                    'DailyManagementService',
                                    '$q',
                                    function (DailyManagementService, $q) {
                                        var defer = $q.defer();
                                        var emptyObj = {
                                            peccancy: {
                                                id: "",
                                                cBusCode: "",
                                                driverId: "",
                                                violationProject: "",
                                                violationDate: "",
                                                violationPlace: "",
                                                money: "",
                                                points: "",
                                                note: "",
                                                account: "",
                                                registrar: ""
                                            },
                                            page: {
                                                pageNo: 1,
                                                pageSize: 10
                                            }
                                        };
                                        DailyManagementService.ViolationLog_GetViolationList(emptyObj).then(function (data) {
                                            defer.resolve(data);
                                        });
                                        return defer.promise;
                                    }
                                ]
                            }
                        }
                    }
                })
                .state('main.DepartRegress', {
                    url: '/DailyManagement/DepartRegress',
                    views: {
                        'content': {
                            templateUrl: 'views/DailyManagement/DepartRegress/departRegress.html',
                            controller: 'DepartRegressCtrl',
                            resolve: {
                                DepartRegressList: [
                                    'DailyManagementService',
                                    '$q',
                                    function (DailyManagementService, $q) {
                                        var defer = $q.defer();
                                        var emptyObj = {
                                            departRegress: {
                                                id: "",
                                                cBusCode: "",
                                                driverId: "",
                                                steward: "",
                                                offDateTime: "",
                                                station: "",
                                                money: "",
                                                mileage: "",
                                                backDateTime: "",
                                                remark: "",
                                                operator: ""
                                            },
                                            page: {
                                                pageNo: 1,
                                                pageSize: 10
                                            }
                                        };
                                        DailyManagementService.DepartRegress_GetDepartRegressList(emptyObj).then(function (data) {
                                            defer.resolve(data);
                                        });
                                        return defer.promise;
                                    }
                                ]
                            }
                        }
                    }
                })
                .state('main.ParamManagement', {
                    url: '/DailyManagement/ParamManagement',
                    views: {
                        'content': {
                            templateUrl: 'views/DailyManagement/ParamManagement/paramManagement.html',
                            controller: 'ParamManagementCtrl',
                            resolve: {
                                ParamList: [
                                    'DailyManagementService',
                                    '$q',
                                    function (DailyManagementService, $q) {
                                        var defer = $q.defer();
                                        DailyManagementService.ParamManagement_GetParamList().then(function (data) {
                                            defer.resolve(data);
                                        });
                                        return defer.promise;
                                    }
                                ]
                            }
                        }
                    }
                })
                .state('main.VehicleCharges', {
                    url: '/DailyManagement/VehicleCharges',
                    views: {
                        'content': {
                            templateUrl: 'views/DailyManagement/VehicleCharges/vehicleCharges.html',
                            controller: 'VehicleChargesCtrl',
                            resolve: {
                                VehicleChargesList: [
                                    'DailyManagementService',
                                    '$q',
                                    function (DailyManagementService, $q) {
                                        var defer = $q.defer();
                                        var emptyObj = {
                                            charges: {
                                                id: "",
                                                cBusCode: "",
                                                registerName: "",
                                                datetime: "",
                                                address: "",
                                                payedMoney: "",
                                                totalMoney: "",
                                                account: "",
                                                remark: "",
                                                operator: ""
                                            },
                                            page: {
                                                pageNo: 1,
                                                pageSize: 10
                                            }
                                        };
                                        DailyManagementService.VehicleCharges_GetChargesList(emptyObj).then(function (data) {
                                            defer.resolve(data);
                                        });
                                        return defer.promise;
                                    }
                                ]
                            }
                        }
                    }
                })
                .state('main.PsamManagement', {
                    url: '/SystemManagement/PsamManagementCtrl',
                    views: {
                        'content': {
                            templateUrl: 'views/SystemManagement/PsamManagement/psamManagement.html',
                            controller: 'PsamManagementCtrl',
                            resolve: {
                                PsamList: [
                                    'SystemManagementService',
                                    '$q',
                                    function (SystemManagementService, $q) {
                                        var defer = $q.defer();
                                        var emptyObj = {
                                            PSAMInfo: {
                                                cIssuerCode: "",
                                                dIssueTime: "",
                                                device: "",
                                                iCardStatus: "",
                                                iDevId: "",
                                                iKeyVerNo: "",
                                                iPSAMCode: "",
                                                iPSAMId: "",
                                                iSAMNum: "",
                                                iSAMVerNo: ""
                                            },
                                            page: {
                                                pageNo: 1,
                                                pageSize: 10
                                            }
                                        };
                                        SystemManagementService.PsamManagement_GetPsamList(emptyObj).then(function (data) {
                                            defer.resolve(data);
                                        });
                                        return defer.promise;
                                    }
                                ]
                            }
                        }
                    }
                })
                .state('main.MainApp', {
                    url: '/DailyManagement/MainAppManagement',
                    views: {
                        'content': {
                            templateUrl: 'views/DailyManagement/MainAppManagement/mainAppManagement.html',
                            controller: 'MainAppManagementCtrl',
                            resolve: {
                                MainAppList: [
                                    'DailyManagementService',
                                    '$q',
                                    function (DailyManagementService, $q) {
                                        var defer = $q.defer();
                                        var emptyObj = {
                                            dataFile: {
                                                "iFileType": 1
                                            },
                                            page: {
                                                pageNo: 1,
                                                pageSize: 10
                                            }
                                        };
                                        DailyManagementService.MainAppManagement_GetMainAppList(emptyObj).then(function (data) {
                                            defer.resolve(data);
                                        });
                                        return defer.promise;
                                    }
                                ]
                            }
                        }
                    }
                })
                .state('main.WhiteList', {
                    url: '/DailyManagement/WhiteList',
                    views: {
                        'content': {
                            templateUrl: 'views/DailyManagement/WhiteList/whiteList.html',
                            controller: 'WhiteListCtrl',
                            resolve: {
                                WhiteList: [
                                    'DailyManagementService',
                                    '$q',
                                    function (DailyManagementService, $q) {
                                        var defer = $q.defer();
                                        var emptyObj = {
                                            dataFile: {
                                                "iFileType": 5
                                            },
                                            page: {
                                                pageNo: 1,
                                                pageSize: 10
                                            }
                                        };
                                        DailyManagementService.WhiteList_GetWhiteList(emptyObj).then(function (data) {
                                            defer.resolve(data);
                                        });
                                        return defer.promise;
                                    }
                                ]
                            }
                        }
                    }
                })
                .state('main.RwBoardManagement', {
                    url: '/DailyManagement/RwBoardManagement',
                    views: {
                        'content': {
                            templateUrl: 'views/DailyManagement/RwBoardManagement/rwBoardManagement.html',
                            controller: 'RwBoardManagementCtrl',
                            resolve: {
                                RwBoardList: [
                                    'DailyManagementService',
                                    '$q',
                                    function (DailyManagementService, $q) {
                                        var defer = $q.defer();
                                        var emptyObj = {
                                            dataFile: {
                                                "iFileType": 2
                                            },
                                            page: {
                                                pageNo: 1,
                                                pageSize: 10
                                            }
                                        };
                                        DailyManagementService.RwBoardAppManagement_GetRwBoardAppList(emptyObj).then(function (data) {
                                            defer.resolve(data);
                                        });
                                        return defer.promise;
                                    }
                                ]
                            }
                        }
                    }
                })
                .state('main.BlacklistManagement', {
                    url: '/DailyManagement/BlacklistManagement',
                    views: {
                        'content': {
                            templateUrl: 'views/DailyManagement/BlacklistManagement/blacklistManagement.html',
                            controller: 'BlacklistManagementCtrl',
                            resolve: {
                                Blacklist: [
                                    'DailyManagementService',
                                    '$q',
                                    function (DailyManagementService, $q) {
                                        var defer = $q.defer();
                                        var emptyObj = {
                                            dataFile: {
                                                "iFileType": 4
                                            },
                                            page: {
                                                pageNo: 1,
                                                pageSize: 10
                                            }
                                        };
                                        DailyManagementService.BlacklistManagement_GetBlacklist(emptyObj).then(function (data) {
                                            defer.resolve(data);
                                        });
                                        return defer.promise;
                                    }
                                ]
                            }
                        }
                    }
                });
        }
    ]);
