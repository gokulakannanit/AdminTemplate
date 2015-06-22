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
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'vehicle.emission.service', '$stateParams', 'modalService'];
    MetronicApp.controller('vehicle.emission.mainController', controller);
}());