'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:aceToggleButton
 * @description
 * # aceToggleButton
 */
angular.module('angularAceAdminApp')
    .directive('aceToggleButton', function () {
        return {
            templateUrl: 'template/frame/toggleButton/toggleButton.html',
            restrict: 'EA',
            // replace: true,
            scope: {
                btnTitle: '=',
                btnStyle: '=',
                btnModel: '='
            },
            controller: [
                '$scope',
                function ($scope) {
                    $scope.btnClass = function () {
                        var returnValue = '';

                        switch ($scope.btnStyle) {
                            case 1 || 'ace-switch-1': {
                                returnValue = '';
                                break;
                            }
                            case 2 || 'ace-switch-2': {
                                returnValue = 'ace-switch-2';
                                break;
                            }
                            case 3 || 'ace-switch-3': {
                                returnValue = 'ace-switch-3';
                                break;
                            }
                            case 4 || 'ace-switch-4': {
                                returnValue = 'ace-switch-4';
                                break;
                            }
                            case 5 || 'ace-switch-5': {
                                returnValue = 'ace-switch-5';
                                break;
                            }
                            case 6 || 'ace-switch-6': {
                                returnValue = 'ace-switch-6';
                                break;
                            }
                            case 7 || 'ace-switch-7': {
                                returnValue = 'ace-switch-7';
                                break;
                            }
                        }

                        return returnValue;
                    }
                }
            ]
        };
    });
