(function() {
    'use strict';

    var validators = function(scope) {
        var validationEngine = {
            minlen: function(modelValue, viewValue) {
                if (scope.opts.minlength && viewValue !== '') {
                    return (viewValue.length >= scope.opts.minlength);
                }
                return true;
            },
            maxlen: function(modelValue, viewValue) {
                if (scope.opts.maxlength && viewValue !== '') {
                    return (viewValue.length <= scope.opts.maxlength);
                }
                return true;
            },
            pattern: function(modelValue, viewValue) {
                if (scope.opts.pattern && viewValue !== '') {
                    var pattern = new RegExp(scope.opts.pattern);
                    return (pattern).test(viewValue);
                }
                return true;
            },
            email: function(modelValue, viewValue) {
                if (scope.opts.type === 'email' && viewValue !== '') {
                    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                    return expr.test(viewValue);
                }
                return true;
            },
            required: function(modelValue, viewValue){
                if(scope.opts.required && viewValue === ''){
                    return false;
                }
                return true;
            }

        };
        return validationEngine;
    }


    var directiveObject = {
        ftModal: function() {
            function link(scope, element, attrs) {
                scope.close = function(val) {
                    scope.ftModal.confirmed = val;
                    scope.ftModal.show = false;
                }
            }
            return {
                restrict: "AE",
                replace: true,
                link: link,
                templateUrl: 'tpl/component/modal.html'
            };
        },
        ftAlert: function($timeout, alertService) {
            function link(scope, element, attrs) {
                var selectedAlert;
                scope.close = function(val) {
                    selectedAlert = val;
                    $timeout(function() {
                        alertService.close(selectedAlert);
                    }, 500);
                }
            }
            return {
                restrict: "AE",
                replace: true,
                link: link,
                templateUrl: 'tpl/component/alert.html'
            };
        },
        ftTagInput: function() {
            function link(scope, elem, attr, ctrl) {
                scope.opts = attr;

                scope.form = ctrl;

                scope.onTagAdded = function() {
                    ctrl.$setValidity('minlen', (scope.selectedTags.length >= scope.opts.minlen));
                    ctrl.$setValidity('required', (scope.selectedTags.length >= 1));
                }

                angular.element(elem).find("input").on("blur keydown", function() {
                    ctrl.$setTouched(true);
                    ctrl.$setValidity('required', (scope.selectedTags.length >= 1));
                })
            }
            return {
                restrict: 'AE',
                require: 'ngModel',
                scope: {
                    selectedTags: '=ngModel',
                    source: '='
                },
                link: link,
                templateUrl: 'tpl/component/tags.html'
            }
        },
        searchDropdown: function() {
            function link(scope, elem, attr, ctrl) {
                scope.opts = attr;
                scope.form = ctrl;
                scope.opened = 'opened';

                scope.selectItem = function(index) {
                    scope.index = index;
                    scope.model = scope.source[index].title;
                }

                function checkValidity() {
                    ctrl.$setTouched(true);
                    if (scope.opts.required) {
                        ctrl.$setValidity('required', !(scope.model === ''));
                    }
                }

                var input = $(elem).find("input");
                input.on("click", function() {
                    scope.opened = '';
                    scope.$apply();
                })
                input.on("blur", function() {
                    scope.opened = 'opened';
                    scope.$apply();
                    checkValidity();
                })
            }
            return {
                restrict: 'AE',
                replace: true,
                require: 'ngModel',
                scope: {
                    model: '=ngModel',
                    source: '='
                },
                link: link,
                templateUrl: 'tpl/component/searchSelect.html'
            }
        },
        ftFormText: function($compile) {
            function link(scope, elem, attr, ctrl) {
                scope.opts = attr;
                if (!scope.opts.type) {
                    scope.opts.type = "text";
                }
                scope.form = ctrl;

                scope.open = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    scope.opened = true;
                };

                if (scope.opts.type === 'date') {
                    scope.opts.maxDate = new Date();
                    scope.dateOptions = {
                        formatYear: 'yy',
                        startingDay: 1
                    };
                    scope.format = 'dd/MM/yyyy';
                }

                $compile(elem.contents())(scope);

                var input = $(elem).find("input");

                ctrl.$validators = new validators(scope);

                if(scope.opts.required && input.val() === ''){
                    ctrl.$setValidity("required", false);
                }
                
                input.on("blur focus", function(e) {
                    if(scope.opts.required && input.val() === ''){
                        ctrl.$setValidity("required", false);
                    }
                    ctrl.$setTouched(true);
                    
                });
            }
            return {
                restrict: 'AE',
                require: 'ngModel',
                scope: {
                    model: '=ngModel',
                    source: '='
                },
                link: link,
                templateUrl: 'tpl/component/formControl.html'
            }
        }
    }
    MetronicApp.directive("ftModal", directiveObject.ftModal);
    MetronicApp.directive("ftAlert", directiveObject.ftAlert);
    MetronicApp.directive("ftTagInput", directiveObject.ftTagInput);
    MetronicApp.directive("searchDropdown", directiveObject.searchDropdown);
    MetronicApp.directive("ftFormText", directiveObject.ftFormText);
}());


MetronicApp.directive('ngSpinnerBar', ['$rootScope',
    function($rootScope) {
        return {
            link: function(scope, element, attrs) {
                // by defult hide the spinner bar
                element.addClass('hide'); // hide spinner bar by default

                // display the spinner bar whenever the route changes(the content part started loading)
                $rootScope.$on('$stateChangeStart', function() {
                    element.removeClass('hide'); // show spinner bar
                });

                // hide the spinner bar on rounte change success(after the content loaded)
                $rootScope.$on('$stateChangeSuccess', function() {
                    element.addClass('hide'); // hide spinner bar
                    $('body').removeClass('page-on-load'); // remove page loading indicator
                    Layout.setSidebarMenuActiveLink('match'); // activate selected link in the main menu

                    // auto scorll to page top
                    setTimeout(function() {
                        Metronic.scrollTop(); // scroll to the top on content load
                    }, $rootScope.settings.layout.pageAutoScrollOnLoad);
                });

                // handle errors
                $rootScope.$on('$stateNotFound', function() {
                    element.addClass('hide'); // hide spinner bar
                });

                // handle errors
                $rootScope.$on('$stateChangeError', function() {
                    element.addClass('hide'); // hide spinner bar
                });
            }
        };
    }
])

MetronicApp.directive("ftPanel", function() {
    return {
        restrict: "E",
        transclude: true,
        templateUrl: 'tpl/component/panel.html'
    };
});

MetronicApp.directive("ftForm", function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'tpl/component/form.html'
    }
});