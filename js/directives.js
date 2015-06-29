(function() {
    'use strict';

    var validators = function(scope) {
        function isValid(viewValue){
            return (viewValue !== '' && String(viewValue) !== 'undefined');
        }
        var validationEngine = {
            minlen: function(modelValue, viewValue) {
                if (scope.opts.minlength && isValid(viewValue)) {
                    return (viewValue.length >= scope.opts.minlength);
                }
                return true;
            },
            maxlen: function(modelValue, viewValue) {
                if (scope.opts.maxlength && isValid(viewValue)) {
                    return (viewValue.length <= scope.opts.maxlength);
                }
                return true;
            },
            pattern: function(modelValue, viewValue) {
                if (scope.opts.pattern && isValid(viewValue)) {
                    var pattern = new RegExp(scope.opts.pattern);
                    return (pattern).test(viewValue);
                }
                return true;
            },
            email: function(modelValue, viewValue) {
                if (scope.opts.type === 'email' && isValid(viewValue)) {
                    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                    console.log('Email:',viewValue);
                    return expr.test(viewValue);
                }
                return true;
            },
            required: function(modelValue, viewValue){
                if(scope.opts.required && viewValue === ''){
                    return false;
                }
                return true;
            },
            isNotNumber: function(modelValue, viewValue) {
                if (scope.opts.number && isValid(viewValue)) {
                    return !isNaN(Number(viewValue));
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
                    ctrl.$setValidity('minlen', (scope.model.length >= scope.opts.minlen));
                    ctrl.$setValidity('required', (scope.model.length >= 1));
                }

                angular.element(elem).find("input").on("blur keydown", function() {
                    ctrl.$setTouched(true);
                    ctrl.$setValidity('required', (scope.model.length >= 1));
                })
            }
            return {
                restrict: 'AE',
                require: 'ngModel',
                scope: {
                    model: '=ngModel',
                    source: '='
                },
                link: link,
                templateUrl: 'tpl/component/tags.html'
            }
        },
        searchDropdown: function($compile) {
            function link(scope, elem, attr, ctrl) {
                scope.opts = attr;
                scope.form = ctrl;
                scope.opened = false;
                scope.search = '';
                if(!scope.opts.displayname){
                    scope.opts.displayname = 'label';
                    scope.selecteditem = {};
                }

                scope.setSelected = function(index) {
                    angular.forEach(scope.source, function(item){
                        if(item.id === index){
                          scope.selecteditem = item;  
                        }                        
                    })
                    scope.model = scope.selecteditem[scope.opts.displayname];
                    scope.opened = false;
                }

                function checkValidity() {
                    ctrl.$setTouched(true);
                    if (scope.opts.required) {
                        ctrl.$setValidity('required', !(scope.model === ''));
                    }
                }

                var input = $(elem).find("input");
                input.on("keyup", function() {
                    scope.search = '';                    
                    if(input.val() !== ''){
                        scope.search = input.val();
                    }else{
                        scope.$apply();
                    }                    
                });                
                input.on("click", function() {
                    if(!scope.selecteditem){
                        angular.forEach(scope.source, function(item){
                            if(item.label === scope.model){
                              scope.selecteditem = item;  
                            }                     
                        })
                    }
                    scope.opened = true;
                    scope.$apply();
                });
                input.on("blur", function() {
                    scope.search = '';
                    //scope.opened = false;
                    scope.$apply();
                    checkValidity();
                });
                $(document).click(function(e){
                    if(!$(e.target).parents('ul').hasClass('dropdown-custom')){
                        scope.opened = false;
                    }
                }. false)

            }
            return {
                restrict: 'AE',
                replace: true,
                require: 'ngModel',
                scope: {
                    model: '=ngModel',
                    selecteditem: '=?',
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

                if (scope.opts.type === 'date') {

                    // New object holder to avoid scope Inheritance.
                    var datePickerObj = {
                        maxDate: new Date(),
                        format: 'dd/MM/yyyy',
                        dateOptions: {
                            formatYear: 'yy',
                            startingDay: 1
                        },
                        opened:false,
                        open: function($event) {
                            $event.preventDefault();
                            $event.stopPropagation();
                            this.opened = true;
                        }
                    };
                    scope.datePickerObj = datePickerObj;
                }
                $compile(elem.contents())(scope);

                var input = $(elem).find("input");

                ctrl.$validators = new validators(scope);

                if(scope.opts.required && input.val() === ''){
                    ctrl.$setValidity("required", false);
                }
                
                input.on("blur focus", function(e) {
                    ctrl.$setTouched(true);
                    if(scope.opts.required && input.val() === ''){
                        ctrl.$setValidity("required", false);
                    }                                        
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