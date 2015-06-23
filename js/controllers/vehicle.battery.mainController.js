(function(){
    'use strict';
    function controller($scope, updateService, modalService){
        this.$scope = $scope;
        this.updateService = updateService;
        this.modalService = modalService;
        this.isForeignKey = true;
        this.init = function(){
            this.super('init');
            this.$scope.paymentList = [{label:"Online", value:"Online"}, {label:"Cash", value:"Cash"}, {label:"Cheque / DD", value:"Cheque"}];
            this.$scope.makeList = [{id: 'make1', name: 'Make 1'}, {id: 'make2', name: 'Make 2'}];            
            this.$scope.vendorList = [{id:'dealer1', name:'Dealer 1'}];
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'vehicle.battery.service', 'modalService'];
    MetronicApp.controller('vehicle.battery.mainController', controller);
}());