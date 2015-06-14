/***
GLobal Directives
***/

// Route State Load Spinner(used on page or content load)
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
                    setTimeout(function () {
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

// Handle global LINK click
MetronicApp.directive('a',
    function() {
        return {
            restrict: 'E',
            link: function(scope, elem, attrs) {
                if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                    elem.on('click', function(e) {
                        e.preventDefault(); // prevent link click for above criteria
                    });
                }
            }
        };
    });

// Handle Dropdown Hover Plugin Integration
MetronicApp.directive('dropdownMenuHover', function () {
  return {
    link: function (scope, elem) {
      elem.dropdownHover();
    }
  };  
});

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

MetronicApp.directive("ftFormText", function($compile) {
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

        if(scope.opts.type === 'date'){

            scope.opts.maxDate = new Date();

            scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };
            scope.format = 'dd/MM/yyyy';

        }

        $compile(elem.contents())(scope);

        if(scope.opts.type !== "select"){

            var input = $(elem).find("input");

            if (scope.opts.required) {
                input.attr('required', 'true');
            }

            ctrl.$validators.minlen = function(modelValue, viewValue) {
                if (scope.opts.minlen && viewValue !== '') {
                    return (viewValue.length >= scope.opts.minlen);
                }
                return true;
            }

            ctrl.$validators.maxlen = function(modelValue, viewValue) {
                if (scope.opts.maxlen && viewValue !== '') {
                    return (viewValue.length <= scope.opts.maxlen);
                }
                return true;
            }

            ctrl.$validators.pattern = function(modelValue, viewValue) {
                if (scope.opts.pattern && viewValue !== '') {
                    var pattern = new RegExp(scope.opts.pattern);
                    return (pattern).test(viewValue);
                }
                return true;
            }

            ctrl.$validators.email = function(modelValue, viewValue) {
                if (scope.opts.type === 'email' && viewValue !== '') {
                    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                    return expr.test(viewValue);
                }
                return true;
            }

            input.on("blur keydown", function(e) {
                ctrl.$setTouched(true);
            });

        }else if(scope.opts.type === 'select'){
            var select = $(elem).find("select");

            if (scope.opts.required) {
                select.attr('required', 'true');
            }

            select.on("click change", function(){
                ctrl.$setTouched(true);
            })
        }
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
});

MetronicApp.directive("ftModal", function() {
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

});

MetronicApp.directive("ftAlert", function($timeout, alertService) {
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

});

MetronicApp.directive("ftTagInput", function() {

    function link(scope, elem, attr, ctrl) {
        scope.opts = attr;

        scope.form = ctrl;

        scope.onTagAdded = function() {
            ctrl.$setValidity('minlen', (scope.selectedTags.length >= scope.opts.minlen));
            ctrl.$setValidity('required', (scope.selectedTags.length >= 1));            
        }

        angular.element(elem).find("input").on("blur keydown", function () {            
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
});