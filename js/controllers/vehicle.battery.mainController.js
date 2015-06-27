(function(){
    'use strict';
    function controller($scope, updateService, modalService, config){
        this.$scope = $scope;
        this.updateService = updateService;
        this.modalService = modalService;
        this.isForeignKey = true;
        this.init = function(){
            this.super('init');
            this.$scope.paymentList = config.paymentList;
            this.$scope.makeList = config.batteryMakeList;            
            this.$scope.vendorList = [{id:'dealer1', label:'Dealer 1'}];
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'vehicle.battery.service', 'modalService', 'config'];
    MetronicApp.controller('vehicle.battery.mainController', controller);
}());