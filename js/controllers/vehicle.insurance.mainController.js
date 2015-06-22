(function(){
    'use strict';
    function controller($scope, updateService, $stateParams, modalService){
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.updateService = updateService;
        this.modalService = modalService;
        this.isForeignKey = true;
        this.init = function(){
            this.super('init');
            this.$scope.paymentList = [{label:"Online", value:"Online"}, {label:"Cash", value:"Cash"}, {label:"Cheque / DD", value:"Cheque"}];
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'vehicle.insurance.service', '$stateParams', 'modalService'];
    MetronicApp.controller('vehicle.insurance.mainController', controller);
}());