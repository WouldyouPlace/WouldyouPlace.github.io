'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:aceModalView
 * @description
 * # aceModalView
 */
angular.module('angularAceAdminApp')
    .directive('aceModalView', function () {
        return {
            templateUrl: 'template/frame/modalView/aceModalView.html',
            transclude: true,
            replace: true,
            restrict: 'EA',
            scope: {
                modalTitle: '=',
                modalShow: '=',
                modalSize: '=',
                modalBtnText: '=',
                modalBtnStyle: '=',
                modalFooterBlock: '=',
                modalViewSubmit: '&',
                modalViewClose: '&'
            },
            link: function (scope, element, attrs) {

                $(element).on('hidden.bs.modal', function (e) {
                    scope.$apply(function () {
                        scope.modalShow = false;
                        scope.modalViewClose();
                    });
                });

                scope.$watch('modalShow', function (newVal, oldVal) {
                    if (newVal) {
                        $(element).modal('show');
                    } else {
                        $(element).modal('hide');
                    }
                });

                scope.modalViewSize = function () {
                    if (scope.modalSize == 'large') {
                        return true;
                    } else if (scope.modalSize == 'small') {
                        return false;
                    }
                };

                scope.modalBtnClass = function () {
                    var returnValue = 'btn-primary';

                    switch (scope.modalBtnStyle) {
                        case 'danger':
                            returnValue = 'btn-danger';
                            break;
                        case 'info':
                            returnValue = 'btn-info';
                            break;
                        case 'success':
                            returnValue = 'btn-success';
                            break;
                    }

                    return returnValue;

                }

            }
        };
    });
