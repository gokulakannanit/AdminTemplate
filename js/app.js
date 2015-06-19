/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
    'ngTagsInput'
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider',
    function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            // global configs go here
        });

    }
]);

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider',
    function($controllerProvider) {
        // this option might be handy for migrating old apps, but please don't use it
        // in new ones!
        $controllerProvider.allowGlobals();
    }
]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope',
    function($rootScope) {
        // supported languages
        var settings = {
            layout: {
                pageSidebarClosed: false, // sidebar state
                pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
            },
            layoutImgPath: Metronic.getAssetsPath() + 'admin/layout/img/',
            layoutCssPath: Metronic.getAssetsPath() + 'admin/layout/css/'
        };

        $rootScope.settings = settings;

        return settings;
    }
]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope',
    function($scope, $rootScope) {
        $scope.$on('$viewContentLoaded', function() {
            Metronic.initComponents(); // init core components
            //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
        });
    }
]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope',
    function($scope) {
        $scope.$on('$includeContentLoaded', function() {
            Layout.initHeader(); // init header
        });
    }
]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$scope',
    function($scope) {
        $scope.$on('$includeContentLoaded', function() {
            Layout.initSidebar(); // init sidebar
        });
    }
]);

/* Setup Layout Part - Theme Panel */
MetronicApp.controller('ThemePanelController', ['$scope',
    function($scope) {
        $scope.$on('$includeContentLoaded', function() {
            
        });
    }
]);


