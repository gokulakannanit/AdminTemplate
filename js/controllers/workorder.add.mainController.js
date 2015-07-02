(function(){
    'use strict';
    function controller($scope, $stateParams, updateService, config, vehicleService){
        var self = this;
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.updateService = updateService;
        this.init = function(){            
            this.super('init');

            this.$scope.workOrderList = [{label:"Labour", value:"L"}, {label:"Spare Parts", value:"S"}];
            this.$scope.paymentList = config.paymentList;
        }
        
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', '$stateParams', 'workorder.service', 'config', 'vehicle.service'];
    MetronicApp.controller('workorder.add.mainController', controller);
}());