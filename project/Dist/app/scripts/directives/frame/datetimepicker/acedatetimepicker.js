'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:aceDatetimepicker
 * @description
 * # aceDatetimepicker
 */
angular.module('angularAceAdminApp')
  .directive('aceDatetimepicker',['dateFilter', function (dateFilter) {
    return {
        restrict: 'EA',
        scope: {
            dateFormat: '@', // default is yyyy-MM-dd
            startDate: '@',
            endDate: '@',
            startView: '@', // default: month
            maxView: '@', // default: decade
            minView: '@', // default: hour
            language: '@', // default: English
            todayBtn: '@',
            dateObject: '=' // 绑定的日期对象, 当日期发生变化时该值会自动更新
        },
        link: function postLink(scope, element, attrs) {
            $(element).val(dateFilter(scope.dateObject, scope.dateFormat));
            initPlug();

            function initPlug() {

                var setting = {
                    forceParse: false,
                    autoclose: true,
                    // format: scope.dateFormat ? scope.dateFormat : 'yyyy-MM-dd', //日期格式， p, P, h, hh, i, ii, s, ss, d, dd, m, mm, M, MM, yy, yyyy 的任意组合
                    startView: scope.startView ? scope.startView : 2, //日期时间选择器打开之后首先显示的视图
                    maxView: scope.maxView ? scope.maxView : 4, //日期时间选择器最高能展示的选择范围视图
                    minView: scope.minView ? scope.minView : 0, //日期时间选择器所能够提供的最精确的时间选择视图
                    todayBtn: scope.todayBtn ? scope.todayBtn : false, // 如果此值为true 或 "linked"，则在日期时间选择器组件的底部显示一个 "Today" 按钮用以选择当前日期。如果是true的话，"Today" 按钮仅仅将视图转到当天的日期，如果是"linked"，当天日期将会被选中。
                    language: scope.language ? scope.language : 'zh-CN'
                };

                // 判断是否配置开始日期参数
                if (scope.startDate) {
                    setting.startDate = scope.startDate;
                }

                // 判断是否配置结束日期参数
                if (scope.endDate) {
                    setting.endDate = scope.endDate;
                }

                // 初始化日期插件
                $(element).datetimepicker(setting);

                // 设置监听事件, 当选择的日期发生变化时触发,并发送广播事件 on-select-date-changed
                element
                    .datetimepicker()
                    .on('changeDate', function (ev) {
                        scope.$broadcast('on-select-date-changed', ev.date);
                        scope.dateObject = ev.date;
                        scope.$emit('on-select-date-changed', ev.date);
                        scope.$apply();
                    });

                scope.$watch('dateObject', function (newValue, oldValue) {
                    if (newValue != oldValue) {
                        $(element).val(dateFilter(newValue, scope.dateFormat));
                    }
                });
            }
        }
    };
  }]);