/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // Redirect any unmatched url
        $urlRouterProvider.otherwise("/dashboard.html");

        $stateProvider

        // Dashboard
        .state('dashboard', {
            url: "/dashboard.html",
            templateUrl: "views/dashboard.html",
            data: {
                pageTitle: 'Admin Dashboard Template',
                breadScrum: [{
                    label: 'home',
                    url: '#/dashboard.html'
                }]
            },
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                            files: [
                                'js/controllers/DashboardController.js'
                            ]
                        });
                    }
                ]
            }
        })
            .state('owner', {
                url: '/owner.html',
                templateUrl: 'views/owner.html',
                data: {
                    pageTitle: 'Owner',
                    panelTitle: 'Owner List',
                    addUri: 'owner',
                    breadScrum: [{
                        label: 'home',
                        url: '#/dashboard.html'
                    }, {
                        label: 'owner',
                        url: '#/owner.html'
                    }]
                },
                controller: 'owner.mainController',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before',
                                files: [
                                    'js/service/owner.service.js',
                                    'js/controllers/owner.mainController.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('ownerDetail', {
                url: '/owner/:isEdit/:editId',
                templateUrl: 'views/owner.add.html',
                data: {
                    pageTitle: 'Add Owner',
                    panelTitle: 'Owner Details',
                    form: true,
                    back: 'owner',
                    isEdit: false,
                    breadScrum: [{
                        label: 'home',
                        url: '#/dashboard.html'
                    }, {
                        label: 'owner',
                        url: '#/owner.html'
                    }, {
                        label: 'Add Owner',
                        url: '#/owner.html'
                    }]
                },
                controller: 'owner.add.mainController',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before',
                                files: [
                                    'js/service/owner.service.js',
                                    'js/controllers/owner.add.mainController.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('company', {
                url: '/company.html',
                templateUrl: 'views/company.html',
                data: {
                    pageTitle: 'Company',
                    panelTitle: 'Company List',
                    addUri: 'company',
                    breadScrum: [{
                        label: 'home',
                        url: '#/dashboard.html'
                    }, {
                        label: 'company',
                        url: '#/company.html'
                    }]
                },
                controller: 'company.mainController',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before',
                                files: [
                                    'js/service/owner.service.js',
                                    'js/service/company.service.js',
                                    'js/controllers/company.mainController.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('companyDetail', {
                url: '/company/:isEdit/:editId',
                templateUrl: 'views/company.add.html',
                data: {
                    pageTitle: 'Add Company',
                    panelTitle: 'Company Details',
                    form: true,
                    back: 'company',
                    isEdit: false,
                    breadScrum: [{
                        label: 'home',
                        url: '#/dashboard.html'
                    }, {
                        label: 'company',
                        url: '#/company.html'
                    }, {
                        label: 'Add Company',
                        url: '#/company.html'
                    }]
                },
                controller: 'company.add.mainController',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before',
                                files: [
                                    'js/service/owner.service.js',
                                    'js/service/company.service.js',
                                    'js/controllers/company.add.mainController.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('client', {
                url: '/client.html',
                templateUrl: 'views/client.html',
                data: {
                    pageTitle: 'Client',
                    panelTitle: 'Client List',
                    addUri: 'client',
                    breadScrum: [{
                        label: 'home',
                        url: '#/dashboard.html'
                    }, {
                        label: 'client',
                        url: '#/client.html'
                    }]
                },
                controller: 'client.mainController',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before',
                                files: [
                                    'js/service/client.service.js',
                                    'js/controllers/client.mainController.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('clientDetail', {
                url: '/client/:isEdit/:editId',
                templateUrl: 'views/client.add.html',
                data: {
                    pageTitle: 'Add Client',
                    panelTitle: 'Client Details',
                    form: true,
                    back: 'client',
                    isEdit: false,
                    breadScrum: [{
                        label: 'home',
                        url: '#/dashboard.html'
                    }, {
                        label: 'client',
                        url: '#/client.html'
                    }, {
                        label: 'Add Client',
                        url: '#/client.html'
                    }]
                },
                controller: 'client.add.mainController',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before',
                                files: [
                                    'js/service/client.service.js',
                                    'js/controllers/client.add.mainController.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('vendor', {
                url: '/vendor.html',
                templateUrl: 'views/vendor.html',
                data: {
                    pageTitle: 'Vendor',
                    panelTitle: 'Vendor List',
                    addUri: 'vendor',
                    breadScrum: [{
                        label: 'home',
                        url: '#/dashboard.html'
                    }, {
                        label: 'vendor',
                        url: '#/vendor.html'
                    }]
                },
                controller: 'vendor.mainController',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before',
                                files: [
                                    'js/service/vendor.service.js',
                                    'js/controllers/vendor.mainController.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('vendorDetail', {
                url: '/vendor/:isEdit/:editId',
                templateUrl: 'views/vendor.add.html',
                data: {
                    pageTitle: 'Add Vendor',
                    panelTitle: 'Vendor Details',
                    form: true,
                    back: 'vendor',
                    isEdit: false,
                    breadScrum: [{
                        label: 'home',
                        url: '#/dashboard.html'
                    }, {
                        label: 'vendor',
                        url: '#/vendor.html'
                    }, {
                        label: 'Add Vendor',
                        url: '#/vendor.html'
                    }]
                },
                controller: 'vendor.add.mainController',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before',
                                files: [
                                    'js/service/vendor.service.js',
                                    'js/controllers/vendor.add.mainController.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('vehicle', {
                url: '/vehicle.html',
                templateUrl: 'views/vehicle.html',
                controller: 'vehicle.mainController',
                data: {
                    pageTitle: 'Vehicle',
                    panelTitle: 'Vehicle List',
                    addUri: 'vehicle',
                    breadScrum: [{
                        label: 'home',
                        url: '#/dashboard.html'
                    }, {
                        label: 'vehicle',
                        url: '#/vehicle.html'
                    }]
                },
                resolve: {
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before',
                                files: [
                                    'js/service/vehicle.service.js',
                                    'js/controllers/vehicle.mainController.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('vehicleDetail', {
                url: '/vehicle/:isEdit/:editId',
                templateUrl: 'views/vehicle.add.html',
                controller: 'vehicle.add.mainController',
                data: {
                    pageTitle: 'Add Vehicle',
                    panelTitle: 'Vehicle Details',
                    form: true,
                    back: 'vehicle',
                    isEdit: false,
                    breadScrum: [{
                        label: 'home',
                        url: '#/dashboard.html'
                    }, {
                        label: 'vehicle',
                        url: '#/vehicle.html'
                    }, {
                        label: 'Add Vehicle',
                        url: '#/vehicle.html'
                    }]
                },
                resolve: {
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before',
                                files: [
                                    'js/service/vehicle.service.js',
                                    'js/controllers/vehicle.add.mainController.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('vehicleDetail.basic', {
                views: {
                    url: '/basic',
                    "container": {
                        templateUrl: "views/vehicle.basic.html",
                        controller: 'vehicle.basic.mainController',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'MetronicApp',
                                        insertBefore: '#ng_load_plugins_before',
                                        files: [
                                            'js/controllers/vehicle.basic.mainController.js'
                                        ]
                                    });
                                }
                            ]
                        }
                    }
                }
            })
            .state('vehicleDetail.insurance', {
                views: {
                    url: '/maintain',
                    "container": {
                        templateUrl: "views/vehicle.insurance.html",
                        controller: 'vehicle.insurance.mainController',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'MetronicApp',
                                        insertBefore: '#ng_load_plugins_before',
                                        files: [
                                            'js/service/vehicle.insurance.service.js',
                                            'js/controllers/vehicle.insurance.mainController.js'
                                        ]
                                    });
                                }
                            ]
                        }
                    }
                }
            })
            .state('vehicleDetail.fc', {
                views: {
                    url: '/fc',
                    "container": {
                        templateUrl: "views/vehicle.fc.html",
                        controller: 'vehicle.fc.mainController',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'MetronicApp',
                                        insertBefore: '#ng_load_plugins_before',
                                        files: [
                                            'js/service/vehicle.fc.service.js',
                                            'js/controllers/vehicle.fc.mainController.js'
                                        ]
                                    });
                                }
                            ]
                        }
                    }
                }
            })
            .state('vehicleDetail.spare', {
                views: {
                    url: '/spare',
                    "container": {
                        templateUrl: "views/vehicle.spare.html",
                        controller: 'vehicle.spare.mainController',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'MetronicApp',
                                        insertBefore: '#ng_load_plugins_before',
                                        files: [
                                            'js/service/vehicle.spare.service.js',
                                            'js/controllers/vehicle.spare.mainController.js'
                                        ]
                                    });
                                }
                            ]
                        }
                    }
                }
            })
            .state('vehicleDetail.tyre', {
                views: {
                    url: '/tyre',
                    "container": {
                        templateUrl: "views/vehicle.tyre.html",
                        controller: 'vehicle.tyre.mainController',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'MetronicApp',
                                        insertBefore: '#ng_load_plugins_before',
                                        files: [
                                            'js/service/vehicle.tyre.service.js',
                                            'js/controllers/vehicle.tyre.mainController.js'
                                        ]
                                    });
                                }
                            ]
                        }
                    }
                }
            })
            .state('vehicleDetail.battery', {
                views: {
                    url: '/battery',
                    "container": {
                        templateUrl: "views/vehicle.battery.html",
                        controller: 'vehicle.battery.mainController',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'MetronicApp',
                                        insertBefore: '#ng_load_plugins_before',
                                        files: [
                                            'js/service/vehicle.battery.service.js',
                                            'js/controllers/vehicle.battery.mainController.js'
                                        ]
                                    });
                                }
                            ]
                        }
                    }
                }
            })
            .state('vehicleDetail.emission', {
                views: {
                    url: '/emission',
                    "container": {
                        templateUrl: "views/vehicle.emission.html",
                        controller: 'vehicle.emission.mainController',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'MetronicApp',
                                        insertBefore: '#ng_load_plugins_before',
                                        files: [
                                            'js/service/vehicle.emission.service.js',
                                            'js/controllers/vehicle.emission.mainController.js'
                                        ]
                                    });
                                }
                            ]
                        }
                    }
                }
            })


    }
]);

/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state",
    function($rootScope, settings, $state) {
        $rootScope.$state = $state; // state to be accessed from view
    }
]);

MetronicApp.filter('titleCase', function() {
    return function(input) {
        input = input || '';
        return input.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
});

var baseService = {
    isLoadedFromService: false,
    getArrayById: function(){
        var itemObj = [];
        angular.forEach(this.model.dataList, function(item){            
            itemObj[item.id] = item.name;
        });
        return itemObj;
    },
    getById: function(editId){
        var itemObj = {};
        angular.forEach(this.model.dataList, function(item){            
            if(item.id === editId){          
                itemObj = item;
            }
        });
        return itemObj;
    },
    get: function(editId) {
        var self = this;
        if (editId === 'all' || !this.isLoadedFromService) {
            var setting = {
                method: 'GET',
                url: this.SERVICE_URL.GET_URL + "?id=all"
            }
            var httpCall = this.$http(setting);
            httpCall.success(function(data) {
                self.isLoadedFromService = true;
                self.model.dataList = data;
                self.model.dataModel = self.getById(editId);
                if(self.model.dataItemById){                    
                    self.model.dataItemById = self.getArrayById();
                }
            }).error(function() {

            });
        }else{
            self.model.dataModel = self.getById(editId);
        }
    },
    delete: function(data) {
        var self = this,
            setting = {
                method: 'POST',
                url: this.SERVICE_URL.DELETE_URL,
                data: data
            }
        var httpCall = this.$http(setting);
        httpCall.success(function() {
            self.get();
            self.alertService.add("success", "Record deleted Successfully..");
        }).error(function() {
            self.alertService.add("danger", "Record not deleted, please try again later");
        });
        return httpCall;
    },
    add: function(data) {
        var self = this, setting = {
            method: 'POST',
            url: this.SERVICE_URL.ADD_URL,
            data: data
        }
        var httpCall = this.$http(setting);
        httpCall.success(function() {
            self.get();
            self.alertService.add("success", "Record added Successfully..");
            if (self.$state) {
                self.$state.go(self.REDIRECT_STATE);
            }
        }).error(function() {
            self.alertService.add("danger", "Record not added, please try again later");
        });
        return httpCall;
    }
};

var baseController = {
    init: function() {
        this.defineListeners();
        this.defineScope();
        this.loadData();
    },
    loadData: function() {
        if (this.$scope.editId) {
            this.updateService.get(this.$scope.editId);
        }else{
            this.updateService.get('all');
        }
    },
    defineListeners: function() {
        this.$scope.$on('$viewContentLoaded', function() {
            Metronic.initAjax();
        });
    },
    defineScope: function() {
        var self = this;
        if (this.$stateParams) {
            this.$scope.editId = this.$stateParams.editId;
        }
        this.$scope.model = this.updateService.model;
        this.$scope.confirmDelete = function(id) {
            var dataObj = {
                type: 'confirm',
                action: 'delete',
                heading: 'Are you sure want to delete ?',
                message: 'Record will be deleted from Database'
            }
            var promise = self.modalService.show(dataObj);
            promise.then(function(data) {
                if (data.confirmed) {
                    self.deleteRecord(id);
                }
            });
        };
        this.$scope.updateDetails = function() {
            self.updateService.add(self.$scope.model.dataModel);
        };
        this.$scope.reset = function() {
            self.init();
            self.$scope.form.$setPristine();
        };
    },
    deleteRecord: function(id) {
        this.updateService.delete({
            id: id
        });
    },
    super: function(str){
       baseController[str].call(this);
    }
}